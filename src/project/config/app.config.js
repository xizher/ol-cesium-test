export default {
  appHeaderConfig: {
    title: '基于Openlayers与Cesium的地图API集成测试系统',
    menuConfig: {
      defaultActive: '/',
      menuItems: [
        { name: 'Openlayers', path: '/' },
        { name: 'Cesium', path: '/cesium' },
        { name: 'OC联动', path: '/oc-linkage' },
        { name: '全局配置', path: '/config' },
        { name: 'API文档', path: '/api-docs' },
        { name: '关于', path: '/about' },
      ]
    },
    timeConfig: {
      visible: true,
      format: 'yyyy-MM-dd hh:mm:ss'
    }
  },
  webMapConfig: {
    ol: {
      webMapOptions: {

      },
      basemapOptions: {
        key: '天地图矢量'
      },
      layerOperationOptions: {
        layerItems: [
          {
            name: '广州区县级行政区划/wms',
            type: 'wms',
            url: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base/wms',
            params: {
              'FORMAT': 'image/png',
              'VERSION': '1.1.1',
              'tiled': true,
              'STYLES': '',
              'LAYERS': 'webgis-ol-base:boundary',
              'exceptions': 'application/vnd.ogc.se_inimage'
            },
            visible: true
          }, {
            name: '广州区县级行政区划',
            type: 'wfs',
            url: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webgis-ol-base:boundary&outputFormat=application/json',
            visible: false
          }, {
            name: '广佛地铁线路',
            type: 'wfs',
            url: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webgis-ol-base:subway&outputFormat=application/json',
            visible: true
          }, {
            name: '广佛地铁站点',
            type: 'wfs',
            url: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webgis-ol-base:stations&outputFormat=application/json',
            visible: true
          },
        ]
      }
    }
  },
  viewOpenlayersConfig: {
    asideConfig: {
      showSlider: true,
      defaultWidth: 300,
    }
  }
}
