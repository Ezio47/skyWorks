<template>

  <div class="container-fluid"  style="height: 100%">
     <div class="row">
       <Menu  mode="horizontal" theme="dark" :active-name="activeName">
         <div class="layout-nav">
           <MenuItem @click.native="menuSelect(item)" v-for="item in menuData" :name="item.name">
             <Icon :type="item.icon"></Icon>
              {{item.name}}
           </MenuItem>
         </div>
       </Menu>
     </div>
     <div class="row" style="height: 100%">
        <div class="col-md-1">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-checked-keys="[2,3]"
            @check-change="handleCheckChange"
            :props="defaultProps">
          </el-tree>
        </div>
       <div class="col-md-11" style="height: 100%">
         <SkylineMap></SkylineMap>
       </div>
     </div>
  </div>

</template>


<script>

  import SkylineMap from '../../skycompnents/map/SkylineMap.vue';
  import {skylineControl} from '../../skycompnents/map/SkylineControl';
  import {skyLayerManager} from '../../skycompnents/layerManager/SkyLayerManager';
  import {eventBus} from '../../skycompnents/eventBus/eventBus'

    export default {
        components: {
          SkylineMap

        },
        data(){
            return {

              data2: [{
                id: 1,
                label: '图层',
                isLeaf:false,
                children: [{
                  id: 2,
                  label: '宗地',
                  setChecked:true,
                  isLeaf:true,
                  layerName:"parcel"


                },
                  {
                    id: 3,
                    label: '建筑物',
                    setChecked:true,
                    isLeaf:true,
                    layerName:"building"
                  }
                ]
              }, ],
              defaultProps: {
                children: 'children',
                label: 'label'
              },
              menuData:[
                { name:"地下模式",
                  select:false,
                  icon:"ios-navigate"
                },
                { name:"移动查询",
                  select:false,
                  icon:"ios-keypad"
                }

              ],
              activeName:"-1",
              code:"1"
            }
        },
        props: {},
        methods: {

          handleCheckChange:function (data, checked) {
             if(data.isLeaf){
               skyLayerManager.showLayer(skyConfig.mapId,data.layerName,checked)
             }
          },
          menuSelect:function (item) {
             item.select =  !item.select;
             if(item.select == false){
                 this.code =   this.code + 1;
                 this.activeName =  this.code;

             }
            eventBus.bus.emit(eventBus.MENU_SELECT,item);

          }
        },
        computed: {},

        mounted(){

        },
        destroyed(){

        }
    }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
  }

  .layout-content{
    height: 100%;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
