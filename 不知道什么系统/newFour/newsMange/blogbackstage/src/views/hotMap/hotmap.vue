<template>
  <div id="load">
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  name: "hotmap",
  data() {
    return {
      points: [
        { lng: 124.418261, lat: 41.921984, count: 520 },
        { lng: 123.423332, lat: 41.916532, count: 789 },
        { lng: 123.419787, lat: 41.930658, count: 453 },
        { lng: 123.418455, lat: 41.920921, count: 522 },
        { lng: 123.418843, lat: 41.915516, count: 779 },
        { lng: 123.42546, lat: 41.918503, count: 5687 },
        { lng: 123.423289, lat: 41.919989, count: 4563 },
        { lng: 123.418162, lat: 41.915051, count: 523 },
        { lng: 123.422039, lat: 41.91782, count: 425 },
        { lng: 123.41387, lat: 41.917253, count: 563 },
        { lng: 123.41773, lat: 41.919426, count: 568 },
        { lng: 123.421107, lat: 41.916445, count: 789 },
        { lng: 123.417521, lat: 41.917943, count: 563 },
        { lng: 123.419812, lat: 41.920836, count: 878 },
        { lng: 123.420682, lat: 41.91463, count: 468 },
        { lng: 123.415424, lat: 41.924675, count: 4778 },
        { lng: 123.419242, lat: 41.914509, count: 235 },
        { lng: 123.422766, lat: 41.921408, count: 478 },
        { lng: 123.421674, lat: 41.924396, count: 76 },
        { lng: 123.427268, lat: 41.92267, count: 876 },
        { lng: 123.417721, lat: 41.920034, count: 786 },
        { lng: 123.412456, lat: 41.92667, count: 356 },
        { lng: 123.420432, lat: 41.919114, count: 4645 },
        { lng: 123.425013, lat: 41.921611, count: 767 },
        { lng: 123.418733, lat: 41.931037, count: 7864 },
        { lng: 123.419336, lat: 41.931134, count: 457 },
        { lng: 123.413557, lat: 41.923254, count: 645 },
        { lng: 123.418367, lat: 41.92943, count: 445 },
        { lng: 123.424312, lat: 41.919621, count: 7865 },
        { lng: 123.423874, lat: 41.919447, count: 434 },
        { lng: 123.424225, lat: 41.923091, count: 520 },
        { lng: 123.417801, lat: 41.921854, count: 505 },
        { lng: 123.417129, lat: 41.928227, count: 5277 },
        { lng: 123.426426, lat: 41.922286, count: 425 },
        { lng: 123.421597, lat: 41.91948, count: 364 },
        { lng: 123.423895, lat: 41.920787, count: 745 },
        { lng: 123.423563, lat: 41.921197, count: 445 },
        { lng: 123.417982, lat: 41.922547, count: 453 },
        { lng: 123.426126, lat: 41.921938, count: 453 },
        { lng: 123.42326, lat: 41.915782, count: 100 },
        { lng: 123.419239, lat: 41.916759, count: 896 },
        { lng: 123.417185, lat: 41.929123, count: 2134 },
        { lng: 123.417237, lat: 41.927518, count: 563 },
        { lng: 123.417784, lat: 41.915754, count: 789 },
        { lng: 123.420193, lat: 41.917061, count: 356 },
        { lng: 123.422735, lat: 41.915619, count: 456 },
        { lng: 123.418495, lat: 41.915958, count: 693 },
        { lng: 123.416292, lat: 41.931166, count: 645 },
        { lng: 123.419916, lat: 41.924055, count: 456 },
        { lng: 123.42189, lat: 41.921308, count: 456 },
        { lng: 123.413765, lat: 41.929376, count: 456 },
        { lng: 123.418232, lat: 41.920348, count: 546 },
        { lng: 123.417554, lat: 41.930511, count: 454 },
        { lng: 123.418568, lat: 41.918161, count: 454 },
        { lng: 123.413461, lat: 41.926306, count: 4564 },
        { lng: 123.42232, lat: 41.92161, count: 7645 },
        { lng: 123.4174, lat: 41.928616, count: 455 },
        { lng: 123.424679, lat: 41.915499, count: 2454 },
        { lng: 123.42171, lat: 41.915738, count: 4554 },
        { lng: 123.417836, lat: 41.916998, count: 452 },
        { lng: 123.420755, lat: 41.928001, count: 4546 },
        { lng: 123.414077, lat: 41.930655, count: 1484 },
        { lng: 123.426092, lat: 41.922995, count: 4578 },
        { lng: 123.41535, lat: 41.931054, count: 502 },
        { lng: 123.413022, lat: 41.921895, count: 784 },
        { lng: 123.415551, lat: 41.913373, count: 578 },
        { lng: 123.421191, lat: 41.926572, count: 5434 },
        { lng: 123.419612, lat: 41.917119, count: 5354 },
        { lng: 123.418237, lat: 41.921337, count: 635 },
        { lng: 123.423776, lat: 41.921919, count: 787 },
        { lng: 123.417694, lat: 41.92536, count: 545 },
        { lng: 123.415377, lat: 41.914137, count: 562 },
        { lng: 123.417434, lat: 41.914394, count: 789 },
        { lng: 123.42588, lat: 41.922622, count: 536 },
        { lng: 123.418345, lat: 41.919467, count: 756 },
        { lng: 123.426883, lat: 41.917171, count: 4243 },
        { lng: 123.423877, lat: 41.916659, count: 654 },
        { lng: 123.415712, lat: 41.915613, count: 563 },
        { lng: 123.419869, lat: 41.931416, count: 236 },
        { lng: 123.416956, lat: 41.925377, count: 423 },
        { lng: 123.42066, lat: 41.925017, count: 562 },
        { lng: 123.416244, lat: 41.920215, count: 225 },
        { lng: 123.41929, lat: 41.915908, count: 250 },
        { lng: 123.422116, lat: 41.919658, count: 300 },
        { lng: 123.4183, lat: 41.925015, count: 400 },
        { lng: 123.421969, lat: 41.913527, count: 500 },
        { lng: 123.422936, lat: 41.921854, count: 200 },
        { lng: 123.41905, lat: 41.929217, count: 400 },
        { lng: 123.424579, lat: 41.914987, count: 500 },
        { lng: 123.42076, lat: 41.915251, count: 200 },
        { lng: 123.425867, lat: 41.918989, count: 120 },
        { lng: 116.418261, lat: 39.921984, count: 50 },
        { lng: 116.423332, lat: 39.916532, count: 51 },
        { lng: 116.419787, lat: 39.930658, count: 15 },
        { lng: 116.418455, lat: 39.920921, count: 40 },
        { lng: 116.418843, lat: 39.915516, count: 100 },
        { lng: 116.42546, lat: 39.918503, count: 6 },
        { lng: 116.423289, lat: 39.919989, count: 18 },
        { lng: 116.418162, lat: 39.915051, count: 80 },
        { lng: 116.422039, lat: 39.91782, count: 11 },
        { lng: 116.41387, lat: 39.917253, count: 7 },
        { lng: 116.41773, lat: 39.919426, count: 42 },
        { lng: 116.421107, lat: 39.916445, count: 4 },
        { lng: 116.417521, lat: 39.917943, count: 27 },
        { lng: 116.419812, lat: 39.920836, count: 23 },
        { lng: 116.420682, lat: 39.91463, count: 60 },
        { lng: 116.415424, lat: 39.924675, count: 8 },
        { lng: 116.419242, lat: 39.914509, count: 15 },
        { lng: 116.422766, lat: 39.921408, count: 25 },
        { lng: 116.421674, lat: 39.924396, count: 21 },
        { lng: 116.427268, lat: 39.92267, count: 1 },
        { lng: 116.417721, lat: 39.920034, count: 51 },
        { lng: 116.412456, lat: 39.92667, count: 7 },
        { lng: 116.420432, lat: 39.919114, count: 11 },
        { lng: 116.425013, lat: 39.921611, count: 35 },
        { lng: 116.418733, lat: 39.931037, count: 22 },
        { lng: 116.419336, lat: 39.931134, count: 4 },
        { lng: 116.413557, lat: 39.923254, count: 5 },
        { lng: 116.418367, lat: 39.92943, count: 3 },
        { lng: 116.424312, lat: 39.919621, count: 100 },
        { lng: 116.423874, lat: 39.919447, count: 87 },
        { lng: 116.424225, lat: 39.923091, count: 32 },
        { lng: 116.417801, lat: 39.921854, count: 44 },
        { lng: 116.417129, lat: 39.928227, count: 21 },
        { lng: 116.426426, lat: 39.922286, count: 80 },
        { lng: 116.421597, lat: 39.91948, count: 32 },
        { lng: 116.423895, lat: 39.920787, count: 26 },
        { lng: 116.423563, lat: 39.921197, count: 17 },
        { lng: 116.417982, lat: 39.922547, count: 17 },
        { lng: 116.426126, lat: 39.921938, count: 25 },
        { lng: 116.42326, lat: 39.915782, count: 100 },
        { lng: 116.419239, lat: 39.916759, count: 39 },
        { lng: 116.417185, lat: 39.929123, count: 11 },
        { lng: 116.417237, lat: 39.927518, count: 9 },
        { lng: 116.417784, lat: 39.915754, count: 47 },
        { lng: 116.420193, lat: 39.917061, count: 52 },
        { lng: 116.422735, lat: 39.915619, count: 100 },
        { lng: 116.418495, lat: 39.915958, count: 46 },
        { lng: 116.416292, lat: 39.931166, count: 9 },
        { lng: 116.419916, lat: 39.924055, count: 8 },
        { lng: 116.42189, lat: 39.921308, count: 11 },
        { lng: 116.413765, lat: 39.929376, count: 3 },
        { lng: 116.418232, lat: 39.920348, count: 50 },
        { lng: 116.417554, lat: 39.930511, count: 15 },
        { lng: 116.418568, lat: 39.918161, count: 23 },
        { lng: 116.413461, lat: 39.926306, count: 3 },
        { lng: 116.42232, lat: 39.92161, count: 13 },
        { lng: 116.4174, lat: 39.928616, count: 6 },
        { lng: 116.424679, lat: 39.915499, count: 21 },
        { lng: 116.42171, lat: 39.915738, count: 29 },
        { lng: 116.417836, lat: 39.916998, count: 99 },
        { lng: 116.420755, lat: 39.928001, count: 10 },
        { lng: 116.414077, lat: 39.930655, count: 14 },
        { lng: 116.426092, lat: 39.922995, count: 16 },
        { lng: 116.41535, lat: 39.931054, count: 15 },
        { lng: 116.413022, lat: 39.921895, count: 13 },
        { lng: 116.415551, lat: 39.913373, count: 17 },
        { lng: 116.421191, lat: 39.926572, count: 1 },
        { lng: 116.419612, lat: 39.917119, count: 9 },
        { lng: 116.418237, lat: 39.921337, count: 54 },
        { lng: 116.423776, lat: 39.921919, count: 26 },
        { lng: 116.417694, lat: 39.92536, count: 17 },
        { lng: 116.415377, lat: 39.914137, count: 19 },
        { lng: 116.417434, lat: 39.914394, count: 43 },
        { lng: 116.42588, lat: 39.922622, count: 27 },
        { lng: 116.418345, lat: 39.919467, count: 8 },
        { lng: 116.426883, lat: 39.917171, count: 3 },
        { lng: 116.423877, lat: 39.916659, count: 34 },
        { lng: 116.415712, lat: 39.915613, count: 14 },
        { lng: 116.419869, lat: 39.931416, count: 12 },
        { lng: 116.416956, lat: 39.925377, count: 11 },
        { lng: 116.42066, lat: 39.925017, count: 38 },
        { lng: 116.416244, lat: 39.920215, count: 91 },
        { lng: 116.41929, lat: 39.915908, count: 54 },
        { lng: 116.422116, lat: 39.919658, count: 21 },
        { lng: 116.4183, lat: 39.925015, count: 15 },
        { lng: 116.421969, lat: 39.913527, count: 3 },
        { lng: 116.422936, lat: 39.921854, count: 24 },
        { lng: 116.41905, lat: 39.929217, count: 12 },
        { lng: 116.424579, lat: 39.914987, count: 57 },
        { lng: 116.42076, lat: 39.915251, count: 70 },
        { lng: 116.425867, lat: 39.918989, count: 8 },
      ],
      map: "", // 保存地图实例
      //   116.418261, 39.921984
      centerLng: "116.418261", // 经度
      centerLat: "39.921984", // 纬度
      heatmapOverlay: {}, // 热力图覆盖物
    };
  },
  created() {
    // this.getMap();
  },
  methods: {
    // 创建和初始化地图函数
    initMap() {
      this.createMap(); // 创建地图
      this.initHeatMap(); // 添加热力图覆盖物
    },
    // 方法 - 创建地图
    createMap() {
      // 在百度地图容器中创建地图实例
      let map = new BMap.Map("container");
      // 将map变量存储在全局
      this.map = map;
      // 设定地图的中心点和坐标
      let point = new BMap.Point(this.centerLng, this.centerLat);
      // 设置中心点坐标和地图级别
      this.map.centerAndZoom(point, 12);
      // 允许滚轮缩放
      this.map.enableScrollWheelZoom(point, 15);
      // 添加左上角缩放比例尺(offset: new BMap.Size(0, 0)为比例尺的坐标位置)
      var opts = { offset: new BMap.Size(10, 10) };
      this.map.addControl(new BMap.NavigationControl(opts));
      // 设置地图默认缩放比例
      this.map.setZoom(15);
    },
    // 方法 - 添加热力图覆盖物
    initHeatMap() {
      this.heatmapOverlay = new BMapLib.HeatmapOverlay({
        // 热力图的每个点的半径大小
        radius: BMAP_POINT_SIZE_SMALL * 5,
        // 热力的透明度0~1
        opacity: 0.8,
        // 其中 key 表示插值的位置0~1，value 为颜色值
        gradient: {
	  		0:'rgb(102, 255, 0)',
	 	 	.5:'rgb(255, 170, 0)',
		  	1:'rgb(255, 0, 0)'
		},
      });
      // 清除图层(每次重新调用需要清除上一个覆盖物图层)
      this.map.clearOverlays();
      // 添加热力覆盖物
      this.map.addOverlay(this.heatmapOverlay);
      this.heatmapOverlay.setDataSet({ data: this.points, max: 100 });
      // 显示热力图，隐藏为this.heatmapOverlay.hide();
      this.heatmapOverlay.show();
    },
  },
  mounted() {
    // 创建和初始化地图函数
    this.initMap();
  },
};
</script>
<style scoped>
#load {
  width: 97%;
  height: 85vh;
}
#container {
  width: 100%;
  height: 100%;
  border: #ccc solid 1px;
}
</style>