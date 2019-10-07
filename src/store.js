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
    glo_pos: 'positions',
    glo_con: 'connections',
    notes: [],
    positions: [],
    connections: [],
    allnotes: {},
    activeNote: {},
    activeAttachment: {},
    myattachments: [],
    myattachmentnames: [],
    otherattachments: {}
  },
  mutations: {
    SET_CLIENT(state, doc) {
      state.myclient = doc
      store.commit('GET_MY_DOC')
      store.commit('GET_POSITIONS')
      store.commit('GET_CONNECTIONS')
    },

    GET_ALL_DOCS(state) {
      pouchdb
        .allDocs({
          include_docs: true,
          attachments: true
        })
        .then(function(doc) {
          state.instance = pouchdb.name
          state.allnotes = doc.rows
        })
        .catch(function(err) {
          console.log(err)
        })
    },

    GET_MY_ATTACHMENT(state, e) {
      state.activeAttachment = []

      pouchdb
        .getAttachment(state.myclient, e)
        .then(function(blob) {
          // put img URL into store to render
          var url = URL.createObjectURL(blob)
          // console.log(url)
          state.activeAttachment.push({
            url: url
          })
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    GET_MY_DOC(state) {
      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          state.notes = doc.notes
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
                  text: 'Device ' + state.myclient
                }
              ]
            })
          }
        })
    },
    GET_POSITIONS(state) {
      pouchdb
        .get(state.glo_pos)
        .then(function(doc) {
          state.positions = doc.positions
        })
        .catch(function(err) {
          console.log(err)
          if (err.status == 404) {
            var uniqueid =
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
            return pouchdb.put({
              _id: state.glo_pos,
              positions: [
                //   {
                //     id: uniqueid,
                //     xpos: 0,
                //     ypos: 0
                //   }
              ]
            })
          }
        })
    },

    GET_CONNECTIONS(state) {
      pouchdb
        .get(state.glo_con)
        .then(function(doc) {
          state.connections = doc.connections
        })
        .catch(function(err) {
          console.log(err)
          if (err.status == 404) {
            var uniqueid =
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
            return pouchdb.put({
              _id: state.glo_con,
              connections: [
                //   {
                //     startid: uniqueid,
                //     xpos: 0,
                //     ypos: 0,
                //     endid: uniqueid,
                //     endxpos: 0,
                //     endypos: 0
                //   }
              ]
            })
          }
        })
    },

    ADD_DOC(state, e) {
      var uniqueid =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      localid = uniqueid
      pouchdb.get(state.myclient).then(function(doc) {
        if (e == undefined) {
          doc.notes.push({
            id: uniqueid,
            text: 'EDIT TEXT',
            owner: 'You',
            content_type: 'sheet',
            deleted: false,
            isActive: false,
            attachment_name: e
          })
        } else {
          doc.notes.push({
            id: uniqueid,
            text: 'EDIT TEXT FOR ATTACHMENT',
            owner: 'You',
            content_type: 'attachment',
            deleted: false,
            isActive: false,
            attachment_name: e
          })
        }
        return pouchdb
          .put({
            _id: state.myclient,
            _rev: doc._rev,
            _attachments: doc._attachments,
            notes: doc.notes
          })
          .then(function() {
            return pouchdb.get(state.myclient).then(function(doc) {
              state.notes = doc.notes
              var end = Object.keys(state.notes).length - 1
              const newNote = {
                text: state.notes[end].text,
                id: state.notes[end].id,
                content_type: state.notes[end].content_type,
                attachment_name: state.notes[end].attachment_name
              }

              state.activeNote = newNote
            })
          })
          .catch(function(err) {
            if (err.status == 404) {
              // pouchdb.put({  })
            }
          })
      })
      pouchdb.get(state.glo_pos).then(function(doc) {
        doc.positions.push({
          id: uniqueid,
          xpos: 0,
          ypos: 0
        })
        return pouchdb
          .put({
            _id: state.glo_pos,
            _rev: doc._rev,
            positions: doc.positions
          })
          .catch(function(err) {
            console.log(err)
          })
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
          // this now needs to dispatch EDIT NOTE ????
          const newNote = {
            text: state.notes[i].text,
            id: state.notes[i].id,
            content_type: state.notes[i].content_type,
            attachment_name: state.notes[i].attachment_name
          }
          state.activeNote = newNote
          //
          if (state.activeNote.attachment_name != undefined) {
            //FIXME: get and render the attachment with same name as attachment_name here please
            this.commit('GET_MY_ATTACHMENT', state.activeNote.attachment_name)
          }
          //console.log(newNote)
          // state.activeNote.text = state.notes[i].text
        }
      }
    },

    MAKE_CONNECT(state, e) {
      // console.log(state.connections[1].connection.id)
      //add the new info connection here
      // console.log(e)
      //var first = e.e
      //var second = e.f

      state.connections.push({
        startid: e.e,
        endid: e.f,
        startx: e.startx,
        starty: e.starty,
        endx: e.endx,
        endy: e.endy,
        connected: true
      })
      //console.log(state.connections)
      pouchdb
        .get(state.glo_con)
        .then(function(doc) {
          // put the store into pouchdb
          //console.log(state.connections)
          return pouchdb.bulkDocs([
            {
              _id: state.glo_con,
              _rev: doc._rev,
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
    },

    MOVE_POS(state, e) {
      localid = e.activenoteid
      //console.log(localid)
      var i
      for (i = 0; i < Object.keys(state.positions).length; i++) {
        if (localid == state.positions[i].id) {
          state.positions[i].xpos = e.xpos
          state.positions[i].ypos = e.ypos
        }
      }

      pouchdb
        .get(state.glo_pos)
        .then(function(doc) {
          //console.log(doc)
          // put the store into pouchdb
          return pouchdb.bulkDocs([
            {
              _id: state.glo_pos,
              _rev: doc._rev,
              positions: state.positions
            }
          ])
        })
        .then(function() {
          return pouchdb.get(state.glo_pos).then(function(doc) {
            state.positions = doc.positions
          })
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },

    UPDATE_ACTIVE(state, e) {
      localid = e.activenoteid
      //console.log(e)
      var i
      for (i = 0; i < Object.keys(state.notes).length; i++) {
        if (localid == state.notes[i].id) {
          state.notes[i].isActive = e.isActive
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
          })
        })
        .catch(function(err) {
          if (err.status == 404) {
          }
        })
    },

    UPDATE_CONNECT(state, e) {
      localid = e.activenoteid
      var i
      for (i = 0; i < Object.keys(state.connections).length; i++) {
        //
        // if endid matches update endx and endy else if startid matchs update startx /y
        if (localid == state.connections[i].startid) {
          state.connections[i].startx = e.xpos
          state.connections[i].starty = e.ypos
          // console.log(state.connections)
        } else if (localid == state.connections[i].endid) {
          state.connections[i].endx = e.xpos
          state.connections[i].endy = e.ypos
        } else {
        }
      }

      pouchdb
        .get(state.glo_con)
        .then(function(doc) {
          //console.log(doc)
          // put the store into pouchdb
          return pouchdb.bulkDocs([
            {
              _id: state.glo_con,
              _rev: doc._rev,
              connections: state.connections
            }
          ])
        })
        .then(function() {
          return pouchdb.get(state.glo_con).then(function(doc) {
            state.connections = doc.connections
          })
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
      //     }
      //    }
      //  }
    },

    EDIT_NOTE(state, e) {
      var i
      for (i = 0; i < Object.keys(state.notes).length; i++) {
        if (localid == state.notes[i].id) {
          state.notes[i].text = e.text
          state.notes[i].content_type = e.t
          state.notes[i].attachment_name = e.aname
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
              // connections: doc.connections
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
      // console.log(state.myclient)
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
            // store.commit('GET_MY_ATTACHMENTS')
            store.commit('ADD_DOC', files.name)
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
        store.commit('GET_ALL_DOCS')
        store.commit('GET_POSITIONS')
        store.commit('GET_CONNECTIONS')
        //store.commit('GET_ALL_DOCS')
        //  store.commit('GET_MY_ATTACHMENTS')
        // turn on two-way, continuous, retriable sync
        pouchdb
          .sync(remote, { live: true, retry: true, attachments: true })
          .on('change', function() {
            // pop info into function to find out more
            // handle change
            //console.log('change')
            store.commit('GET_ALL_DOCS')
            store.commit('GET_POSITIONS')
            store.commit('GET_CONNECTIONS')
            // store.commit('GET_ALL_DOCS')
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
    addDoc: ({ commit }, e) => {
      commit('ADD_DOC', e)
    },
    noteId: ({ commit }, e) => {
      commit('NOTE_ID', e)
    },
    getNoteText: ({ commit }, e) => {
      commit('GET_TEXT', e)
    },
    movePos: ({ commit }, { activenoteid, xpos, ypos, isActive }) => {
      commit('MOVE_POS', { activenoteid, xpos, ypos, isActive })
    },
    startConnect: ({ commit }, { e, f, startx, starty, endx, endy }) => {
      commit('MAKE_CONNECT', { e, f, startx, starty, endx, endy })
    },
    updateConnect: ({ commit }, { activenoteid, xpos, ypos }) => {
      commit('UPDATE_CONNECT', { activenoteid, xpos, ypos })
    },
    updateActive: ({ commit }, { activenoteid, isActive }) => {
      commit('UPDATE_ACTIVE', { activenoteid, isActive })
    },
    editNote: ({ commit }, { e, t, aname }) => {
      var text = e.target.value
      commit('EDIT_NOTE', { text, t, aname })
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
