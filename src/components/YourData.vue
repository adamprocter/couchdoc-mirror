<template>
  <div class="yourdata">
    <h2>These are your contributions</h2>
    <ul class="data">
      <!-- tips -->
      <!-- : is short for v-bind -->
      <li v-for="(note, index) in notes" :key="index">{{ note.text }}</li>
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
