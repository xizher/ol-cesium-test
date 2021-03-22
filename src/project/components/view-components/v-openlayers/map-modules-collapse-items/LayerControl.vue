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
          <div
            class="content-item zoom-control"
            @click="zoomTo(item.name)"
          >
            ⊕
          </div>
          <div class="content-item layer-name">
            {{ item.name }}
          </div>
          <div class="content-item visible-control">
            <input
              type="checkbox"
              :checked="item.visible"
              @change="e => handleChangeVisible(e.target.checked, layerList[index])"
            >
          </div>
          <div class="content-item opacity-control">
            <el-slider
              v-model="layerList[index].opacity"
              :min="0"
              :max="1"
              :step="0.1"
              :show-tooltip="false"
            />
          </div>
          <div
            v-if="item.type === 'wfs'"
            class="content-item attributes-table"
            @click="openAttributesTable(item.name)"
          >
            <el-icon class="el-icon-notebook-2" />
          </div>
          <div class="content-item level-control">
            <a @click="handleChangeLevel(item.level, item.level + 1, layerList[index])">↑</a>
            <a @click="handleChangeLevel(item.level, item.level - 1, layerList[index])">↓</a>
          </div>
        </div>
      </el-card>
    </transition-group>
    <AttributesTable
      :visible="attributesTableVisible"
      :layer-name="layerName"
      @cancel="attributesTableVisible = false"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useLayerList } from '../../../../../zhd/dist/gis/openlayers/hooks/layer-operation.hooks'
import useMap from '../../../../hooks/webmap/useOlMap'
import AttributesTable from '../../../base/AttributesTable.vue'
export default {
  name: 'LayerControl',
  components: {
    AttributesTable
  },
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
    function zoomTo (name) {
      webMap.layerOperation.zoomToLayer(name)
    }

    const attributesTableVisible = ref(false)
    const layerName = ref('')
    function openAttributesTable (name) {
      layerName.value = ''
      layerName.value = name
      attributesTableVisible.value = true
    }

    return {
      layerList,
      handleChangeVisible,
      handleChangeLevel,
      layerFormatList,
      zoomTo,
      attributesTableVisible,
      openAttributesTable,
      layerName,
    }
  },
}
</script>

<style lang="scss" scoped>
.layer-control {
  .layer-item {
    margin: 8px;
  }
  .layer-item-content {
    display: flex;
    flex-wrap: wrap;
  }
  .layer-name {
    flex: auto;
    width: calc(100% - 1em - 2em);
  }
  .opacity-control {
    width: 40px;
    margin-right: 18px;
  }
  .level-control {
    margin-left: auto;
    cursor: pointer;
    :hover {
      border-bottom: 1px solid #000;
    }
  }
  .zoom-control {
    cursor: pointer;
    width: 1em;
  }
  .visible-control {
    width: 2em;
  }
  .attributes-table {
    cursor: pointer;
  }
  :deep(.el-slider__runway) {
    margin: 8px 0;
  }
}
</style>
