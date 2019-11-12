<template>
  <div class="editor">
    <form id="editForm">
      <h2>Edit item</h2>
      <div v-if="editorNote.attachment_name == undefined">
        <label>Choose Type</label>
        <select v-model="editorNote.content_type" id="myList">
          <option value="sheet">note</option>
          <option value="link">link</option>
          <option value="attachment">attachment</option>
        </select>
      </div>
      <br />
      <textarea
        @input="editNote"
        v-model="editorNote.text"
        class="form-control"
        ref="notetext"
      ></textarea>

      <div v-if="editorNote.attachment_name != undefined">
        <div v-if="editorNote.attachment_name.endsWith('.jpeg')">
          <img
            :src="activeAttachment[0].url"
            alt
            width="20%"
            height
            border="0"
          />
        </div>

        <div v-else-if="editorNote.attachment_name.endsWith('.jpg')">
          <img
            :src="activeAttachment[0].url"
            alt
            width="20%"
            height
            border="0"
          />
        </div>
        <div v-else-if="editorNote.attachment_name.endsWith('.png')">
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

      <input :value="editorNote.id" name="id" readonly hidden />
      <input
        :value="editorNote.attachment_name"
        name="attachmentname"
        readonly
        hidden
      />
      <div>
        <button @click="closeEdit()">Finish</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//var myTimer
var delay = 100

export default {
  mounted() {
    setTimeout(this.setFocus, delay)
  },
  methods: {
    setFocus() {
      this.$refs.notetext.focus()
    },
    // not sure this is best practice to dispatch from here
    editNote(e, t, aname) {
      t = this.editorNote.content_type
      aname = this.editorNote.attachment_name
      this.$store.dispatch('editNote', { e, t, aname })
      this.$store.dispatch('noteId', this.editorNote.id)
    },
    closeEdit() {
      this.$emit('closeEdit')
      this.$store.dispatch('editOff')
    }
  },
  computed: mapState({
    editon: state => state.editon,
    editorNote: state => state.editorNote,
    activeAttachment: state => state.activeAttachment
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
