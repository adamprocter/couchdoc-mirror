<template>
  <div class="spaceview">
    <h2>Your spatial view</h2>
    <!-- tips-->
    <!-- : is short for v-bind -->
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="800" id="space" ref="sheets">
      <g
        v-for="(note, index) in notes"
        :key="'note'+index"
        :transform="`translate(${note.xpos}, ${note.ypos})`"
        class="draggable"
      >
        <polygon
          v-if="note.content_type == 'link'"
          points="14,0 0,32 32,32"
          fill="#989898"
          :class="note.content_type"
          :id="note.id"
        />
        <rect
          v-if="note.content_type == 'sheet'"
          width="25"
          height="25"
          fill="#989898"
          :class="note.content_type"
          :id="note.id"
        />

        <!-- if a note has connection draw a line -->
        <!-- FIXME: if there is true on connection -->
        <g v-for="(connection, index) in connections" :key="index">
          <line
            v-for="connection in connection.connection"
            x1="0"
            y1="0"
            :x2="connection.endx"
            :y2="connection.endy"
            style="stroke:rgb(255,0,0);stroke-width:2"
          />
        </g>
        <!--REF: Keep for now
          <text y="15">{{ note.text }}</text>
        <text y="30">{{ note.content_type }}</text>-->
      </g>

      <g
        v-for="(myattachment, index) in myattachments"
        :key="'myattachment'+index"
        :transform="`translate(0, ${index * 75})`"
        class="draggable"
      >
        <!-- FIXME: class and id are not in the attachments state -->
        <circle cx="16" cy="16" r="16" fill="#989898" :id="myattachment.name" />
      </g>
    </svg>

    <div v-for="(connection, index) in connections" :key="index">
      <div v-for="connection in connection.connection">
        {{connection.endx}}
        {{connection.endy}}
      </div>
    </div>

    <!-- <ul class="data" v-for="(value, index) in connections" v-bind:key="index">
      <li v-for="(connnection, index) in value.connections" v-bind:key="index">{{ connection.xpos }}</li>
    </ul>-->

    <!-- REF: Keep for now
    <div v-for="(myattachment, index) in myattachments" :key="index">
    <img :src="myattachments[index].url" alt width="50%" height border="0" />-->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
var activenoteid
var firsttap
var secondtap
var xpos = 0
var ypos = 0

export default {
  name: 'YourData',
  computed: mapState({
    notes: state => state.notes,
    myattachments: state => state.myattachments,
    connections: state => state.connections

    // otherclients: state => state.otherclients
  }),

  mounted() {
    this.makeDraggable()
    this.makeConnectable()
  },

  methods: {
    addDoc() {
      this.$store.dispatch('addDoc')
      this.$emit('editMode')
    },
    openSelected(e) {
      this.$store.dispatch('noteId', e)
      this.$store.dispatch('getNoteText', e)
      this.$emit('editMode')
    },
    startConnect(e, f, xpos, ypos) {
      this.$store.dispatch('startConnect', { e, f, xpos, ypos })
    },
    updatePos(activenoteid, xpos, ypos) {
      this.$store.dispatch('movePos', { activenoteid, xpos, ypos })
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
      // touch end is not being picked up on Firefox
      svg.addEventListener('touchend', endDrag)
      svg.addEventListener('touchleave', endDrag)
      // touch cancel works
      svg.addEventListener('touchcancel', endDrag)

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

      var selectedElement, offset, transform

      function startDrag(evt) {
        if (evt.target.parentNode.classList.contains('draggable')) {
          selectedElement = evt.target.parentNode
          offset = getMousePosition(evt)
          //identify which object was clicked
          activenoteid = selectedElement.firstElementChild.id
          // console.log(activenoteid)

          // Make sure the first transform on the element is a translate transform
          var transforms = selectedElement.transform.baseVal

          if (
            transforms.length === 0 ||
            transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
          ) {
            // Create an transform that translates by (0, 0)
            var translate = svg.createSVGTransform()
            translate.setTranslate(0, 0)
            selectedElement.transform.baseVal.insertItemBefore(translate, 0)
          }

          // Get initial translation
          transform = transforms.getItem(0)
          offset.x -= transform.matrix.e
          offset.y -= transform.matrix.f
        }
      }

      function drag(evt) {
        if (selectedElement) {
          evt.preventDefault()
          var coord = getMousePosition(evt)
          transform.setTranslate(coord.x - offset.x, coord.y - offset.y)
        }
      }

      function endDrag(evt) {
        if (selectedElement) {
          evt.preventDefault()
          var coord = getMousePosition(evt)
          transform.setTranslate(coord.x - offset.x, coord.y - offset.y)
          //console.log(coord.x - offset.x)
          // send positions back to DB
          activenoteid = selectedElement.firstElementChild.id
          xpos = coord.x - offset.x
          ypos = coord.y - offset.y
          ref.updatePos(activenoteid, xpos, ypos)
          //alert('end dragg')
        }
        selectedElement = false
      }
    },

    makeConnectable() {
      //FIXME: also make as a plug in
      //console.log(this.$refs.sheets)
      var svg = this.$refs.sheets
      var ref = this
      svg.addEventListener('click', singleClick)
      svg.addEventListener('dblclick', doubleClick)

      var selectedElement

      function singleClick(evt) {
        if (firsttap == null) {
          if (evt.target.parentNode.classList.contains('draggable')) {
            selectedElement = evt.target.parentNode
            //console.log('first')
            firsttap = selectedElement.firstElementChild.id
            //ref.startConnect(firsttap)
          }
        } else {
          if (evt.target.parentNode.classList.contains('draggable')) {
            selectedElement = evt.target.parentNode

            secondtap = selectedElement.firstElementChild.id
            ref.startConnect(firsttap, secondtap, xpos, ypos)
            // firsttap = null
            // console.log(firsttap)
          }
        }
      }

      function doubleClick(evt) {
        if (evt.target.parentNode.classList.contains('draggable')) {
          selectedElement = evt.target.parentNode
          //console.log('double')
          //identify which object was clicked
          //console.log(selectedElement.firstElementChild.id)
          activenoteid = selectedElement.firstElementChild.id
          ref.openSelected(activenoteid)
        } else {
          ref.addDoc()
        }
      }
    }
  }
}
</script>

<style lang="css" scoped></style>