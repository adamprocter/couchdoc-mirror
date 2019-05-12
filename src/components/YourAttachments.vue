<template>
  <div>
    <h2>These are your attachments</h2>
    <ul class="data">
      <li v-for="(myattachment, index) in myattachments" v-bind:key="index">
        <img src />
        {{ myattachments.img }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'YourAttachments',
  computed: mapState({
    myattachments: state => state.myattachments
  })
}
</script>

<style lang="css" scoped></style>
