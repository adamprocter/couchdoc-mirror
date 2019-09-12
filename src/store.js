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
    otherclients: {},
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
    // GET_ALL_DOCS(state) {
    //   pouchdb
    //     .allDocs({
    //       include_docs: true,
    //       attachments: true
    //     })
    //     .then(function(doc) {
    //       state.instance = pouchdb.name
    //       state.otherclients = doc.rows
    //     })
    //     .catch(function(err) {
    //       if (err.status == 404) {
    //         // error if no data
    //       }
    //     })
    // },

    // GET_MY_ATTACHMENTS(state) {
    //   state.myattachments = []
    //   //FIXME: this is getting the name out of attachment and then I can access them in a loop
    //   // this could be totally wrong at this stage
    //   state.myattachmentnames = []
    //   pouchdb.get(state.myclient, { attachments: true }).then(function(doc) {
    //     var filename
    //     for (var key in doc._attachments) {
    //       if (
    //         doc._attachments.hasOwnProperty(key) &&
    //         typeof key !== 'function'
    //       ) {
    //         filename = key
    //       }
    //       state.myattachmentnames.push({
    //         name: filename
    //       })
    //     }

    //     var i
    //     var j = 0
    //     for (i = 0; i < Object.keys(doc._attachments).length; i++) {
    //       pouchdb
    //         .getAttachment(state.myclient, state.myattachmentnames[i].name)
    //         .then(function(blob) {
    //           // put img URL into store to render
    //           var url = URL.createObjectURL(blob)
    //           //
    //           state.myattachments.push({
    //             name: state.myattachmentnames[j].name,
    //             url: url
    //           })
    //           j++
    //         })
    //         .catch(function(err) {
    //           console.log(err)
    //         })
    //     }
    //   })
    // },

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
                  // get name from form as well (look at e thing!)
                  // owner: 'name',
                  // deleted: false
                }
              ] //,
              // //FIXME: Creates a useless connnection to device?
              // // but puts in unique ID
              // connections: [
              //   {
              //     id: uniqueid,
              //     connection: [
              //       // {
              //       //   id: '0',
              //       //   endx: '0',
              //       //   endy: '0',
              //       //   connected: false
              //       // }
              //     ]
              //   }
              // ]
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
                {
                  id: uniqueid,
                  xpos: 0,
                  ypos: 0
                }
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
                {
                  startid: uniqueid,
                  xpos: 0,
                  ypos: 0,
                  endid: uniqueid,
                  endxpos: 0,
                  endypos: 0
                }
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
      pouchdb
        .allDocs({
          include_docs: true,
          attachments: true
        })
        .then(function(doc) {
          // 1.pop new note onto the end of the doc for your device
          // 2.add to global positions doc
          //
          //console.log(doc.rows[1].doc.notes)
          // console.log(doc.rows[1].doc._id)
          // console.log(doc.rows[3].doc.positions)
          var i
          for (i = 0; i < doc.rows.length; i++) {
            if (state.myclient == doc.rows[i].doc._id) {
              console.log('super match game')
              if (e == undefined) {
                console.log(doc)
                doc.rows[i].doc.notes.push({
                  id: uniqueid,
                  text: 'EDIT TEXT',
                  owner: 'You',
                  content_type: 'sheet',
                  deleted: false,
                  isActive: false,
                  attachment_name: e
                }) //,
                // //HARDCODED This is wrong
                // doc.rows[3].doc.positions.push({
                //   id: glo_pos,
                //   positions: [
                //     {
                //       id: uniqueid,
                //       endx: '0',
                //       endy: '0'
                //     }
                //   ]
                // })
              } else {
                doc.rows[i].doc.notes.push({
                  id: uniqueid,
                  text: 'EDIT TEXT FOR ATTACHMENT',
                  owner: 'You',
                  content_type: 'attachment',
                  deleted: false,
                  isActive: false,
                  attachment_name: e
                }) //,
                //HARDCODED This is wrong
                // doc.rows[3].doc.positions.push({
                //   id: glo_pos,
                //   positions: [
                //     {
                //       id: uniqueid,
                //       endx: '0',
                //       endy: '0'
                //     }
                //   ]
                // })
              }
            }
            console.log(doc)
            //}
            // put the store into pouchdb
            // PUT IN 3 DOCS ?? you, pos and cons
            return pouchdb.bulkDocs([
              {
                _id: state.myclient,
                _rev: doc.rows[i].doc._rev,
                _attachments: doc.rows[i].doc._attachments,
                notes: doc.rows[i].doc.notes
              } //,
              // {
              //   _id: positions,
              //   _rev: doc._rev,
              //   positions: doc.positions
              // },
              // {
              //   _id: connections,
              //   _rev: doc._rev,
              //   connections: doc.connections
              // }
            ])
            //END OF FOR LOOP
          }
        })

        .then(function() {
          return pouchdb.get(state.myclient).then(function(doc) {
            console.log('returning?')
            state.notes = doc.notes
            // state.connections = doc.connections
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
      localid = e.activenoteid
      console.log(localid)
      console.log(e)
      var i
      for (i = 0; i < Object.keys(state.positions).length; i++) {
        if (localid == state.positions[i].id) {
          state.positions[i].xpos = e.xpos
          state.positions[i].ypos = e.ypos
          // state.positions[i].isActive = e.isActive
          //FIXME: UPDATE Connection distance positions here if connected equals true ?
        }
      }

      pouchdb
        .get(state)
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
          // return pouchdb.get(state.myclient).then(function(doc) {
          // state.notes = doc.notes
          //state.positions = doc.positions
          // console.log(state.notes)
          //  })
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
              //    connections: state.connections
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
      //console.log(state.connections)
      localid = e.activenoteid
      // console.log(localid)
      var i
      var j

      for (i = 0; i < Object.keys(state.connections).length; i++) {
        // console.log(state.connections[i].connection)
        for (
          j = 0;
          j < Object.keys(state.connections[i].connection).length;
          j++
        ) {
          // console.log(state.connections[i].connection[j].id)

          if (localid == state.connections[i].connection[j].id) {
            //console.log('match')
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
        store.commit('GET_MY_DOC')
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
            store.commit('GET_MY_DOC')
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
    startConnect: ({ commit }, { e, f, xpos, ypos }) => {
      commit('MAKE_CONNECT', { e, f, xpos, ypos })
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
