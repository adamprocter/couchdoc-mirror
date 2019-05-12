<template>
  <div>
    <h2>These are your attachments</h2>
    <img v-bind:src="myattachments" alt width="50%" height border="0" />

    <!-- <ul class="data" v-for="(value, index) in myattachments" v-bind:key="index">
      <li
        v-for="(myattachment, index) in value.myattachment"
        v-bind:key="index"
      >
        {{ myattachments }}
      </li>
    </ul>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'YourAttachments',
  // this is the last thing in the list...
  computed: mapState({
    myattachments: state => state.myattachments.urlsrc
  })
}
</script>

<style lang="css" scoped></style>
