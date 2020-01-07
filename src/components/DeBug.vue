<template>
  <div class="debug">
    <hr />
    <h2>Debug Options</h2>
    <h4>LAST UPDATE 7th Jan 2020.</h4>
    <p>You need to know these buttons destroy stuff.</p>
    <button class="danger" v-on:click="removeLocal">
      Join another instance
    </button>
    <button v-on:click="exportStorage">Export my Contributions</button>
    <button class="danger" v-on:click="deleteClient">
      Delete my Contributions (inc. attachments)
    </button>
  </div>
</template>

<script>
export default {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
