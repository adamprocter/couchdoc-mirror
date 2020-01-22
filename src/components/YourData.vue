<template>
  <div class="yourdata" name="anchorName">
    <h2>Offline</h2>
    <p>
      nodenogg.in appears to be offline, which means you cant see other data at this stage, as it maybe out of date.
      Once you reconnect. Your data will sync and the main views will reappear.
      This maybe down to you or maybe us.
      If you think it us click Support at the top, and let us know
    </p>
    <h3>List - Your Data</h3>
    <ul class="data">
      <!-- tips -->
      <!-- : is short for v-bind -->
      <!-- v-if="note.content_type != 'device'" -->
      <li v-for="(note, index) in notes" :key="index">
        <p v-if="note.content_type != 'device'">{{ note.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { shortcuts } from './mixins/shortcuts.js'

export default {
  name: 'YourData',
  mixins: [shortcuts],
  computed: mapState({
    shortcutsstate: state => state.shortcutsstate,
    notes: state => state.notes
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
    addDoc() {
      this.$store.dispatch('addDoc')
      this.$emit('editMode')
    }
  }
}
</script>

<style lang="css" scoped>
h3 {
  margin-top: 1em;
}
</style>
