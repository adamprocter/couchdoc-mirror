<template>
  <div class="alldata">
    <h2>List</h2>
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

export default {
  name: 'AllData',
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
    // FIXME : There must be a better way to handle these shortcuts

    handleKeyPress(e) {
      if (e.keyCode == 13 && e.altKey) {
        // option enter = close editor
        this.$store.dispatch('editOff')
        this.$emit('closeEdit')
        this.$store.dispatch('shortcutsState', false)
      }

      if (this.shortcutsstate == false) {
        if (e.keyCode == 78) {
          // n for new
          this.$store.dispatch('shortcutsState', true)
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

<style lang="css" scoped>
@import url('https://rsms.me/inter/inter.css');
html {
  font-family: 'Inter', sans-serif;
}
@supports (font-variation-settings: normal) {
  html {
    font-family: 'Inter var', sans-serif;
  }
}

h1,
h2,
h3,
p {
  font-family: 'Inter var', sans-serif;
  color: black;
  margin: 0px;
}

p,
li {
  font-family: chaparral-pro, serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}
</style>