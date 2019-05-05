<template>
  <div class="editor">
    <h2>Edit</h2>
    <button @click="closeEdit()">Close</button>
    <textarea
      v-bind:value="activeNote.text"
      @input="editNote"
      class="form-control"
    ></textarea>
    {{ (activeid = activeNote.id) }}
    <input v-bind:value="activeNote.id" readonly />
  </div>
</template>

<script>
import { mapState } from 'vuex'
var activeId = state.activeNote.id

export default {
  methods: {
    // not sure this is best practice to dispatch from here
    editNote(e) {
      this.$store.dispatch('editNote', e)
      this.$store.dispatch('noteId', activeId)
    },
    // noteId(e) {
    //   this.$store.dispatch('noteId', e)
    // },
    closeEdit() {
      //console.log('emitclose')
      this.$emit('closeEdit')
    }
  },
  computed: mapState({
    activeNote: state => state.activeNote
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
