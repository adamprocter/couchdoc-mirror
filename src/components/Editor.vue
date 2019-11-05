<template>
  <div class="editor">
    <form id="editForm">
      <h2>Edit item</h2>
      <div v-if="activeNote.attachment_name == undefined">
        <label>Choose Type</label>
        <select v-model="activeNote.content_type" id="myList">
          <option value="sheet">note</option>
          <option value="link">link</option>
          <option value="attachment">attachment</option>
        </select>
      </div>
      <br />
      <textarea
        @input="editNote"
        v-model="activeNote.text"
        class="form-control"
        ref="notetext"
      ></textarea>

      <div v-if="activeNote.attachment_name != undefined">
        <div v-if="activeNote.attachment_name.endsWith('.jpeg')">
          <img
            :src="activeAttachment[0].url"
            alt
            width="20%"
            height
            border="0"
          />
        </div>

        <div v-else-if="activeNote.attachment_name.endsWith('.jpg')">
          <img
            :src="activeAttachment[0].url"
            alt
            width="20%"
            height
            border="0"
          />
        </div>
        <div v-else-if="activeNote.attachment_name.endsWith('.png')">
          <img
            :src="activeAttachment[0].url"
            alt
            width="20%"
            height
            border="0"
          />
        </div>

        <div v-else>
          <img
            src="../assets/img/icon-mac.jpg"
            alt
            width="20%"
            height
            border="0"
          />
        </div>
      </div>

      <input :value="activeNote.id" name="id" readonly hidden />
      <input
        :value="activeNote.attachment_name"
        name="attachmentname"
        readonly
        hidden
      />
      <button @click="closeEdit()">Finish</button>
      <p><b>Shortcut :</b> Shift + x to Finish</p>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    this.$refs.notetext.focus()
    this.$refs.notetext.select() // FIXME: not selecting current text
  },
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
    activeNote: state => state.activeNote,
    activeAttachment: state => state.activeAttachment
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
