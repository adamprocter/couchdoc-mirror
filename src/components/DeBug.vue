<template>
  <div class="debug">
    <hr />
    <h2>Debug Options</h2>
    <h4>LAST UPDATE 6th Jan 2020.</h4>
    <p>You need to know these buttons destroy stuff.</p>
    <button class="danger" v-on:click="removeLocal">
      Join another instance
    </button>
    <button class="danger" v-on:click="deleteClient">
      Delete my Contributions (inc. attachments)
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    removeLocal: function() {
      localStorage.removeItem('myNNClient')
      location.reload()
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
