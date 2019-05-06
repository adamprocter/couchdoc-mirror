<template>
  <div class="toolbar">
    <button
      @click="
        addDoc()
        editMode()
      "
    >
      Create
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    addDoc() {
      this.$store.dispatch('addDoc')
    },
    editMode() {
      // call the method here
      this.$emit('editMode')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
