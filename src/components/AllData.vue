<template>
  <div class="alldata" name="anchorName">
    <h2>List</h2>
    <ul class="data" v-for="(value, index) in allnotes" v-bind:key="index">
      <li v-for="(note, index) in value.doc.notes" v-bind:key="index">
        <!-- v-if hides device name -->
        <p
          class="dataeach"
          v-if="note.content_type != 'device' && note.deleted == false"
          :inner-html.prop="note.text | marked"
        ></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { shortcuts } from './mixins/shortcuts.js'
import marked from 'marked'

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

  filters: {
    // need to write a reverse data filter I suspect here so new data is at the top of list
    marked: marked
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
  line-height: 1.2em;
}

h2 {
  margin-bottom: -2em;
}

.data >>> .dataeach p {
  margin-bottom: -0.5em;
}

.data >>> .dataeach h1,
.data >>> .dataeach h2,
.data >>> .dataeach h3,
.data >>> .dataeach h4 {
  margin-top: 0px;
  margin-bottom: 0px;
}

.data >>> .dataeach ul,
.data >>> .dataeach ol {
  line-height: 0.5em;
  margin-top: 0px;
  margin-bottom: 0px;
}

ul {
  /* FIXME : grid in a grid for these I think */
  display: flex;
  flex-direction: column-reverse;
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
