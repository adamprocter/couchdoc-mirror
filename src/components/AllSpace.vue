<template>
  <div class="spaceview" name="anchorName">
    <h2>Spatial</h2>

    <p id="modeon" class="connectionoff">
      <b>connection create mode is on</b>
    </p>
    <p id="modedelon" class="connectionoff">
      <b>connection delete mode is on</b>
    </p>
    <button @click="connButton()">Connection Mode</button>
    <button @click="removeButton()">Delete Connections</button>
    <button @click="zoominButton()">Zoom in</button>
    <button @click="zoomoutButton()">Zoom Out</button>
    <!-- tips-->
    <!-- : is short for v-bind -->
    <!-- FIXME: Fixed width of SVG Object here -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="space"
      ref="sheets"
      :viewBox="`${viewboxo1} ${viewboxo2} ${viewboxy} ${viewboxx}`"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="100%" height="100%" fill="#f1f1f1" />

      <g v-for="(value, index) in allnotes" v-bind:key="index">
        <g v-for="(note, index) in value.doc.notes" v-bind:key="index">
          <!-- <text
            x="20"
            y="35"
            v-for="(note, index) in value.doc.notes"
            v-bind:key="index"
          >{{note.id}}</text>
          
          <text x="20" y="35">{{note.doc}}</text>-->
          <g v-for="(position, index) in positions" :key="index">
            <g
              class="draggable"
              v-if="note.id == position.id"
              :transform="`translate(${position.xpos}, ${position.ypos})`"
            >
              <polygon
                v-if="note.content_type == 'link' && note.deleted == false"
                points="9.500000000000002,16.454482671904334 -19,2.326828918379971e-15 9.499999999999986,-16.45448267190434"
                fill="#f1f1f1"
                stroke="#000"
                stroke-width="3px"
                :class="[
                  note.content_type,
                  note.isActive ? 'highlighted' : '',
                  note.owner
                ]"
                :id="note.id"
              />
              <!-- 
                <rect class="b" width="110" height="110" />
              <rect class="c" x="4" y="4" width="102" height="102" />-->

              <polygon
                v-if="note.content_type == 'sheet' && note.deleted == false"
                points="13.435028842544403,13.435028842544401 -13.435028842544401,13.435028842544403 -13.435028842544407,-13.435028842544401 13.435028842544401,-13.435028842544407"
                fill="#f1f1f1"
                stroke="#000"
                stroke-width="3px"
                :class="[
                  note.content_type,
                  note.isActive ? 'highlighted' : '',
                  note.owner
                ]"
                :id="note.id"
              />

              <polygon
                v-if="
                  note.content_type == 'attachment' && note.deleted == false
                "
                points="14.782072520180588,6.1229349178414365 6.122934917841437,14.782072520180588 -6.122934917841436,14.782072520180588 -14.782072520180588,6.122934917841437 -14.782072520180588,-6.122934917841435 -6.122934917841445,-14.782072520180584 6.12293491784144,-14.782072520180586 14.782072520180584,-6.122934917841446"
                fill="#f1f1f1"
                stroke="#000"
                stroke-width="3px"
                :class="[
                  note.content_type,
                  note.isActive ? 'highlighted' : '',
                  note.owner
                ]"
                :id="note.id"
              />

              <g v-for="(connection, index) in connections" :key="index">
                <g
                  v-if="note.id == connection.startid"
                  id="lines"
                  :class="connection.connected"
                  :transform="
                    `translate(${-connection.startx}, ${-connection.starty})`
                  "
                >
                  <!-- <g v-for="connection in connection.connection"> -->

                  <line
                    class="lines"
                    :id="connection.connectid"
                    :x1="connection.startx"
                    :y1="connection.starty"
                    :x2="connection.endx"
                    :y2="connection.endy"
                  />
                </g>
              </g>

              <text v-if="note.deleted == false" class="inlinetext" dx="20px">
                {{ note.text | truncate(20) }}
              </text>
            </g>
          </g>
        </g>
      </g>

      <!-- REMOVE: cannot render attachments this way-->
      <!-- <g
        v-for="(myattachment, index) in myattachments"
        :key="'myattachment'+index"
        :transform="`translate(0, ${index * 75})`"
        class="draggable"
      >
     
      <circle cx="16" cy="16" r="16" fill="#989898" :id="myattachment.name" />
      </g> 

    <clipPath id="textclip">
        <rect x="0" y="0" width="50" height="50" />
      </clipPath>
      -->
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { shortcuts } from './mixins/shortcuts.js'
var activenoteid
var activeclientid
var connectid
var firsttap = null
var secondtap

var xpos = 0
var ypos = 0

var startx = 0
var starty = 0
var endx = 0
var endy = 0
var connected = 'false'

var myTimer
var delay = 500

