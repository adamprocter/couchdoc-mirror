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
      {{ clientid }}
      <button @click="setClient()">Lets Go!!</button>
    </form>
  </div>
</template>

<script>
// check for JWT if so use this token value to trigger setClient()
export default {
  data: function() {
    return {
      clientid: '',
      name: ''
    }
  },
  methods: {
    setClient(e) {
      this.$store.dispatch('setClient', this.clientid),
        this.$emit('clientAdded')
    }
  }
}
</script>

<style lang="css" scoped></style>
