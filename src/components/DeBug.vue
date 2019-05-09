<template>
  <div class="debug">
    <h2>Debug Component</h2>

    <button v-on:click="removeLocal">Delete Local Storage</button>
    <button v-on:click="deleteClient">Delete my Local Pouch</button>
    <button>Delete my Remote Couch</button>
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
