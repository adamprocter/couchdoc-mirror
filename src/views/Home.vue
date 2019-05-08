<template>
  <div class="home">
    <h1>nodenoggin</h1>
    <Editor v-if="editing" v-on:closeEdit="closeEdit()" />
    <ToolBar v-else-if="clientset" v-on:editMode="editMode()" />
    <YourData v-if="clientset" />
    <AllData v-if="clientset" />
    <ClientSet v-else v-on:clientAdded="clientAdded()" />
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
      clientset: false
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
    clientAdded() {
      //console.log('added!')
      this.clientset = !this.clientset
    },
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
