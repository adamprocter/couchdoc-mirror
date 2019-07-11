<template>
  <div class="toolbar">
    <h2>Create / Attach</h2>
    <p>
      Press
      <em>Create</em> to add a contribution.
    </p>
    <p>
      Press
      <em>Add Media</em> to attach media.
    </p>
    <button
      @click="
        addDoc()
        editMode()
      "
    >
      Create
    </button>

    <form>
      <label for="myFiles">Add Media</label>
      <input type="file" @change="addFile" ref="myFiles" id="myFiles" />
    </form>
    <hr />
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
      // FIXME: add unique ID to attachments as well in store.js
      this.files = this.$refs.myFiles.files
      // console.log(this.files)
      this.$store.dispatch('addFile', this.files[0])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
