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
      this.$svg('space')
        .rect(100, 100)
        .attr({ fill: '#f06' })
    }
  }
}
</script>
<style lang="scss" scoped></style>
