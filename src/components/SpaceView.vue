<template>
  <div class="spaceview">
    <h2>Your spatial view</h2>
    <!-- tips-->
    <!-- : is short for v-bind -->
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="800" id="space" ref="sheets">
      <g
        v-for="(note, index) in notes"
        :key="index"
        :transform="`translate(0, ${index * 75})`"
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

        <!--FIXME: Keep for Ref for now
          <text y="15">{{ note.text }}</text>
        <text y="30">{{ note.content_type }}</text>-->
      </g>
      <!-- FIXME: duplicate key issue ?? -->
      <g
        v-for="(myattachment, index) in myattachments"
        :key="indexB"
        :transform="`translate(0, ${index * 75})`"
        class="draggable"
      >
        <circle cx="16" cy="16" r="16" fill="#989898" :class="myattachment.content_type" />
      </g>
    </svg>

    <!-- FIXME: Keep for Ref for now 
    <div v-for="(myattachment, index) in myattachments" :key="index">
    <img :src="myattachments[index].url" alt width="50%" height border="0" />-->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'YourData',
  computed: mapState({
    notes: state => state.notes,
    myattachments: state => state.myattachments
  }),

  mounted() {
    //console.log('mounted')
    this.makeDraggable()
    this.makeConnectable()
  },

  // FIXME: Move this type of method to a plug in perhaps
  methods: {
    makeDraggable() {
      // console.log(this.$refs.sheets)
      var svg = this.$refs.sheets

      svg.addEventListener('mousedown', startDrag)
      svg.addEventListener('mousemove', drag)
      svg.addEventListener('mouseup', endDrag)
      svg.addEventListener('mouseleave', endDrag)
      svg.addEventListener('touchstart', startDrag)
      svg.addEventListener('touchmove', drag)
      svg.addEventListener('touchend', endDrag)
      svg.addEventListener('touchleave', endDrag)
      svg.addEventListener('touchcancel', endDrag)

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
        selectedElement = false
      }
    },

    makeConnectable() {
      //TODO: add in this code
      //FIXME: probably also make as a plug in
      //console.log(this.$refs.sheets)
      var svg = this.$refs.sheets
      svg.addEventListener('click', singleClick)
      svg.addEventListener('dblclick', doubleClick)

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

      function singleClick(evt) {
        if (evt.target.parentNode.classList.contains('draggable')) {
          selectedElement = evt.target.parentNode
          offset = getMousePosition(evt)
          console.log('single')
        }
      }

      function doubleClick(evt) {
        if (evt.target.parentNode.classList.contains('draggable')) {
          selectedElement = evt.target.parentNode
          offset = getMousePosition(evt)
          console.log('double')
        }
      }
    }
  }
}
</script>

<style lang="css" scoped></style>
