<template>
  <div>
    <ul>
      <li v-for="(note, index) in notes" v-bind:key="index">{{ note.text }}</li>
    </ul>
    <ul>
      <template v-for="(value, index) in otherclients">
        <li v-for="(note, note_index) in value.doc.notes">{{ note.text }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Viewer',
  computed: mapState({
    notes: state => state.notes,
    otherclients: state => state.otherclients
  })
}
</script>

<style lang="css" scoped></style>
