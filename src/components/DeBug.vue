<template>
  <div class="debug">
    <hr />
    <h2>Debug Options</h2>
    <h4>LAST UPDATE 26th Jan 2020.</h4>
    <p>You need to know these buttons destroy stuff.</p>
    <button class="danger" @click="removeLocal()">Join another microcosm</button>
    <button @click="exportStorage()">Export my contributions</button>
    <button
      class="danger"
      v-on:click="deleteClient"
    >Delete my contributions (inc. attachments) permanently</button>
    <button @click="handleConnection()">Online check</button>
  </div>
</template>

<script>
var serverUrl = 'https://nodenogg.in'

// window.addEventListener('online', this.handleConnection)
// window.addEventListener('offline', this.handleConnection)

export default {
  mounted() {
    window.addEventListener('online', this.handleConnection)
    window.addEventListener('offline', this.handleConnection)
  },
  methods: {
    exportStorage: function() {
      // Save local indexeddb document-store to JSON file
      // or export state.notes to JSON file
    },
    removeLocal: function() {
      localStorage.removeItem('myNNClient')
      localStorage.removeItem('mylastInstance')
      //location.reload()
      // Hardcoded in case URL has parameters the reload fails
      // Public site link
      //location.assign('https://alpha.nodenogg.in/')
      // local testing link
      location.assign('http://localhost:8080/')
    },

    deleteClient() {
      this.$store.dispatch('deleteClient')
    },
    handleConnection: function() {
      var ref = this
      if (navigator.onLine) {
        this.isReachable(this.getServerUrl()).then(function(online) {
          if (online) {
            // handle online status
            console.log('online')

            location.reload()
          } else {
            console.log('no connectivity')
          }
        })
      } else {
        // handle offline status
        console.log('offline')
        ref.$emit('offlineTriggered')
      }
    },
    isReachable: function(url) {
      return fetch(url, { method: 'HEAD', mode: 'no-cors' })
        .then(function(resp) {
          return resp && (resp.ok || resp.type === 'opaque')
        })
        .catch(function(err) {
          console.warn('[conn test failure]:', err)
        })
    },
    getServerUrl: function() {
      return serverUrl || window.location.origin
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li:before {
  content: '';
}

b {
  background-color: yellow;
  padding-right: 2em;
}
</style>
