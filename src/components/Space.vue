<template>
  <div :id="svgId" class="svg-container">SVG</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Space',

  data: function() {
    return {
      i: null,
      svgId: 'space',
      svgContainer: null,
      rects: [],
      texts: []
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
      //console.log(this.notes[2].text)
      var draw = this.$svg('space')

      var colors = ['red', 'blue', 'yellow', 'green', 'orange']
      for (this.i = 0; this.i < Object.keys(this.notes).length; this.i++) {
        this.rects[this.i] = draw.rect(100, 100).attr({ fill: colors[this.i] })
        this.texts[this.i] = draw.text(this.notes[this.i].text)
      }

      // testing positioning
      this.rects[0].x(0).cy(300 / 2)
      this.rects[1].x(100).cy(300 / 2)
      this.rects[2].x(150).cy(300 / 2)
      this.rects[3].x(200).cy(300 / 2)
      this.rects[4].x(250).cy(300 / 2)

      this.texts[0].x(0).cy(300 / 2)
      this.texts[1].x(100).cy(300 / 2)
      this.texts[2].x(150).cy(300 / 2)
      this.texts[3].x(200).cy(300 / 2)
      this.texts[4].x(250).cy(300 / 2)
    }
  }
}
</script>
<style lang="scss" scoped></style>
