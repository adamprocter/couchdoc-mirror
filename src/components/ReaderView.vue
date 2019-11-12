<template>
  <div class="readerview">
    <h2>Reader View</h2>
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
  name: 'ReaderView',
  computed: mapState({
    notes: state => state.notes
  })
}
</script>

<style lang="css" scoped></style>
