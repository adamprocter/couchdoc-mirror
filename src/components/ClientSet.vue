<template>
  <div>
    <p>Hello, we dont recognise this device.</p>
    <p>
      Please name this device
      <em>(case and space sensitive)</em> and create a name all contributions
      should be attributed to <em>(this will be searchable)</em>.
    </p>
    <form>
      Device name:
      <input type="text" v-model="clientid" placeholder="myMacOS" />
      A name:
      <input type="text" v-model="name" name="name" placeholder="Dave Smith" />
      <button @click="setClient()">Lets Go!!</button>
    </form>
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
    },
    setClientReturn() {
      //console.log('ss')
      // this.$store.dispatch('setClient', e)
    }
  }
}
</script>

<style lang="css" scoped></style>
