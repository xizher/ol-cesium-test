export default {
  appHeaderConfig: {
    title: '基于Openlayers与Cesium的地图API集成测试系统',
    menuConfig: {
      defaultActive: '/cesium',
      menuItems: [
        { name: 'VOpenlayers', alias: 'Openlayers', path: '/openlayers' },
        { name: 'VCesium', alias: 'Cesium/Supermap', path: '/cesium' },
        { name: 'VOCLinkage', alias: 'OC联动', path: '/oc-linkage' },
        { name: 'VConfig', alias: '全局配置', path: '/config' },
        { name: 'VApiDocs', alias: 'API文档', path: '/api-docs' },
        { name: 'VAbout', alias: '关于', path: '/' },
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
            visible: true,
            style: {
              uniqueField: 'name',
              items: [
                {
                  value: '广州地铁2号线',
                  style: {
                    stroke: {
                      color: '#0000ff',
                      width: 2
                    }
                  }
                }, {
                  value: '广州地铁5号线',
                  style: {
                    stroke: {
                      color: '#ff0000',
                      width: 2
                    }
                  }
                }
              ]
            }
          }, {
            name: '广佛地铁站点',
            type: 'wfs',
            url: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webgis-ol-base:stations&outputFormat=application/json',
            visible: true,
            style: {
              image: {
                styleType: 'circle',
                fill: { color: '#000000' },
                radius: 2
              }
            }
          },
        ]
      },
    },
    cesium: {
      // baseUrl: 'https://cesium.com/downloads/cesiumjs/releases/1.79.1/Build/Cesium/',
      // cssUrl: 'https://cesium.com/downloads/cesiumjs/releases/1.79.1/Build/Cesium/Widgets/widgets.css',
      baseUrl: '/supermap/Build/Cesium/',
      cssUrl: '/supermap/Build/Cesium/Widgets/widgets.css',
      webMapOptions: {

      },
      basemapOptions: {
        key: '天地图矢量'
      }
    }
  },
  viewOpenlayersConfig: {
    asideConfig: {
      showSlider: true,
      defaultWidth: 300,
    }
  },
  viewCesiumConfig: {
    asideConfig: {
      showSlider: false,
      defaultWidth: 300,
    }
  },
  apiDocsIndexUrl: `${window.location.origin}/docs/index.html`
}
