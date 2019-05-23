<template>
  <div :id="svgId" class="svg-container"></div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Space',

  data: function() {
    return {
      svgId: 'space',
      svgContainer: null
    }
  },

  computed: mapState({
    notes: state => state.notes
  }),

  mounted: function() {
    this.generateSpace()
  },
  methods: {
    generateSpace: function() {
      console.log(this.notes[2].text)
      var draw = this.$svg('space')
      var i
      var y = 0
      var rects = []
      for (i = 0; i < Object.keys(this.notes).length; i++) {
        rects[i] = draw.rect(100, 100).attr({ fill: '#f06' })
        rects[i].move(10, 10 + i)
        draw.text(this.notes[i].text)
      }
      console.log(rects)
    }
  }
}
</script>
<style lang="scss" scoped></style>
