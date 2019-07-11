<template>
  <div class="editor">
    <form id="editForm">
      <h2>Edit item</h2>

      <textarea
        v-model="activeNote.text"
        @input="editNote"
        class="form-control"
      ></textarea>
      <input v-bind:value="activeNote.id" name="id" readonly hidden />
      <button @click="closeEdit()">Finish</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    // not sure this is best practice to dispatch from here
    editNote(e) {
      this.$store.dispatch('editNote', e)
      this.$store.dispatch('noteId', this.activeNote.id)
      //console.log(this.activeNote.id)
    },
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
