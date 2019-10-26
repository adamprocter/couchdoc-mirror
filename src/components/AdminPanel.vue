<template>
  <div class="adminpanel">
    <hr />
    <h2>Admin Panel</h2>

    <form>
      Instance name:
      <input type="text" v-model="instance" placeholder="myNewInstance" />
      <br />-->
      <button @click="createInstance()">Create Instance</button> <--
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      instance: ''
    }
  },
  methods: {
    createInstance() {
      this.$store.dispatch('createInstance', this.instance)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
