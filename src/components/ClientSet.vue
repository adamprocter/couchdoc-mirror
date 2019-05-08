<template>
  <div>
    <h1>nodenoggin</h1>
    <p>Hello, we dont recognise this device.</p>
    <p>
      Please name this device
      <em>(case and space sensitive)</em> and create a name all contributions
      should be attributed to <em>(this will be searchable)</em>.
    </p>
    <form>
      Device name:
      <input type="text" name="clientid" value="myMacOS" />
      A name:
      <input type="text" name="name" value="Dave Smith" />

      <input type="submit" value="Lets Go!" />
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped></style>
