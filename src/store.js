import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'

Vue.use(Vuex)
// Objects
var pouchdb = new PouchDB('couchdocs')
var remote = 'https://nn.adamprocter.co.uk/couchdocs/'
// local couch on my mac
//var remote = 'http://127.0.0.1:5984/couchdocs/'

var localid = null
const store = new Vuex.Store({
  state: {
    instance: '',
    myclient: '',
    notes: [],
    connections: [],
    otherclients: {},
    activeNote: {},
    myattachments: [],
    myattachmentnames: [],
    otherattachments: {}
  },
  mutations: {
    SET_CLIENT(state, doc) {
      state.myclient = doc
      console.log(state)
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
      state.myattachments = []
      state.myattachmentnames = []
      pouchdb.get(state.myclient, { attachments: true }).then(function(doc) {
        //FIXME: this is getting the name out of attachment and then I can access them in a loop
        // this could be totally wrong at this stage
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
        var j = 0
        for (i = 0; i < Object.keys(doc._attachments).length; i++) {
          pouchdb
            .getAttachment(state.myclient, state.myattachmentnames[i].name)
            .then(function(blob) {
              // put img URL into store to render
              var url = URL.createObjectURL(blob)
              //
              state.myattachments.push({
                name: state.myattachmentnames[j].name,
                url: url
              })
              j++
            })
            .catch(function(err) {
              console.log(err)
            })
        }
      })
    },

    GET_MY_DOC(state) {
      // REF: for quick debug of attachments
      // pouchdb.get(state.myclient, { attachments: true }).then(function(doc) {
      //   console.log(doc._attachments)
      //   // state.myattachments = doc._attachments
      //   // console.log(state.myattachments)
      // })

      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          state.notes = doc.notes
          state.connections = doc.connections
          //state.myattachments = doc._attachments
          // console.log(doc._attachments)
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
                  owner: 'name',
                  xpos: '0',
                  ypos: '0',
                  deleted: false
                }
              ],
              //FIXME: Creates a useless connnection to device?
              // but puts in unique ID
              connections: [
                {
                  id: uniqueid,
                  connection: [
                    // {
                    //   id: '0',
                    //   endx: '0',
                    //   endy: '0',
                    //   connected: false
                    // }
                  ]
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
            deleted: false,
            xpos: '0',
            ypos: '0'
          }),
            //FIXME: Creates one empty connection for every new doc
            doc.connections.push({
              id: uniqueid,
              connection: [
                // {
                //   id: '0',
                //   endx: '0',
                //   endy: '0',
                //   connected: false
                // }
              ]
            })

          // put the store into pouchdb
          return pouchdb.bulkDocs([
            {
              _id: state.myclient,
              _rev: doc._rev,
              _attachments: doc._attachments,
              notes: doc.notes,
              connections: doc.connections
            }
          ])
        })
        .then(function() {
          return pouchdb.get(state.myclient).then(function(doc) {
            state.notes = doc.notes
            state.connections = doc.connections
            var end = Object.keys(state.notes).length - 1
            const newNote = {
              text: state.notes[end].text,
              id: state.notes[end].id,
              content_type: state.notes[end].content_type
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

    GET_TEXT(state, id) {
      localid = id
      var i
      for (i = 0; i < Object.keys(state.notes).length; i++) {
        if (localid == state.notes[i].id) {
          // console.log(state.notes[i].text)
          // console.log(state.activeNote)
          // this now needs to dispatch EDIT NOTE
          const newNote = {
            text: state.notes[i].text,
            id: state.notes[i].id,
            content_type: state.notes[i].content_type
          }
          state.activeNote = newNote

          // state.activeNote.text = state.notes[i].text
        }
      }
    },

    MAKE_CONNECT(state, e) {
      //console.log(state.connections[1].connection.id)
      // add the new info connection here
      //console.log(state.connections)

      var first = e.e
      var second = e.f

      var i
      for (i = 0; i < Object.keys(state.connections).length; i++) {
        if (first == state.connections[i].id) {
          var currentid = i
          state.connections[currentid].connection.push({
            id: second,
            endx: e.xpos,
            endy: e.ypos,
            connected: true
          })

          //console.log(state.connections)

          pouchdb
            .get(state.myclient)
            .then(function(doc) {
              // put the store into pouchdb
              //console.log(state.connections)
              return pouchdb.bulkDocs([
                {
                  _id: state.myclient,
                  _rev: doc._rev,
                  _attachments: doc._attachments,
                  notes: doc.notes,
                  connections: state.connections
                }
              ])
            })

            .then(function() {
              return pouchdb.get(state.myclient).then(function(doc) {
                //state.connections = doc.connections
                // console.log(state.connections[currentid])

                // state.notes = doc.notes
                state.connections = doc.connections
              })
            })
            .catch(function(err) {
              if (err.status == 404) {
                // pouchdb.put({  })
              }
            })
        }
      }
    },

    MOVE_POS(state, e) {
      // console.log(e)
      localid = e.activenoteid
      //console.log(localid)
      var i
      for (i = 0; i < Object.keys(state.notes).length; i++) {
        if (localid == state.notes[i].id) {
          //UPDATE Dragged Positions
          state.notes[i].xpos = e.xpos
          state.notes[i].ypos = e.ypos
          //FIXME: UPDATE Connection distance positions here if connected equals true ?
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
              notes: state.notes,
              connections: state.connections
            }
          ])
        })
        .then(function() {
          return pouchdb.get(state.myclient).then(function(doc) {
            state.notes = doc.notes
            //state.connections = doc.connections
            // console.log(state.notes)
          })
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },

    UPDATE_CONNECT(state, e) {
      //console.log(state.connections)
      localid = e.activenoteid
      console.log(localid)
      var i
      var j

      for (i = 0; i < Object.keys(state.connections).length; i++) {
        // console.log(state.connections[i].connection)
        for (
          j = 0;
          j < Object.keys(state.connections[i].connection).length;
          j++
        ) {
          console.log(state.connections[i].connection[j].id)

          if (localid == state.connections[i].connection[j].id) {
            console.log('match')
            // var currentid = i
            // var connectid = j

            state.connections[i].connection[j].endx = e.xpos
            state.connections[i].connection[j].endy = e.ypos

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
                    notes: doc.notes,
                    connections: state.connections
                  }
                ])
              })
              .then(function() {
                return pouchdb.get(state.myclient).then(function(doc) {
                  state.connections = doc.connections
                })
              })
              .catch(function(err) {
                if (err.status == 404) {
                  // pouchdb.put({  })
                }
              })
          }
        }
      }
    },

    EDIT_NOTE(state, e) {
      // console.log('editing')
      // console.log(e.t)
      //  console.log(type)
      var i
      for (i = 0; i < Object.keys(state.notes).length; i++) {
        if (localid == state.notes[i].id) {
          //console.log('match')
          // console.log(state.notes[i].id)
          state.notes[i].text = e.text
          state.notes[i].content_type = e.t
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
              notes: state.notes,
              connections: doc.connections
            }
          ])
        })
        .then(function() {
          return pouchdb.get(state.myclient).then(function(doc) {
            state.notes = doc.notes
            // state.connections = doc.connections
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
      var tempdoc = null
      console.log(state.myclient)
      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          tempdoc = doc
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
            store.commit('GET_MY_ATTACHMENTS')
            // put in details of attachment using same key
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
        .then(function() {
          //REF: handle result - put result in function(result) if you want to use
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
    //FIXME: I think number of these commit specifically with editing the note could / should probably be combined
    addDoc: ({ commit }) => {
      commit('ADD_DOC')
    },
    noteId: ({ commit }, e) => {
      commit('NOTE_ID', e)
    },
    getNoteText: ({ commit }, e) => {
      commit('GET_TEXT', e)
    },

    movePos: ({ commit }, { activenoteid, xpos, ypos }) => {
      commit('MOVE_POS', { activenoteid, xpos, ypos })
    },
    startConnect: ({ commit }, { e, f, xpos, ypos }) => {
      commit('MAKE_CONNECT', { e, f, xpos, ypos })
    },
    updateConnect: ({ commit }, { activenoteid, xpos, ypos }) => {
      commit('UPDATE_CONNECT', { activenoteid, xpos, ypos })
    },
    editNote: ({ commit }, { e, t }) => {
      var text = e.target.value
      commit('EDIT_NOTE', { text, t })
    },
    editType: ({ commit }, e) => {
      commit('EDIT_TYPE', e.target.value)
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
