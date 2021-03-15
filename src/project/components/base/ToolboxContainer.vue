<template>
  <div
    v-if="visible"
    class="toolbox-container pointer-event-auto"
    :style="style"
  >
    <div
      class="drap-box"
      @mousemove="drapHandler"
      @mousedown="setDrap"
      @mouseup="draping = false"
      @mouseleave="draping = false"
    >
      <div>{{ title }}</div>
      <div
        class="btn-clone"
        @click="cancel"
      >
        <el-tag
          size="mini"
          type="info"
        >
          ×
        </el-tag>
      </div>
    </div>
    <div class="toolbox-container-body">
      <slot />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'ToolboxContainer',
  props: {
    left: { type: String, default: 'auto' },
    top: { type: String, default: 'auto' },
    bottom: { type: String, default: 'auto' },
    right: { type: String, default: 'auto' },
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' },
  },
  emits: ['cancel'],
  setup (props, { emit }) {
    const draping = ref(false)
    let offsetX = 0, offsetY = 0
    /**
     * @param { MouseEvent } event
     */
    const setDrap = event => {
      offsetX = event.offsetX
      offsetY = event.offsetY
      draping.value = true
    }
    const style = reactive({
      left: props.left,
      top: props.top,
      bottom: props.bottom,
      right: props.right,
    })
    /**
     * @param { MouseEvent } event
     */
    const drapHandler = event => {
      if (draping.value) {
        const { clientX, clientY } = event
        style.left = `${clientX - offsetX}px`
        style.top = `${clientY - offsetY}px`
        style.bottom = 'auto'
        style.right = 'auto'
      }
    }
    function cancel () {
      emit('cancel')
    }
    return {
      style,
      drapHandler,
      draping,
      setDrap,
      cancel,
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbox-container {
  position: fixed;
  z-index: 999;
  min-width: 400px;
  min-height: 150px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .drap-box {
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 8px;
    border-bottom: 1px solid #eee;
    cursor: move;
    .btn-clone {
      margin-left: auto;
      cursor: pointer;
    }
  }

  .toolbox-container-body {
    padding: 8px;
  }
}
</style>
