<template>
    <div>
        <div id="mapDiv" class="mapDiv"></div>
    </div>
</template>
<script>
export default {
    name:"hottmap",
    data(){
        return{

        }
    },
    mounted(){
      this.loadmap();
    },
    methods:{
       loadmap(){
            var map = new T.Map("mapDiv");
        //设置显示地图的中心点和级别
            map.centerAndZoom(new T.LngLat(116.40969, 39.94940), 12);
            //允许鼠标双击放大地图
            map.enableScrollWheelZoom();
       }
    }

}
</script>
<style scoped>
.mapDiv{
    width: 100%;
  height: 85vh;
}
</style>