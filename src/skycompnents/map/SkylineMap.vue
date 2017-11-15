<template>
    <div style="width: 100%;height: 100%;">
      <object id="VEX"  style="width:100%;height:100%;"  classid="clsid:3a4f9196-65a8-11d5-85c1-0001023952c1"></object>
    </div>
</template>

<script>

    import {skylineControl} from './SkylineControl'
    export default {
        components: {},
        data(){
            return {

                mapId:skyConfig.mapId
            }
        },
        props: {},
        methods: {},
        computed: {},
        mounted(){
          skylineControl.init();
        },
        destroyed(){

        }
    }
</script>

<style>

</style>