export default {
  name: 'AllSpace',
  mixins: [shortcuts],
  data() {
    return {
      viewboxo1: 0,
      viewboxo2: 0,
      viewboxx: 600,
      viewboxy: 1000,
      connkey: false,
      removekey: false
    }
  },

  computed: mapState({
    shortcutsstate: state => state.shortcutsstate,
    allnotes: state => state.allnotes,
    connections: state => state.connections,
    positions: state => state.positions
  }),

  filters: {
    truncate(value, limit) {
      if (value.length > limit) {
        value = value.substring(0, limit - 3) + '...'
      }

      return value
    }
  },

  watch: {
    //empty
  },

  mounted() {
    this.makeDraggable()
    this.makeConnectable()
    this.trimText()
  },
  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyPress)
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeyPress)
    }
  },
  methods: {
    connButton() {
      this.$emit('closeEdit')
      this.$store.dispatch('shortcutsState', false)

      if (this.connkey == true) {
        this.connkey = false
      } else {
        this.connkey = true
      }
      this.removekey = false
      this.connShow()
      this.removeShow()
    },

    removeButton() {
      this.$emit('closeEdit')
      this.$store.dispatch('shortcutsState', false)
      if (this.removekey == true) {
        this.removekey = false
      } else {
        this.removekey = true
      }
      this.connkey = false
      this.connShow()
      this.removeShow()
    },

    connShow() {
      //console.log(this.connkey)
      if (this.connkey == true) {
        document.getElementById('modeon').classList.add('connectionon')
      } else {
        document.getElementById('modeon').classList.add('connectionoff')
        document.getElementById('modeon').classList.remove('connectionon')
      }
    },

    removeShow() {
      if (this.removekey == true) {
        document.getElementById('modedelon').classList.add('connectionon')
      } else {
        document.getElementById('modedelon').classList.add('connectionoff')
        document.getElementById('modedelon').classList.remove('connectionon')
      }
    },

    trimText() {
      //console.log(this.allnotes)
      // this will hide text in spatial view
    },

    addDoc() {
      this.$store.dispatch('addDoc')
      this.$emit('editMode')
    },

    openSelected(e) {
      //console.log(e)
      this.$store.dispatch('clientId', e)

      // this.$store.dispatch('noteId', e)
      // this gets the note with said ID now not just the text
      // this.$store.dispatch('getNoteText', e)
      //this.$emit('editMode')
    },
    readerSelected(e) {
      this.$store.dispatch('noteId', e)
      this.$store.dispatch('getReaderText', e)
    },

    startConnect(connectid, e, f, startx, starty, endx, endy, connected) {
      this.$store.dispatch('startConnect', {
        connectid,
        e,
        f,
        startx,
        starty,
        endx,
        endy,
        connected
      })
    },
    updatePos(activenoteid, xpos, ypos, isActive) {
      this.$store.dispatch('movePos', { activenoteid, xpos, ypos, isActive })
    },
    removeConnect(connectid, connected) {
      this.$store.dispatch('removeConnect', {
        connectid,
        connected
      })
    },
    updateConnect(connectid, activenoteid, xpos, ypos, connected) {
      this.$store.dispatch('updateConnect', {
        connectid,
        activenoteid,
        xpos,
        ypos,
        connected
      })
    },
    updateActive(activenoteid, isActive) {
      this.$store.dispatch('updateActive', { activenoteid, isActive })
    },

    // FIXME: Can I move these methods to a plug in instead?
    makeDraggable() {
      // console.log(this.$refs.sheets)
      var svg = this.$refs.sheets
      var ref = this

      svg.addEventListener('mousedown', startDrag)
      svg.addEventListener('mousemove', drag)
      svg.addEventListener('mouseup', endDrag)
      svg.addEventListener('mouseleave', endDrag)
      svg.addEventListener('touchstart', startDrag)
      svg.addEventListener('touchmove', drag)
      // touch end is not being picked up on Firefox iOS
      svg.addEventListener('touchend', endDrag)
      svg.addEventListener('touchleave', endDrag)
      // touch cancel works
      svg.addEventListener('touchcancel', endDrag)

      var selectedElement, offset, transform

      function dontClick() {
        this.connkey = false
        // removekey = false
        ref.connKey()
      }

      // FIXME: Can I make these ES6 arrow functions??
      function getMousePosition(evt) {
        var CTM = svg.getScreenCTM()
        if (evt.touches) {
          evt = evt.touches[0]
        }
        return {
          x: (evt.clientX - CTM.e) / CTM.a,
          y: (evt.clientY - CTM.f) / CTM.d
        }
      }

      function startDrag(evt) {
        if (evt.target.parentNode.classList.contains('draggable')) {
          myTimer = setTimeout(dontClick, delay)
          var isActive = true
          selectedElement = evt.target.parentNode
          offset = getMousePosition(evt)
          // identify which object was clicked
          activenoteid = selectedElement.firstElementChild.id
          // make sure the first transform on the element is a translate transform
          var transforms = selectedElement.transform.baseVal

          if (
            transforms.length === 0 ||
            transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
          ) {
            // create an transform that translates by (0, 0)
            var translate = svg.createSVGTransform()
            translate.setTranslate(0, 0)
            selectedElement.transform.baseVal.insertItemBefore(translate, 0)
          }

          // get initial translation
          transform = transforms.getItem(0)
          offset.x -= transform.matrix.e
          offset.y -= transform.matrix.f
        }
        ref.updateActive(activenoteid, isActive)
      }

      function drag(evt) {
        // console.log(clickvalid)
        if (selectedElement) {
          evt.preventDefault()
          var coord = getMousePosition(evt)
          transform.setTranslate(coord.x - offset.x, coord.y - offset.y)
        }
      }

      function endDrag(evt) {
        if (selectedElement) {
          clearTimeout(myTimer)
          var isActive = false
          evt.preventDefault()
          var coord = getMousePosition(evt)
          transform.setTranslate(coord.x - offset.x, coord.y - offset.y)
          // send positions back to DB
          connectid = selectedElement.firstElementChild.id
          activenoteid = selectedElement.firstElementChild.id
          xpos = coord.x - offset.x
          ypos = coord.y - offset.y
          ref.updatePos(activenoteid, xpos, ypos, isActive)
          //selectedElement.firstElementChild.classList.remove('highlighted')
          // update any endx and ypos for connections connected to this id
          ref.updateConnect(connectid, activenoteid, xpos, ypos, connected)
        }
        // }

        selectedElement = false
      }
    },

    makeConnectable() {
      // FIXME: also make as a plug in
      // console.log(this.$refs.sheets)
      var svg = this.$refs.sheets
      var ref = this
      svg.addEventListener('click', singleClick)
      svg.addEventListener('touchstart', singleClick)
      svg.addEventListener('dblclick', doubleClick)

      var selectedElement
      var selectedElementParent

      function singleClick(evt) {
        ref.$emit('closeEdit')
        ref.$store.dispatch('editOff')
        ref.$store.dispatch('shortcutsState', false)

        // var isActive = true
        // FIXME: Maybe not Connkey maybe another key???
        if (ref.removekey == true) {
          selectedElementParent = evt.target.parentNode.parentNode.parentNode
          activenoteid = selectedElementParent.firstElementChild.id
          selectedElement = evt.target
          connectid = selectedElement.id
          if (evt.target.parentNode.classList.contains('true')) {
            connected = 'false'
            ref.removeConnect(connectid, connected)
            ref.removekey = false
            firsttap = null
            ref.removeKey()
          } else {
            // do nothing
          }
        }
        if (ref.connkey == true && firsttap == null) {
          if (evt.target.parentNode.classList.contains('draggable')) {
            // console.log('first connection')
            selectedElement = evt.target.parentNode
            firsttap = selectedElement.firstElementChild.id

            startx = xpos
            starty = ypos
          }
        } else if (ref.connkey == true && firsttap != null) {
          if (evt.target.parentNode.classList.contains('draggable')) {
            selectedElement = evt.target.parentNode
            secondtap = selectedElement.firstElementChild.id
            // FIXME: perhaps need start positions here to pass?
            connectid = 1234
            endx = xpos
            endy = ypos
            connected = 'true'
            // console.log(startx, starty, endx, endy)
            ref.startConnect(
              connectid,
              firsttap,
              secondtap,
              startx,
              starty,
              endx,
              endy,
              connected
            )
          }
          ref.connkey = false
          //console.log(ref.connkey)
          firsttap = null
          ref.connKey()
        }
      }

      function doubleClick(evt) {
        // console.log('inside doubleclick ' + firsttap)
        scroll(0, 390)
        ref.$store.dispatch('shortcutsState', true)
        ref.$emit('closeEdit')
        if (evt.target.parentNode.classList.contains('draggable')) {
          selectedElement = evt.target.parentNode

          ref.connkey = false
          firsttap = null
          ref.connKey()
          // identify which object was clicked
          // console.log(selectedElement.firstElementChild.id)
          activenoteid = selectedElement.firstElementChild.id
          activeclientid = selectedElement.firstElementChild.classList[2]
          ref.openSelected(activeclientid)
          ref.readerSelected(activenoteid)
        } else {
          ref.addDoc()
        }
      }
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
p,
.inlinetext {
  font-family: 'Inter var', sans-serif;
  color: black;
  margin: 0px;
}
.inlinetext {
  font-size: 0.8em;
  fill: black;
}

.lines {
  stroke: #cab6ff;
  stroke-width: 3px;
}

p {
  margin-top: 2em;
}

/* .a {
  fill: #f1f1f1;
  stroke: #000;
  stroke-width: 3px;
} */
/* .b {
  stroke: none;
} */
</style>
