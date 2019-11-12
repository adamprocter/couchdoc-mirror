<template>
  <div class="reader">
    <h2>Reader View</h2>
    <p>{{ activeNote.text }}</p>

    <div v-if="activeNote.attachment_name != undefined">
      <div v-if="activeNote.attachment_name.endsWith('.jpeg')">
        <img :src="activeAttachment[0].url" alt width="20%" height border="0" />
      </div>

      <div v-else-if="activeNote.attachment_name.endsWith('.jpg')">
        <img :src="activeAttachment[0].url" alt width="20%" height border="0" />
      </div>
      <div v-else-if="activeNote.attachment_name.endsWith('.png')">
        <img :src="activeAttachment[0].url" alt width="20%" height border="0" />
      </div>

      <div v-else>
        <img
          src="../assets/img/icon-mac.jpg"
          alt
          width="20%"
          height
          border="0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ReaderView',

  methods: {},
  computed: mapState({
    activeNote: state => state.activeNote,
    activeAttachment: state => state.activeAttachment
  })
}
</script>

<style lang="css" scoped></style>
