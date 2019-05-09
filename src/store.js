import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'

Vue.use(Vuex)
var pouchdb = new PouchDB('couchdocs')
var remote = 'https://nn.adamprocter.co.uk/couchdocs'
// this is set by a "login"
//var myclient = 'mydoc'
var localid = null

const store = new Vuex.Store({
  state: {
    myclient: '',
    notes: [],
    otherclients: {},
    activeNote: {}
  },
  mutations: {
    SET_CLIENT(state, doc) {
      state.myclient = doc
      console.log(state.myclient)
      store.commit('GET_MY_DOC')
    },
    GET_ALL_DOCS(state) {
      pouchdb
        .allDocs({
          include_docs: true
        })
        .then(function(doc) {
          //console.log(doc)
          //state.docs = doc.rows[0].doc
          state.otherclients = doc.rows
          console.log(doc.rows)
        })
        .catch(function(err) {
          if (err.status == 404) {
            // error if no data
          }
        })
    },

    GET_MY_DOC(state) {
      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          state.notes = doc.notes
          //  console.log(state.notes)
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
            console.log('newclient')
            var uniqueid =
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
            return pouchdb.put({
              _id: state.myclient,
              notes: [
                {
                  id: uniqueid,
                  text: 'Welcome device ' + state.myclient,
                  // name from form as well
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
          // save current store
          var currentstore = store.state.notes
          // add new entry to the end
          currentstore.push({
            id: uniqueid,
            text: 'EDIT ME',
            owner: 'YOU',
            deleted: false
          })
          // put the store into pouchdb
          return pouchdb.put({
            _id: state.myclient,
            _rev: doc._rev,
            notes: currentstore
          })
        })
        .then(function(response) {
          // handle response
          if (response.ok == true) {
            //take the last text from DB and set as activeNote text ready for editor
            var end = Object.keys(store.state.notes).length - 1
            //console.log(store.state.notes[end].text)
            const newNote = {
              text: store.state.notes[end].text,
              id: store.state.notes[end].id
            }
            store.state.activeNote = newNote
          }
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },
    NOTE_ID(state, id) {
      localid = id
      //console.log(localid)
    },
    EDIT_NOTE(state, text) {
      //store.state.activeNote.text = text
      var i
      for (i = 0; i < Object.keys(store.state.notes).length; i++) {
        //console.log(store.state.notes[i].id)
        if (localid == store.state.notes[i].id) {
          console.log('match')
          console.log(store.state.notes[i].id)
          store.state.notes[i].text = text
        }
      }
      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          // save current store
          var currentstore = store.state.notes
          // put the store into pouchdb
          return pouchdb.put({
            _id: state.myclient,
            _rev: doc._rev,
            notes: currentstore
          })
        })
        .then(function(response) {
          // handle response
          if (response.ok == true) {
            // do something if you like
          }
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },
    DELETE_CLIENT(state) {
      console.log('delete')
      pouchdb
        .get(state.myclient)
        .then(function(doc) {
          console.log(doc)
          return pouchdb.remove(doc._id, doc._rev)
          //return pouchdb.remove(doc)
        })
        .then(function(result) {
          // handle result
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
        // turn on two-way, continuous, retriable sync
        pouchdb
          .sync(remote, { live: true, retry: true })
          .on('change', function() {
            // pop info into function to find out more
            // handle change
            //console.log('change')
            store.commit('GET_MY_DOC')
            store.commit('GET_ALL_DOCS')
          })
          .on('paused', function() {
            // replication paused (e.g. replication up to date, user went offline)
            console.log('replication paused')
            // store.dispatch("get_data");
          })
          .on('active', function() {
            // replicate resumed (e.g. new changes replicating, user went back online)
            console.log('back active')
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
    }
  }
})

export default store
store.dispatch('syncDB')
