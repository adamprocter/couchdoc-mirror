<template>
  <div class="adminpanel">
    <hr />
    <h2>Admin Panel</h2>
    <p>If you type in an instance that is already created you will join/rejoin said instance, otherwise a brand new instance will be created for you.</p>
    <p>
      Connected to instance :
      <b>{{activeinstance}}</b>
    </p>
    <form>
      Instance name:
      <input type="text" v-model="instance" placeholder="myNewInstance" />
      <br />
      <button @click="createInstance()">Create/ Join Instance</button>

      <button class="danger" @click="removeIndex()">Delete Local Instance</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: function() {
    return {
      instance: ''
    }
  },
  computed: mapState({
    activeinstance: state => state.instance
  }),
  methods: {
    createInstance() {
      this.$store.dispatch('createInstance', this.instance)
    },
    removeIndex() {
      console.log('remove1')
      this.$store.dispatch('removeInstance', this.instance)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
