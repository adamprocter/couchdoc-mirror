var connkey = false
var removekey = false
export const shortcuts = {
  methods: {
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
          this.addDoc()
          this.$store.dispatch('shortcutsState', true)
        } else if (e.keyCode == 65) {
          // a for attachement
          // FIXME: Currently cant call this way as need to open the file picker ?
          this.addAttachment()
        } else if (e.keyCode == 84) {
          this.$emit('togView')
        } else if (e.keyCode == 13 && e.altKey) {
          // option enter = close editor
          this.$store.dispatch('shortcutsState', false)
          this.$store.dispatch('editOff')
          this.$emit('closeEdit')
        } else if (e.keyCode == 67) {
          // c = turn on connect mode
          this.$emit('closeEdit')

          if (connkey == true) {
            connkey = false
          } else {
            connkey = true
          }
          removekey = false
          this.connKey()
          this.removeKey()
        } else if (e.keyCode == 68) {
          // d = delete connections mode
          this.$emit('closeEdit')

          if (removekey == true) {
            removekey = false
          } else {
            removekey = true
          }
          connkey = false
          this.connKey()
          this.removeKey()
        } else if (e.keyCode == 61 && e.altKey) {
          this.zoominButton()
        } else if (e.keyCode == 173 && e.altKey) {
          this.zoomoutButton()
        }
      }
    },
    connKey() {
      if (document.getElementById('modeon') != null) {
        if (connkey == true) {
          document.getElementById('modeon').classList.add('connectionon')
        } else {
          document.getElementById('modeon').classList.add('connectionoff')
          document.getElementById('modeon').classList.remove('connectionon')
        }
      }
    },

    removeKey() {
      if (document.getElementById('modeon') != null) {
        if (removekey == true) {
          document.getElementById('modedelon').classList.add('connectionon')
        } else {
          document.getElementById('modedelon').classList.add('connectionoff')
          document.getElementById('modedelon').classList.remove('connectionon')
        }
      }
    },

    zoominButton() {
      this.viewboxx -= 50
      this.viewboxy -= 50
    },

    zoomoutButton() {
      this.viewboxx += 50
      this.viewboxy += 50
    }
  }
}
