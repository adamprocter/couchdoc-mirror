<template>
  <div class="toolbar">
    <h2>Create</h2>
    <p>Press create to add and then edit a contribution.</p>
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
//var input = document.querySelector('#inputFile')
//input.addEventListener('change', function() {
//var file = input.files[0] // file is a blob
//console.log('yo')
//})
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
