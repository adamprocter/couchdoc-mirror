import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'

Vue.use(Vuex)
var pouchdb = new PouchDB('couchdocs')
var remote = 'https://nn.adamprocter.co.uk/couchdocs/'
var localid = null

const store = new Vuex.Store({
  state: {
    instance: '',
    myclient: '',
    notes: [],
    otherclients: {},
    activeNote: {},
    myattachments: [],
    myattachmentnames: [],
    otherattachments: {}
  },
  mutations: {
    SET_CLIENT(state, doc) {
      state.myclient = doc
      //console.log(state.myclient)
      store.commit('GET_MY_DOC')
    },
    GET_ALL_DOCS(state) {
      pouchdb
        .allDocs({
          include_docs: true,
          attachments: true
        })
        .then(function(doc) {
          state.instance = pouchdb.name
          state.otherclients = doc.rows
        })
        .catch(function(err) {
          if (err.status == 404) {
            // error if no data
          }
        })
    },

    GET_MY_ATTACHMENTS(state) {
      // console.log(state.myattachments)
      state.myattachments = []
      pouchdb.get(state.myclient, { attachments: true }).then(function(doc) {
        //FIXME: What is this for loop doing, need to understand this
        var filename
        for (var key in doc._attachments) {
          if (
            doc._attachments.hasOwnProperty(key) &&
            typeof key !== 'function'
          ) {
            filename = key
          }
          state.myattachmentnames.push({
            name: filename
          })
        }

        var i
        for (i = 0; i < Object.keys(doc._attachments).length; i++) {
          pouchdb
            .getAttachment(state.myclient, state.myattachmentnames[i].name)
            .then(function(blob) {
              // put img URL into store to render
              var url = URL.createObjectURL(blob)
              //
              state.myattachments.push({
                url: url
              })
              //
            })
            .catch(function(err) {
              console.log(err)
            })
        }
      })
    },

    GET_MY_DOC(state) {
      // keep in for quick debug of attachments
      // pouchdb.get(state.myclient, { attachments: true }).then(function(doc) {
      //   console.log(doc._attachments)
      //   // state.myattachments = doc._attachments
      //   // console.log(state.myattachments)
      // })

      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          state.notes = doc.notes
          //state.myattachments = doc._attachments
          // console.log(doc._attachments)
          //console.log(state.myattachments)
        })
        .catch(function(err) {
          if (err.status == 404) {
            var uniqueid =
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
            return pouchdb.put({
              _id: state.myclient,
              _attachments: {},
              notes: [
                {
                  id: uniqueid,
                  text: 'Device ' + state.myclient,
                  // get name from form as well (look at e thing!)
                  owner: 'Your Name',
                  deleted: false
                }
              ]
            })
          }
        })
    },
    ADD_DOC(state) {
      var uniqueid =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      localid = uniqueid
      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          // pop new note onto the end of the doc
          // console.log(doc._attachments)
          doc.notes.push({
            id: uniqueid,
            text: 'EDIT ME',
            owner: 'YOU',
            content_type: 'sheet',
            deleted: false
          })

          // put the store into pouchdb
          return pouchdb.bulkDocs([
            {
              _id: state.myclient,
              _rev: doc._rev,
              _attachments: doc._attachments,
              notes: doc.notes
            }
          ])
        })
        .then(function() {
          return pouchdb.get(state.myclient).then(function(doc) {
            state.notes = doc.notes
            var end = Object.keys(state.notes).length - 1
            const newNote = {
              text: state.notes[end].text,
              id: state.notes[end].id
            }
            state.activeNote = newNote
          })
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },
    NOTE_ID(state, id) {
      localid = id
    },
    EDIT_NOTE(state, text) {
      var i
      for (i = 0; i < Object.keys(state.notes).length; i++) {
        if (localid == state.notes[i].id) {
          // console.log('match')
          // console.log(state.notes[i].id)
          state.notes[i].text = text
        }
      }

      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          //console.log(doc)
          // put the store into pouchdb
          return pouchdb.bulkDocs([
            {
              _id: state.myclient,
              _rev: doc._rev,
              _attachments: doc._attachments,
              notes: state.notes
            }
          ])
        })
        .then(function() {
          return pouchdb.get(state.myclient).then(function(doc) {
            state.notes = doc.notes
            // console.log(state.notes)
          })
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },

    ADD_FILE(state, files) {
      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          return pouchdb.putAttachment(
            state.myclient,
            files.name,
            doc._rev,
            files,
            files.type
          )
        })
        .then(function(response) {
          // handle response
          if (response.ok == true) {
            // not empty line
          }
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },
    DELETE_CLIENT(state) {
      //console.log('delete')
      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          //console.log(doc)
          return pouchdb.remove(doc._id, doc._rev)
          //return pouchdb.remove(doc)
        })
        .then(function(result) {
          // handle result
          localStorage.removeItem('myNNClient')
          location.reload()
        })
        .catch(function(err) {
          console.log(err)
        })
    }
  },
  actions: {
    syncDB: () => {
      pouchdb.replicate.from(remote).on('complete', function() {
        store.commit('GET_MY_DOC')
        store.commit('GET_ALL_DOCS')
        store.commit('GET_MY_ATTACHMENTS')
        // turn on two-way, continuous, retriable sync
        pouchdb
          .sync(remote, { live: true, retry: true, attachments: true })
          .on('change', function() {
            // pop info into function to find out more
            // handle change
            //console.log('change')
            store.commit('GET_MY_DOC')
            store.commit('GET_ALL_DOCS')
            //  store.commit('GET_MY_ATTACHMENTS')
          })
          .on('paused', function() {
            // replication paused (e.g. replication up to date, user went offline)
            // console.log('replication paused')
          })
          .on('active', function() {
            // replicate resumed (e.g. new changes replicating, user went back online)
            //console.log('back active')
          })
          .on('denied', function() {
            // a document failed to replicate (e.g. due to permissions)
          })
          .on('complete', function() {
            // handle complete
            //console.log('complete')
          })
          .on('error', function(err) {
            console.log(err)
          })
      })
    },

    addDoc: ({ commit }) => {
      commit('ADD_DOC')
    },
    noteId: ({ commit }, e) => {
      commit('NOTE_ID', e)
    },
    editNote: ({ commit }, e) => {
      commit('EDIT_NOTE', e.target.value)
    },
    setClient: ({ commit }, e) => {
      commit('SET_CLIENT', e)
    },
    deleteClient: ({ commit }, e) => {
      commit('DELETE_CLIENT', e)
    },
    addFile: ({ commit }, e) => {
      commit('ADD_FILE', e)
    }
  }
})

export default store
store.dispatch('syncDB')
