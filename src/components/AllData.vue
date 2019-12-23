<template>
  <div class="alldata">
    <h2>Bucket view</h2>
    <ul class="data" v-for="(value, index) in allnotes" v-bind:key="index">
      <li v-for="(note, index) in value.doc.notes" v-bind:key="index">
        <!-- v-if hides device name -->
        <p v-if="note.content_type != 'device'">{{ note.text }}</p>
      </li>
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
