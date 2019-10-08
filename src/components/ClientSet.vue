<template>
  <div class="notlogged">
    <h2>
      Welcome! You are connected to the instance
      <em>{{ instance }}</em>
    </h2>
    <!-- <button>Create new instance</button> -->
    <p>
      nodenoggin is a
      <span>work in progress</span> collaborative co-creation research and design thinking
      tool, read more details and links in the
      <a
        href="/#/about"
      >about</a> section.
    </p>
    <p>
      You don't need a log in but you do however need to name your device (only
      once) and then press
      <em>Lets Go!</em>
    </p>

    <h3>Start co-creating</h3>
    <p>Please name your device.</p>
    <form>
      Device name:
      <input type="text" v-model="clientid" placeholder="myDeviceName" />
      <!-- <br />Your name: -->
      <!-- <input
        type="text"
        v-model="name"
        name="name"
        placeholder="Fiona Applegate"
      />-->
      <br />-->
      <button @click="setClient()">Lets Go!!</button> <--
    </form>

    <h3>Say what?</h3>
    <p>
      Once you name your device and press
      <em>Lets Go!</em>, you will be able to add a contribution by pressing
      <em>Create</em>.
    </p>
    <p>You will also see contributions added by other people.</p>
    <p>
      These contributions will update in realtime from the people connnected and
      contributions can be added offline and will sync once your back online.
    </p>
    <hr />
    <h2>
      <span>Warning!!</span>
    </h2>
    <ul>
      <li>This is a very much a work in progress</li>
      <li>Contribution shouldn't be considered safe, the server and data are reset regulary.</li>
      <li>&amp; there will be glitches.</li>
      <li>
        Please play and
        <a href="http://discourse.adamprocter.co.uk">feedback</a>.
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function() {
    return {
      clientid: ''
      //,name: ''
    }
  },

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
    }
  },
  computed: mapState({
    instance: state => state.instance
  })
}
</script>

<style lang="css" scoped></style>
