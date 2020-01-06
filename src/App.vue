<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <a href="http://discourse.adamprocter.co.uk">Feedback</a>
      <!-- <p>
        Connected to instance :
        <b>{{ instance }}</b>
      </p>
      <p>
        This device is :
        <b>{{ clientid }}</b>
      </p>-->
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    instance: state => state.instance
  }),

  data: function() {
    return {
      urlinstance: '',
      clientid: '',
      device: ''
    }
  },

  // You can now use a URL parameter to access an instance directly
  // this will use your current device name on said instance if you have one already
  mounted: function() {
    var parameters = this.$route.query
    var urlparam = this.$route.query.instance
    var urlparam2 = this.$route.query.device

    if (urlparam2 != undefined) {
      this.device = urlparam2
      localStorage.myNNClient = this.device
    }

    if (urlparam != undefined) {
      this.urlinstance = urlparam
      this.$store.dispatch('createInstance', this.urlinstance)
    }
    // console.log(localStorage.myNNClient)
    // FIXME: Doest update initially should not be mounted but next step?
    if (localStorage.myNNClient) {
      this.clientid = localStorage.myNNClient
    }
  }
}
</script>

<style src="./assets/css/normalize.min.css"></style>

<style src="./assets/css/main.css"></style>
