<template>
  <div class="editor">
    <form id="editForm" class="myScroll">
      <h2>Edit</h2>
      <div v-if="activeNote.attachment_name == undefined">
        <label>Choose Type</label>
        <select v-model="activeNote.content_type" id="myList">
          <option value="sheet">note</option>
          <option value="link">link</option>
          <option value="attachment">attachment</option>
        </select>
      </div>
      <br />
      <p class="md">markdown supported</p>
      <textarea
        @input="editNote"
        v-model="activeNote.text"
        class="form-control"
        ref="notetext"
      ></textarea>
      <p>{{ activeNote.attachment_name }}</p>
      <!-- <p>{{activeAttachment[0].url}}</p> -->
      <!-- <div v-if="activeNote.attachment_name != undefined">
        <div v-if="activeNote.attachment_name.endsWith('.jpeg')">
          <img :src="activeAttachment[0].url" alt width="40%" height border="0" />
        </div>

        <div v-else-if="activeNote.attachment_name.endsWith('.jpg')">
          <img :src="activeAttachment[0].url" alt width="40%" height border="0" />
        </div>
        <div v-else-if="activeNote.attachment_name.endsWith('.png')">
          <img :src="activeAttachment[0].url" alt width="40%" height border="0" />
        </div>

        <div v-else>
          <img src="../assets/img/icon-mac.jpg" alt width="40%" height border="0" />
        </div>
      </div>-->

      <input :value="activeNote.id" name="id" readonly hidden />
      <input
        :value="activeNote.attachment_name"
        name="attachmentname"
        readonly
        hidden
      />

      <p class="words">
        Word count:
        <span id="wordCount">0</span>
      </p>
      <h3>Reactions</h3>
      <div v-for="(emojis, index) in emojis" :key="index">
        <p class="allemoji" v-if="activeNote.id == emojis.docid">
          {{ emojis.emojitext }}
        </p>
      </div>
      <div>
        <button @click="closeEdit()">Finish</button>
        <button class="danger" @click="deleteFlag()">Delete</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//var myTimer
var delay = 100
var input
export default {
  mounted() {
    setTimeout(this.setFocus, delay)
    input = this.$refs.notetext

    this.$refs.notetext.addEventListener('keyup', function() {
      //keeping the console clean to make only the latest data visible
      // console.clear()

      // word count using \w metacharacter - replacing this with .* to match anything between word boundaries since it was not taking 'a' as a word.
      // this is a masterstroke - to count words with any number of hyphens as one word
      // [-?(\w+)?]+ looks for hyphen and a word (we make both optional with ?). + at the end makes it a repeated pattern
      // \b is word boundary metacharacter
      var words = input.value.match(/\b[-?(\w+)?]+\b/gi)
      // console.log(words);
      if (words) {
        wordCount.innerHTML = words.length
      } else {
        wordCount.innerHTML = 0
      }
    })
  },
  methods: {
    setFocus() {
      this.$refs.notetext.focus()
    },
    // not sure this is best practice to dispatch from here
    editNote(e, t, aname) {
      t = this.activeNote.content_type
      aname = this.activeNote.attachment_name
      this.$store.dispatch('editNote', { e, t, aname })
      this.$store.dispatch('noteId', this.activeNote.id)
    },
    deleteFlag() {
      // t = this.activeNote.content_type
      // aname = this.activeNote.attachment_name
      this.$emit('closeEdit')
      this.$store.dispatch('deleteFlag')
      this.$store.dispatch('noteId', this.activeNote.id)
    },
    closeEdit() {
      this.$emit('closeEdit')
      this.$store.dispatch('editOff')
      this.$store.dispatch('shortcutsState', false)
    }
  },
  computed: mapState({
    //editon: state => state.editon,
    activeNoteR: state => state.activeNoteR,
    activeNote: state => state.activeNote,
    activeAttachment: state => state.activeAttachment,
    emojis: state => state.emojis
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  font-family: 'Pica 10 Pitch W01';
  font-size: 16px;
  line-height: 20px;
}

li:before {
  content: '';
}

.md {
  margin-top: -1em;
  font-size: 12px;
  color: grey;
}

p.words {
  margin-top: 0.5em;
}

b {
  background-color: yellow;
  padding-right: 2em;
}

p {
  margin-top: 2em;
}

h3 {
  margin-top: 1em;
}
p.allemoji {
  margin-top: 0em;
}
</style>
