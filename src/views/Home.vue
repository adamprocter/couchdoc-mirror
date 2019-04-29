<template>
  <div class="home">
    <ToolBar v-on:editMode="editMode()"/>
    <Viewer/>
    <Editor v-if="editing" v-on:closeEdit="closeEdit()"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Viewer from '@/components/Viewer.vue'
import ToolBar from '@/components/ToolBar.vue'
import Editor from '@/components/Editor.vue'

export default {
  name: 'home',
  data: function() {
    return {
      editing: false
    }
  },
  components: {
    ToolBar,
    Viewer,
    Editor
  },
  methods: {
    editMode() {
      this.editing = !this.editing
    },
    closeEdit() {
      console.log('close!')
      this.editing = false
    }
  }

  //
}
</script>
