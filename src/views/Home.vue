<template>
  <div class="home">
    <ToolBar />
    <Viewer />
  </div>
</template>

<script>
// @ is an alias to /src
import Viewer from '@/components/Viewer.vue'
import ToolBar from '@/components/ToolBar'

export default {
  name: 'home',
  components: {
    ToolBar,
    Viewer
  }
}
</script>
