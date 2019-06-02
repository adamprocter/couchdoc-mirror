<template>
  <div class="spaceview">
    <h2>Space Man !</h2>
    <!-- <ul class="data">
    <!-- tips-->
    <!-- : is short for v-bind -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="1800"
      id="space"
    >
      <g
        v-for="(note, index) in notes"
        :key="index"
        :transform="`translate(0, ${index * 170})`"
      >
        <rect height="120" width="80" fill="#f0b375"></rect>
        <text y="15">{{ note.text }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'YourData',
  computed: mapState({
    notes: state => state.notes
  })
}
</script>

<style lang="css" scoped></style>
