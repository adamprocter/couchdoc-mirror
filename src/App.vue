<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|
      <router-link to="/about">About</router-link>&nbsp;|
      <a href="http://discourse.adamprocter.co.uk">Feedback</a>&nbsp;|
      <a href="https://www.patreon.com/procterbot">Support</a>
      <!-- <ul v-if="ready"> -->
      <ul>
        <li>
          microcosm :
          <b>{{ instance }}</b>
        </li>
        <li>
          object name :
          <b>{{ clientid }}</b>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      instance: '',
      clientid: '',
      ready: false
    }
  },

  // FIXME: not mounted just on load
  // Maybe this is wrong place for this anyway perhaps another component
  mounted() {
    this.clientid = localStorage.myNNClient
    this.instance = localStorage.mylastInstance
  }
}
</script>

<style src="./assets/css/normalize.min.css"></style>

<style src="./assets/css/main.css"></style>

<style scoped>
</style>
