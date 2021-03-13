<template>
  <div
    ref="slider"
    class="slider"
    :style="{ right: rightStr }"
  >
    <i class="el-icon-rank" />
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import appConfig from '../../../../config/app.config'
export default {
  name: 'AsideSlider',
  props: {
    asideWidth: { type: Number, default: 200 }
  },
  emits: [
    'updateWidth'
  ],
  setup (props, { emit }) {
    const { viewOpenlayersConfig: config } = appConfig
    const { asideConfig } = config
    const minWidth = asideConfig.defaultWidth
    /** @type { import('vue').Ref<HTMLElement> } */
    const slider = ref(null)
    const rightStr = computed(() => `${props.asideWidth - 9}px`)
    let dragging = false
    const handlePointerdown = () => dragging = true
    const handlePointermove = e => {
      const newWidth = window.innerWidth - e.x
      dragging && (emit('updateWidth', newWidth < minWidth ? minWidth : newWidth))
    }
    const handlePointerup = () => dragging = false
    const handlePointerleave = () => dragging = false

    onMounted(() => {
      slider.value.addEventListener('pointerdown', handlePointerdown)
      slider.value.addEventListener('pointermove', handlePointermove)
      slider.value.addEventListener('pointerup', handlePointerup)
      slider.value.addEventListener('pointerleave', handlePointerleave)
    })

    onUnmounted(() => {
      slider.value.removeEventListener('pointerdown', handlePointerdown)
      slider.value.removeEventListener('pointermove', handlePointermove)
      slider.value.removeEventListener('pointerup', handlePointerup)
      slider.value.removeEventListener('pointerleave', handlePointerleave)
    })

    return {
      rightStr, slider
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 18px;
  border-radius: 6px;
  cursor: move;
  background-color: #fff;
}
</style>
