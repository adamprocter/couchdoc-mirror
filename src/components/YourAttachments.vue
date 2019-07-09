<template>
  <div class="yourattachments">
    <h2>Your media</h2>
    <!-- tips -->
    <!-- : is short for v-bind -->
    <div v-for="(myattachment, index) in myattachments" :key="index">
      <img :src="myattachments[index].url" alt width="50%" height border="0" />
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
