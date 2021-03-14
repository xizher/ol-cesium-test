<template>
  <div>
    <el-tree
      v-model:data="layerList"
      :allow-drop="handleAllowDrop"
      node-key="id"
      draggable
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ data.name }}</span>
          <span>
            <input
              type="checkbox"
              :checked="data.visible"
              @change="e => handleChange(e.target.checked, data)"
            >
            <a @click="handleTest(data, node)">
              Delete
            </a>
          </span>
        </span>
      </template>
    </el-tree>
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
    const [layerList, layerPool] = useLayerList(webMap.layerOperation)
    function handleAllowDrop (draggingNode, dropNode, type) {
      return type !== 'inner'
    }
    function handleTest (data, node) {
      console.log(data, node)
    }
    function handleChange (visible, data) {
      layerPool.get(data.name).target.getV
    }
    return {
      handleAllowDrop, handleTest, handleChange, layerList
    }
  },
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
}
</style>
