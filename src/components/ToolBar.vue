<template>
  <div class="toolbar">
    <h2>Create / Attach</h2>
    <p>
      Press
      <em>Create</em> to add a note or link.
    </p>

    <p>
      Press
      <em>Add</em> to add an attachments.
    </p>

    <button @click="
        addDoc()
        editMode()
      ">Create</button>
    <form>
      <label class="myFiles" for="myFiles">Add</label>
      <input type="file" @change="addFile()" ref="myFiles" id="myFiles" />
    </form>

    <hr />
    <button @click="togView()">Switch View</button>
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
      this.$store.dispatch('shortcutsState', true)
    },
    editMode() {
      this.$emit('editMode')
    },

    togView() {
      this.$emit('togView')
    },

    addFile() {
      this.files = this.$refs.myFiles.files
      // console.log(this.files[0].name)
      this.$store.dispatch('addFile', this.files[0])
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
