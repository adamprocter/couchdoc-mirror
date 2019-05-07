<template>
  <div>
    <ul>
      <li v-for="(pouchdoc, index) in pouchdocs" v-bind:key="index">{{ pouchdoc.text }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Viewer',
  computed: mapState({
    // need to be i to loop and get alldocs
    // for (
    //     i = 0;
    //     i < Object.keys(store.state.pouchdocs).length;
    //     i++
    //   ) {pouchdocs: state => state.pouchdocs[i].doc.notes}
    pouchdocs: function(state) {
      var i
      for (i = 0; i < Object.keys(store.state.pouchdocs).length; i++)
        return state.pouchdocs[i].doc.notes

      //      return state.pouchdocs[i].doc.notes
    }

    // var f = x => y;
    //var g = function(x) { return y; }
  })
}
</script>

<style lang="css" scoped></style>
