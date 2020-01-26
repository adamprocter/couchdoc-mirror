<template>
  <div class="home">
    <!-- <h1>
      <img src="../assets/img/icon.png" width="50px" />
      nodenoggin
    </h1>-->
    <!-- tips -->
    <!--  @ is short for v-on: -->
    <!-- : is short for v-bind -->
    <div class="offline" v-if="clientset && offline">
      <Editor v-if="editing" @closeEdit="closeEdit()" @deleteFlag="deleteFlag()" />
      <ToolBar v-else-if="clientset" @editMode="editMode()" @togView="togView()" />
      <ShortCuts v-if="clientset" />
      <YourData @editMode="editMode()" @closeEdit="closeEdit()" />
      <DeBug @offlineTriggered="offlineTriggered()" />
    </div>

    <div class="online" v-else>
      <Editor v-if="editing" @closeEdit="closeEdit()" @deleteFlag="deleteFlag()" />
      <ToolBar v-else-if="clientset" @editMode="editMode()" @togView="togView()" />
      <ReaderView v-if="clientset" />
      <ShortCuts v-if="clientset" />
      <AllData
        v-if="clientset && spaceview"
        @editMode="editMode()"
        @closeEdit="closeEdit()"
        @togView="togView()"
      />
      <AllSpace
        v-else-if="clientset"
        @closeEdit="closeEdit()"
        @editMode="editMode()"
        @togView="togView()"
      />
      <OnBoard v-else @clientAdded="clientAdded()" />
      <!-- <AdminPanel /> -->

      <DeBug @offlineTriggered="offlineTriggered()" @onlineTriggered="onlineTriggered()" />
    </div>
  </div>
</template>

<script>
// tips
// @ is an alias to /src
import { mapState } from 'vuex'

import OnBoard from '@/components/OnBoard.vue'
//import AdminPanel from '@/components/AdminPanel.vue'
import ShortCuts from '@/components/ShortCuts.vue'
import AllSpace from '@/components/AllSpace.vue'
import YourData from '@/components/YourData.vue'
import AllData from '@/components/AllData.vue'
import ToolBar from '@/components/ToolBar.vue'
import Editor from '@/components/Editor.vue'
import ReaderView from '@/components/ReaderView.vue'
import DeBug from '@/components/DeBug.vue'

export default {
  name: 'home',
  data: function() {
    return {
      editing: false,
      spaceview: true,
      clientset: false,
      offline: false
    }
  },

  components: {
    OnBoard,
    // AdminPanel,
    ToolBar,
    ShortCuts,
    AllSpace,
    AllData,
    YourData,
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
    // },
    // spaceon(newValue) {
    //   if (newValue == true) {
    //     this.spaceview = !this.spaceview
    //   }
    // }
  },

  methods: {
    clientAdded() {
      this.clientset = !this.clientset
    },
    editMode() {
      this.editing = !this.editing
    },

    deleteFlag() {
      this.editing = !this.editing
    },

    togView() {
      if (this.spaceview == false) {
        this.spaceview = true
      } else {
        this.spaceview = false
      }
    },

    closeEdit() {
      this.editing = false
    },

    offlineTriggered() {
      this.offline = true
    },
    onlineTriggered() {
      console.log('back!')
      this.offline = false
    }
  }
}
</script>
