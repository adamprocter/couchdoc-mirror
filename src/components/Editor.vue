<template>
  <div class="editor">
    <form id="editForm">
      <h2>Edit item</h2>
      <label>Choose Type</label>
      <select v-model="activeNote.content_type" id="myList">
        <option value="sheet">note</option>
        <option value="link">link</option>
        <option value="attachment">attachment</option>
      </select>
      <br />
      <textarea @input="editNote" v-model="activeNote.text" class="form-control"></textarea>
      <!-- <input v-bind:value="activeNote.id" name="id" readonly hidden /> -->
      <input v-bind:value="activeNote.id" name="id" readonly hidden />
      <input v-bind:value="activeNote.attachment_name" name="attachmentname" readonly hidden />
      <button @click="closeEdit()">Finish</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    // not sure this is best practice to dispatch from here
    editNote(e, t, aname) {
      t = this.activeNote.content_type
      aname = this.activeNote.attachment_name
      this.$store.dispatch('editNote', { e, t, aname })
      this.$store.dispatch('noteId', this.activeNote.id)
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
