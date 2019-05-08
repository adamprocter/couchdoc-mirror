<template>
  <div>
    <ul>
      <li v-for="(note, index) in notes" v-bind:key="index">{{ note.text }}</li>
    </ul>
    <ul>
      <li v-for="(value, index) in otherclients" v-bind:key="index">
        <!-- this is an array of objects and I want text out from all  -->
        DATA = {{ value.doc.notes }}
      </li>
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
