<template>
  <div class="toolbar">
    <h2>Create / Attach</h2>
    <p>Press Create to add and edit a contribution.</p>
    <p>Press Browse/Choose to attach an image</p>
    <button
      @click="
        addDoc()
        editMode()
      "
    >
      Create
    </button>

    <form>
      <input type="file" @change="addFile" ref="myFiles" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: []
    }
  },
  methods: {
    addDoc() {
      this.$store.dispatch('addDoc')
    },
    editMode() {
      this.$emit('editMode')
    },
    addFile() {
      this.files = this.$refs.myFiles.files
      // console.log(this.files)
      this.$store.dispatch('addFile', this.files[0])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
