<template>
  <div class="allspaceview">
    <h2>All spatial view</h2>
    <!-- tips-->
    <!-- : is short for v-bind -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="800"
      id="space"
      ref="sheets"
    >
      <g v-for="(value, index) in otherclients" :key="index">
        <g
          v-for="(note, index) in value.doc.notes"
          v-bind:key="index"
          :transform="`translate(${note.xpos}, ${note.ypos})`"
          class="draggable"
        >
          <polygon
            v-if="note.content_type == 'link'"
            points="14,0 0,32 32,32"
            fill="#989898"
            :class="note.content_type"
          />
          <rect
            v-if="note.content_type == 'sheet'"
            width="25"
            height="25"
            fill="#989898"
            :class="note.content_type"
          />
        </g>
      </g>
    </svg>

    <!-- REF: Keep for now
    <div v-for="(myattachment, index) in myattachments" :key="index">
    <img :src="myattachments[index].url" alt width="50%" height border="0" />-->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
var activenoteid
var xpos
var ypos

export default {
  name: 'YourData',
  computed: mapState({
    //notes: state => state.notes,
    //myattachments: state => state.myattachments
    otherclients: state => state.otherclients
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
    // FIXME: Edit note
    openSelected(e) {
      // console.log(e)
      this.$store.dispatch('noteId', e)
      this.$store.dispatch('getNoteText', e)
      this.$emit('editMode')
      // this.editMode()
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
      svg.addEventListener('touchend', endDrag)
      svg.addEventListener('touchleave', endDrag)
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
          console.log(activenoteid)

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
          //console.log(coord.x - offset.x)
          // send positions back to DB
          // activenoteid = selectedElement.firstElementChild.id
          // xpos = coord.x - offset.x
          // ypos = coord.y - offset.y
          // ref.updatePos(activenoteid, xpos, ypos)
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

      var selectedElement //, offset, transform

      function singleClick(evt) {
        if (evt.target.parentNode.classList.contains('draggable')) {
          selectedElement = evt.target.parentNode
          //console.log('single')
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
