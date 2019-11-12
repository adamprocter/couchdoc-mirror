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
    <ReaderView v-if="clientset" />
    <ShortCuts v-if="clientset" />
    <!-- <AllData v-if="clientset" /> -->
    <AllSpace v-if="clientset" @closeEdit="closeEdit()" />
    <ClientSet v-else @clientAdded="clientAdded()" />
    <AdminPanel />

    <DeBug />
  </div>
</template>

<script>
// tips
// @ is an alias to /src
import { mapState } from 'vuex'

import ClientSet from '@/components/ClientSet.vue'
import AdminPanel from '@/components/AdminPanel.vue'
import ShortCuts from '@/components/ShortCuts.vue'
import AllSpace from '@/components/AllSpace.vue'
import ToolBar from '@/components/ToolBar.vue'
import Editor from '@/components/Editor.vue'
import ReaderView from '@/components/ReaderView.vue'
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
    ShortCuts,
    AllSpace,
    Editor,
    ReaderView,
    DeBug
  },

  computed: mapState(['editon']),

  watch: {
    editon(newValue) {
      if (newValue == true) {
        this.editing = !this.editing
      }
    }
  },

  methods: {
    clientAdded() {
      this.clientset = !this.clientset
    },
    editMode() {
      this.editing = !this.editing
    },

    closeEdit() {
      this.editing = false
    }
  }
}
</script>
