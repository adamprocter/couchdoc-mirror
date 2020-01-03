<template>
  <div class="notlogged">
    <p>
      nodenoggin is a
      <span>work in progress</span> collaborative co-creation research and
      design thinking tool, read more details and links in the
      <a
        href="/#/about"
      >about</a> section.
    </p>

    <ul>
      <li>
        instance name :
        <b>{{ localinstance }}</b>
      </li>
      <li>
        device name :
        <b>{{ clientid }}</b>
      </li>
    </ul>

    <form>
      <h2>1</h2>
      <h3>instance</h3>
      <p>create or join an instance. an instance is a sharable digital space that can be shared privately between a group of individuals. all content / data you contribute is stored locally on your device and then shared privately to others on the same instance. you can remove your contributions at any time, they belong to you.</p>
      <input type="text" v-model="localinstance" placeholder="instance name" />
      <button @click="createInstance()">+</button>
    </form>

    <form v-show="partb">
      <h2>2</h2>
      <h3>name</h3>
      <p>give yourself a unique name, this ties this device to your own content / data. this name is anonymous and stored privately.</p>
      <input type="text" v-model="clientid" placeholder="device name" />
      <button @click="setClient()">+</button>
    </form>

    <form v-show="partc">
      <h2>3</h2>
      <h3>start</h3>
      <button @click="letsGo()">+</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function() {
    return {
      clientid: '',
      localinstance: '',
      partb: false,
      partc: false
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
        (this.partc = true)
    },
    letsGo() {
      this.$emit('clientAdded')
    },
    createInstance() {
      this.$store.dispatch('createInstance', this.localinstance),
        (this.partb = true)
    },
    removeIndex() {
      this.$store.dispatch('removeInstance', this.localinstance)
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
ul {
  font-family: 'Pica 10 Pitch W01';
  font-size: 16px;
  line-height: 20px;
}

li:before {
  content: '';
}

b {
  background-color: yellow;
  padding-right: 2em;
}

h1,
h2,
h3,
p {
  font-family: 'Inter var', sans-serif;
  color: black;
  margin: 0px;
}

p {
  font-family: chaparral-pro, serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin-top: 2em;
}

h2 {
  float: right;
  font-size: 3em;
}

h3 {
  font-size: 3em;
  margin-top: 0.5em;
}

form {
  padding: 1em;
  border-style: solid;
  border-width: 0.5em;
  border-color: #cab6ff;
  margin-top: 1em;
}

input {
  border-style: solid;
  border-width: 1px;
  border-color: #cab6ff;
  padding: 0.5em;
}

button {
  font-size: 2em;
  color: black;
  border-style: solid;
  border-width: 5px;
  border-color: black;
  border-radius: 5em;
  background-color: white;
  box-shadow: 0px 0px 0px #000000;
  padding: 10px 18px;
}

button:active {
  background-color: #cab6ff;
}

@media only screen and (min-width: 640px) {
  /* Style adjustments for viewports that meet the condition */

  .notlogged {
    grid-column: 2 / 5;
    grid-row: 1;
  }
}
</style>
