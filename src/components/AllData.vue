<template>
  <div>
    <h2>This is all contributions (in realtime)</h2>
    <ul v-for="(value, index) in otherclients" v-bind:key="index">
      <li v-for="(note, index) in value.doc.notes" v-bind:key="index">
        {{ note.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AllData',
  computed: mapState({
    otherclients: state => state.otherclients
  })
}
</script>

<style lang="css" scoped></style>
