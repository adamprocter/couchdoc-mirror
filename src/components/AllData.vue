<template>
  <div class="alldata" name="anchorName">
    <h2>List</h2>
    <ul class="data" v-for="(value, index) in allnotes" v-bind:key="index">
      <li v-for="(note, index) in value.doc.notes" v-bind:key="index">
        <!-- v-if hides device name -->
        <p v-if="note.content_type != 'device' && note.deleted == false">{{ note.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { shortcuts } from './mixins/shortcuts.js'

export default {
  name: 'AllData',
  mixins: [shortcuts],
  computed: mapState({
    shortcutsstate: state => state.shortcutsstate,
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
    addDoc() {
      this.$store.dispatch('addDoc')
      this.$emit('editMode')
    }
  }
}
</script>

<style lang="css" scoped>
.data p {
  white-space: pre-wrap;
  line-height: 1em;
}

ul {
  /* FIXME : grid in a grid for these I think */
}

li:last-child {
  padding-bottom: 13px;
  border-bottom: #cab6ff solid 3px;
}

li {
  margin-bottom: 0.5em;
  font-size: 18px;
  line-height: 1.4em;
}
</style>