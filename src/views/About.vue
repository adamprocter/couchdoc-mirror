<template>
  <div class="about">
    <h1>About</h1>
    <p>
      Currently digital tools do a really poor job of extending the design
      studio design thinking processes.
    </p>
    <p>
      This tool is designed to support a new type of co-creation, a spatial and
      messy area to work together connecting ideas and concepts.
    </p>
    <p>
      Made by Adam Procter
      <em>(and lots of helpers to be listed asap)</em>
    </p>

    <h3>version 0.0.37d</h3>
    <ul>
      <li>
        Co-create and contribute ideas, with text, links and attachments with
        other people in realtime.
      </li>
      <li>
        Contributions displayed as a list and shared spatial view across all
        devices.
      </li>
    </ul>
    <h3>known issues</h3>
    <ul>
      <li>Data is not yet encrypted.</li>
      <li>Delete does not do anything visually.</li>
      <li>Export is not turned on yet.</li>
      <li>Attachment viewing is broken.</li>
      <li>
        Mobile iOS devices seem to have a bug when you first try to create or
        join an instance, on second attempt it will work allowing device name.
      </li>
      <li>
        When moving nodes on touch devices to confirm new location you must tap
        with a second finger.
      </li>
      <li>
        Please consider all data as not backed up, data structures and data will
        ocasssionaly be deleted or changed remotely which may effect and break
        your local data.
      </li>
    </ul>
    <h2>Design-led ethical Edutech</h2>
    <ul>
      <li>
        &nbsp;
        <a href="https://discourse.adamprocter.co.uk">discuss</a>(and feedback)
      </li>
      <li>
        &nbsp;
        <a
          href="https://discursive.adamprocter.co.uk/categories/phd/"
        >discursive (phd catergory link)</a>
        (blog)
      </li>
      <li>
        &nbsp;
        <a href="https://researchnot.es">researchnot.es</a> (blog)
      </li>
      <li>
        &nbsp;
        <a href="https://manifold.soton.ac.uk">manifold</a> (writing)
      </li>
      <li>
        &nbsp;
        <a href="https://fragmentum.adamprocter.co.uk">fragmentum</a>
        (microcast)
      </li>
      <li>
        &nbsp;
        <a href="https://gitlab.adamprocter.co.uk/adamprocter/couchdocs">gitlab</a>
        (code)
      </li>
      <li>
        &nbsp;
        <a href="https://github.com/adamprocter/couchdoc-mirror/issues">issues</a>
        (raise and review)
      </li>
    </ul>
    <DeBug />
  </div>
</template>

<script>
import DeBug from '@/components/DeBug.vue'

export default {
  components: {
    DeBug
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

h1,
h2,
h3,
p {
  font-family: 'Inter var', sans-serif;
  color: black;
  margin: 0px;
}

h1,
h2,
h3 {
  margin-top: 1em;
  margin-bottom: 0.5em;
}

h3 {
  color: #cab6ff;
}

p {
  font-family: chaparral-pro, serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}
</style>
