<template>
  <div class="alldata">
    <h2>Bucket view</h2>
    <ul class="data" v-for="(value, index) in allnotes" v-bind:key="index">
      <li v-for="(note, index) in value.doc.notes" v-bind:key="index">
        <!-- v-if hides device name -->
        <p v-if="note.content_type != 'device'">{{ note.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
var inEdit = false

export default {
  name: 'AllData',
  computed: mapState({
    allnotes: state => state.allnotes
  }),

  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyPress)
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeyPress)
    }
  },

  methods: {
    // FIXME : There must be a better way to handle these shortcuts

    handleKeyPress(e) {
      if (e.keyCode == 13 && e.altKey) {
        // option enter = close editor
        this.$store.dispatch('editOff')
        this.$emit('closeEdit')
        inEdit = false
      }

      if (inEdit == false) {
        if (e.keyCode == 78) {
          // n for new
          inEdit = true
          this.addDoc()
        }
      }
    },

    addDoc() {
      this.$store.dispatch('addDoc')
      this.$emit('editMode')
    }
  }
}
</script>

<style lang="css" scoped></style>
