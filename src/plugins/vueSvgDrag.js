import svgDrag from '@svgdotjs/svg.draggable.js'

export default {
  install: Vue => {
    Vue.prototype.$svgDrag = svgDrag
  }
}
