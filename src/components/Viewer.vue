<template>
  <div>
    <ul>
      <li v-for="(note, index) in notes" v-bind:key="index">{{ note.text }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Viewer',
  computed: mapState({
    notes: state => state.notes
  })
}
</script>

<style lang="css" scoped></style>
