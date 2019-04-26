import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'
Vue.use(Vuex)
var pouchdb = new PouchDB('couchdocs')
var remote = 'https://nn.adamprocter.co.uk/couchdocs'
var mydoc = 'mydoc'

const store = new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    GET_DB(state) {
      pouchdb
        .get(mydoc)
        .then(function(doc) {
          state.notes = doc.notes
          console.log(state.notes)
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    ADD_DOC() {
      console.log('add')
      var uniqueid =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      // send added doc to the pouch
      pouchdb
        .get(mydoc)
        .then(function(doc) {
          return pouchdb.put({
            _id: mydoc,
            _rev: doc._rev,
            notes: [
              {
                id: uniqueid,
                text: 'vvvvv',
                owner: 'adam',
                deleted: false
              },

              {
                id: uniqueid,
                text: 'adam',
                owner: 'adam',
                deleted: false
              }
            ]
          })
        })
        .then(function(response) {
          // handle response
          if (response.ok == true) {
            //if all good could do something
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
        console.log('first sync completed')

        // turn on two-way, continuous, retriable sync
        pouchdb
          .sync(remote, { live: true, retry: true })
          .on('change', function(info) {
            // handle change
            console.log('change')
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
    }
  }
})

export default store
store.dispatch('syncDB')
store.commit('GET_DB')
