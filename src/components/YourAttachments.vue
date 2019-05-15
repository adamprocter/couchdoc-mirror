<template>
  <div>
    <h2>These are your attachments</h2>

    <div v-for="(myattachment, index) in myattachments" v-bind:key="index">
      <img
        v-bind:src="myattachments[index].url"
        alt
        width="50%"
        height
        border="0"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'YourAttachments',
  // this is the last thing in the list...
  computed: mapState({
    myattachments: state => state.myattachments
  })
}
</script>

<style lang="css" scoped></style>
