<template>
  <div>
    <h2>
      Welcome! You are connected to
      <em>couchdocs instance</em>
    </h2>
    <p>
      nodenoggin is a work in progress collaborative research and design
      thinking tool, read more details and links in the about section.
    </p>
    <p>
      You don't need a log in you do however need to name this device (once) and
      press
      <em>Lets Go!</em>
    </p>

    <h3>Start collaborating</h3>
    <p>
      Please name this device and provide a name that all contributions will be
      attributed to.
    </p>
    <form>
      Device name:
      <input type="text" v-model="clientid" placeholder="myDeviceName" />
      <br />Your name:
      <input
        type="text"
        v-model="name"
        name="name"
        placeholder="Fiona Applegate"
      />
      <br />--> <button @click="setClient()">Lets Go!!</button> <--
    </form>

    <h3>Say what?</h3>
    <p>
      Once you name this device and press
      <em>Lets Go!</em>, you will be able to add a contribution by pressing
      <em>Create</em>.
    </p>
    <p>
      You will also see a list of other contributions added by other people.
    </p>
    <p>
      This contributions will update in realtime when multiple people connnect
      and even sync offline contributions once your device is back online.
    </p>
    <h3>Warning!!</h3>
    <p>This is a very much work in progress, no data is considered safe.</p>
    <p>There is little to no styling applied to the data.</p>
    <h4>LAST UPDATE : 8th May 2019.</h4>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      clientid: '',
      name: ''
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
  }
}
</script>

<style lang="css" scoped></style>
