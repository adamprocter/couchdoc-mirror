<template>
  <div class="debug">
    <hr />
    <h2>Debug Options</h2>
    <h4>LAST UPDATE : 8th Oct 2019.</h4>
    <p>You need to know these buttons destroy stuff.</p>
    <button v-on:click="removeLocal">Just delete Local Storage</button>
    <button v-on:click="deleteClient">Delete my Contributions (inc. attachments)</button>
  </div>
</template>

<script>
export default {
  methods: {
    removeLocal: function() {
      localStorage.removeItem('myNNClient')
      //console.log('remove')
    },

    deleteClient() {
      this.$store.dispatch('deleteClient')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
