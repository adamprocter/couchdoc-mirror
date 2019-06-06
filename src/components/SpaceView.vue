<template>
  <div class="spaceview">
    <h2>Space Man !</h2>
    <!-- tips-->
    <!-- : is short for v-bind -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="1800"
      id="space"
      @load="makeDraggable"
    >
      <g
        v-for="(note, index) in notes"
        :key="index"
        :transform="`translate(0, ${index * 170})`"
        class="draggable"
      >
        <rect height="120" width="80" fill="#f0b375"></rect>
        <text y="15">{{ note.text }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'YourData',
  computed: mapState({
    notes: state => state.notes
  }),

  // TODO: Fix this method
  methods: {
    makeDraggable() {
      console.log(evt)
      var svg = evt.target

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
        if (evt.target.classList.contains('draggable')) {
          selectedElement = evt.target
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
    }
  }
}
</script>

<style lang="css" scoped></style>
