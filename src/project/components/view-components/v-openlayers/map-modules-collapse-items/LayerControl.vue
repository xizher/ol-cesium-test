<template>
  <div class="layer-control">
    <transition-group
      name="flip-list"
      tag="div"
    >
      <el-card
        v-for="(item, index) in layerFormatList"
        :key="item.id"
        class="layer-item"
        :body-style="{
          padding: '8px 4px'
        }"
      >
        <div class="layer-item-content">
          <div class="level-control">
            <a @click="handleChangeLevel(item.level, item.level + 1, layerList[index])">↑</a>
            <a @click="handleChangeLevel(item.level, item.level - 1, layerList[index])">↓</a>
          </div>
          <div>{{ item.name }}</div>
          <div class="opacity-control">
            <el-slider
              v-model="layerList[index].opacity"
              :min="0"
              :max="1"
              :step="0.1"
              :show-tooltip="false"
            />
          </div>
          <div class="visible-control">
            <input
              type="checkbox"
              :checked="item.visible"
              @change="e => handleChangeVisible(e.target.checked, layerList[index])"
            >
          </div>
        </div>
      </el-card>
    </transition-group>
  </div>
</template>

<script>
import { } from 'vue'
import { useLayerList } from '../../../../../zhd/dist/gis/openlayers/hooks/layer-operation.hooks'
import useMap from '../../../../hooks/webmap/useOlMap'
export default {
  name: 'LayerControl',
  setup () {
    const [webMap] = useMap()
    const [layerList, layerFormatList] = useLayerList(webMap.layerOperation)
    function handleChangeVisible (visible, item) {
      item.visible = visible
    }
    function handleChangeLevel (level, newLevel, item) {
      if (newLevel < 0 || newLevel >= layerList.length) {
        return
      }
      layerList.find(item => item.level === newLevel).level = level
      item.level = newLevel
    }
    return {
      layerList, handleChangeVisible, handleChangeLevel, layerFormatList
    }
  },
}
</script>

<style lang="scss" scoped>
.layer-control {
  .layer-item {
    margin: 8px;
  }
  .level-control {
    cursor: pointer;
    :hover {
      border-bottom: 1px solid #000;
    }
  }
  .layer-item-content {
    display: flex;
  }
  .opacity-control {
    margin-left: auto;
    width: 50px;
    margin-right: 8px;
  }
  :deep(.el-slider__runway) {
    margin: 8px 0;
  }
}
</style>
