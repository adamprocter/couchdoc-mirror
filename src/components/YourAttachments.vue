<template>
  <div class="yourattachments">
    <h2>Your attachments</h2>
    <!-- tips -->
    <!-- : is short for v-bind -->
    <div v-for="(myattachment, index) in myattachments" :key="index">
      <!-- could use file extenstion on name to render custom icon for anything not an image file 
      could use .mp4 to render in <video>-->
      <div v-if="myattachments[index].name.endsWith('.jpeg')">
        <img
          :src="myattachments[index].url"
          alt
          width="50%"
          height
          border="0"
        />
        <p>{{ myattachments[index].name }}</p>
      </div>

      <div v-else-if="myattachments[index].name.endsWith('.jpg')">
        <img
          :src="myattachments[index].url"
          alt
          width="50%"
          height
          border="0"
        />
        <p>{{ myattachments[index].name }}</p>
      </div>
      <div v-else-if="myattachments[index].name.endsWith('.png')">
        <img
          :src="myattachments[index].url"
          alt
          width="50%"
          height
          border="0"
        />
        <p>{{ myattachments[index].name }}</p>
      </div>

      <div v-else>
        <img
          src="../assets/img/icon-mac.jpg"
          alt
          width="50%"
          height
          border="0"
        />
        <p>{{ myattachments[index].name }}</p>
      </div>
      <!-- yet to have positions 

      -->
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
