<template>
  <div class="notlogged">
    <h2>
      instance name :
      <b>{{ instance }}</b>
    </h2>
    <h2>
      device name :
      <b>{{ clientid }}</b>
    </h2>
    <p>
      nodenoggin is a
      <span>work in progress</span> collaborative co-creation research and
      design thinking tool, read more details and links in the
      <a
        href="/#/about"
      >about</a> section.
    </p>

    <form>
      <h2>1</h2>
      <h3>instance</h3>
      <p>create or join an instance. an instance is a sharable digital space that can be shared privately between a group of individuals. all content / data you contribute is stored locally on your device and then shared privately to others on the same instance. you can remove your contributions at any time, they belong to you.</p>
      <input type="text" v-model="instance" placeholder="instance name" />
      <button @click="createInstance()">+</button>
    </form>

    <form>
      <h2>2</h2>
      <h3>name</h3>
      <p>give yourself a unique name, this ties this device to your own content / data. this name is anonymous and stored privately.</p>
      <input type="text" v-model="clientid" placeholder="device name" />
      <button @click="setClient()">+</button>
    </form>

    <form>
      <h2>3</h2>
      <h3>join</h3>
      <button @click="setClient()">+</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function() {
    return {
      clientid: '',
      instance: ''
    }
  },

  computed: mapState({
    instance: state => state.instance,
    activeinstance: state => state.instance
  }),

  mounted() {
    if (localStorage.myNNClient) {
      this.clientid = localStorage.myNNClient
      this.setClient()
    }
  },

  methods: {
    setClient() {
      this.$store.dispatch('setClient', this.clientid),
        localStorage.setItem('myNNClient', this.clientid),
        this.$emit('clientAdded')
    },
    createInstance() {
      this.$store.dispatch('createInstance', this.instance)
    },
    removeIndex() {
      this.$store.dispatch('removeInstance', this.instance)
    }
  }
}
</script>

<style lang="css" scoped>
@import url('https://rsms.me/inter/inter.css');
html {
  font-family: 'Inter', sans-serif;
}
@supports (font-variation-settings: normal) {
  html {
    font-family: 'Inter var', sans-serif;
  }
}

h1,
h2,
h3,
p {
  font-family: 'Inter var', sans-serif;
}
</style>
