<template>
  <div>
    <h2>This is your contributions</h2>
    <ul>
      <li v-for="(note, index) in notes" v-bind:key="index">{{ note.text }}</li>
    </ul>
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
