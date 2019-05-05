import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'

Vue.use(Vuex)
var pouchdb = new PouchDB('couchdocs')
var remote = 'https://nn.adamprocter.co.uk/couchdocs'
var mydoc = 'mydoc'
var localid = 0

const store = new Vuex.Store({
  state: {
    notes: [],
    activeNote: {}
  },
  mutations: {
    GET_DB(state) {
      pouchdb
        .get(mydoc)
        .then(function(doc) {
          state.notes = doc.notes
          //  console.log(state.notes)
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    ADD_DOC() {
      var uniqueid =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      pouchdb
        .get(mydoc)
        .then(function(doc) {
          // save current store
          var currentstore = store.state.notes
          // add new entry to the end
          currentstore.push({
            id: uniqueid,
            text: 'New Entry',
            owner: 'YOU',
            deleted: false
          })
          // put the store into pouchdb
          return pouchdb.put({
            _id: mydoc,
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
      //console.log(id)
    },
    EDIT_NOTE(state, text) {
      store.state.activeNote.text = text
      console.log(store.state.activeNote.text)
      // USE the unique ID instead
      console.log(localid)
      var end = Object.keys(store.state.notes).length - 1
      store.state.notes[end].text = text
      // console.log(store.state.notes[end].text)
      pouchdb
        .get(mydoc)
        .then(function(doc) {
          // save current store
          var currentstore = store.state.notes
          // put the store into pouchdb
          return pouchdb.put({
            _id: mydoc,
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
    }
  },
  actions: {
    syncDB: () => {
      pouchdb.replicate.from(remote).on('complete', function() {
        // turn on two-way, continuous, retriable sync
        pouchdb
          .sync(remote, { live: true, retry: true })
          .on('change', function(info) {
            // handle change
            //console.log('change')
            store.commit('GET_DB')
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
            console.log('complete')
          })
          .on('error', function(err) {
            console.log(err)
          })
      })
    },
    addDoc: ({ commit }) => {
      commit('ADD_DOC')
    },
    editNote: ({ commit }, e) => {
      commit('EDIT_NOTE', e.target.value)
    },
    noteId: ({ commit }, e) => {
      commit('NOTE_ID', e.target.value)
    }
  }
})

export default store
store.dispatch('syncDB')
store.commit('GET_DB')
