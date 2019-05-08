<template>
  <div class="home">
    <ClientSet />
    <ToolBar v-if="clientset" v-on:editMode="editMode()" />
    <Editor v-if="editing" v-on:closeEdit="closeEdit()" />
    <YourData v-if="clientset" />
    <AllData v-if="clientset" />
  </div>
</template>

<script>
// @ is an alias to /src
import ClientSet from '@/components/ClientSet.vue'
import YourData from '@/components/YourData.vue'
import AllData from '@/components/AllData.vue'
import ToolBar from '@/components/ToolBar.vue'
import Editor from '@/components/Editor.vue'

export default {
  name: 'home',
  data: function() {
    return {
      editing: false,
      clientset: true
    }
  },
  components: {
    ClientSet,
    ToolBar,
    YourData,
    AllData,
    Editor
  },
  methods: {
    editMode() {
      this.editing = !this.editing
    },
    closeEdit() {
      //console.log('close!')
      this.editing = false
    }
  }

  //
}
</script>
