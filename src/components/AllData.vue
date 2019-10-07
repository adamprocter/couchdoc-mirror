<template>
  <div class="alldata">
    <h2>All contributions (in realtime)</h2>
    <ul class="data" v-for="(value, index) in allnotes" v-bind:key="index">
      <li v-for="(note, index) in value.doc.notes" v-bind:key="index">{{ note.text }} - {{note.id}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AllData',
  computed: mapState({
    allnotes: state => state.allnotes
  })
}
</script>

<style lang="css" scoped></style>
