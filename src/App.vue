<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|
      <router-link to="/about">About</router-link>&nbsp;|
      <a href="http://discourse.adamprocter.co.uk">Feedback</a>
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
@import url('https://rsms.me/inter/inter.css');
html {
  font-family: 'Inter', sans-serif;
}
@supports (font-variation-settings: normal) {
  html {
    font-family: 'Inter var', sans-serif;
  }
}

a {
  font-family: 'Inter var', sans-serif;
  color: black;
  margin: 0px;
}

li:before {
  content: '';
}

ul {
  font-family: 'Pica 10 Pitch W01';
  font-size: 16px;
  line-height: 20px;
}

li:before {
  content: '';
}
</style>
