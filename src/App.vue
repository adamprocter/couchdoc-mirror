<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <a href="http://discourse.adamprocter.co.uk">Feedback</a>
      <p>
        Connected to instance :
        <b>{{ instance }}</b>
      </p>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    instance: state => state.instance
  })
}
</script>

<style src="./assets/css/normalize.min.css"></style>

<style src="./assets/css/main.css"></style>
