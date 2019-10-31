<template>
  <div class="home">
    <h1>
      <img src="../assets/img/icon.png" width="50px" />
      nodenoggin
    </h1>

    <!-- tips -->
    <!--  @ is short for v-on: -->
    <!-- : is short for v-bind -->
    <Editor v-if="editing" @closeEdit="closeEdit()" />
    <ToolBar v-else-if="clientset" @editMode="editMode()" />
    <!-- <YourData v-if="clientset" /> -->
    <!-- <SpaceView v-if="clientset" @editMode="editMode()" />-->

    <AllData v-if="clientset" />
    <AllSpace v-if="clientset" @editMode="editMode()" />
    <!-- <YourAttachments v-if="clientset" /> -->
    <ClientSet v-else @clientAdded="clientAdded()" />
    <AdminPanel />

    <DeBug />
  </div>
</template>

<script>
// tips
// @ is an alias to /src

import ClientSet from '@/components/ClientSet.vue'
import AdminPanel from '@/components/AdminPanel.vue'
import YourData from '@/components/YourData.vue'
import SpaceView from '@/components/SpaceView.vue'
import YourAttachments from '@/components/YourAttachments.vue'
import AllData from '@/components/AllData.vue'
import AllSpace from '@/components/AllSpace.vue'
import ToolBar from '@/components/ToolBar.vue'
import Editor from '@/components/Editor.vue'
import DeBug from '@/components/DeBug.vue'

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
    AdminPanel,
    ToolBar,
    YourData,
    SpaceView,
    YourAttachments,
    AllData,
    AllSpace,
    Editor,
    DeBug
  },
  methods: {
    clientAdded() {
      this.clientset = !this.clientset
    },
    editMode() {
      //console.log('heard')
      console.log(state)
      this.editing = !this.editing
    },
    closeEdit() {
      this.editing = false
    }
  }
}
</script>
