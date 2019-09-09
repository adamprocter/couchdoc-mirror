<template>
  <div class="allspaceview">
    <h2>All spatial view</h2>
    <!-- tips-->
    <!-- : is short for v-bind -->
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="800" id="space" ref="sheets">
      <g v-for="(value, index) in otherclients" :key="index">
        <g
          v-for="(note, index) in value.doc.notes"
          v-bind:key="index"
          :transform="`translate(${note.xpos}, ${note.ypos})`"
          class="draggable"
        >
          <polygon
            v-if="note.content_type == 'link'"
            points="14,0 0,32 32,32"
            fill="#989898"
            :class="note.content_type"
          />
          <rect
            v-if="note.content_type == 'sheet'"
            width="25"
            height="25"
            fill="#989898"
            :class="note.content_type"
          />
        </g>
      </g>
    </svg>

    <!-- REF: Keep for now
    <div v-for="(myattachment, index) in myattachments" :key="index">
    <img :src="myattachments[index].url" alt width="50%" height border="0" />-->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'YourData',
  computed: mapState({
    //notes: state => state.notes,
    //myattachments: state => state.myattachments
    otherclients: state => state.otherclients
  })
}
</script>

<style lang="css" scoped></style>
