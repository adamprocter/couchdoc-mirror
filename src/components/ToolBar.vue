<template>
  <div class="toolbar">
    <button v-on:click="addDoc">Create</button>
  </div>
</template>

<script>
export default {
  methods: {
    addDoc() {
      this.$store.dispatch('addDoc')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
