
/**
 * Created by Administrator on 2017/3/31 0031.
 */
import {ProjectTree} from '../layerTree/SkylineTree';
import {eventBus} from '../eventBus/eventBus';
import {skyQueryManager} from "../mouseQuery/SkyQueryManager";
export  const  skylineControl = {};

/**
 * 地图是否加载完毕
 * @type {{}}
 */
skylineControl.isLoad = {};

/**
 * 地图列表
 * @type {{}}
 */
skylineControl.mapHash = {};




skylineControl.init  = function () {


  window.onload = test;
  eventBus.bus.addListener(eventBus.MENU_SELECT,menuSelect);

}

function test() {

    let flyPath = skyConfig.url;
    console.log("start 3D")
    let SGWorldLeft = document.getElementById('VEX').CreateInstance("TerraExplorerX.SGWorld66");
    SGWorldLeft.Project.Open(flyPath);
    skyQueryManager.init(SGWorldLeft);
    SGWorldLeft.AttachEvent("OnLoadFinished",loadComplete);
    skylineControl.mapHash[skyConfig.mapId] = SGWorldLeft;
    ProjectTree.loadProjectTree();

}

function menuSelect(item) {
  if(item.name == "地下模式"){
    skylineControl.setUnderMode(item.select);
  }
  else{
    skylineControl.setUnderMode(false);
  }
}


function loadComplete()
{
  skylineControl.isLoad = true;
}





skylineControl.setQuryMode = function () {

  skylineControl.mapHash[skyConfig.mapId].Window.SetInputMode(1);
}

skylineControl.setUnderMode = function (bool) {

  skylineControl.mapHash[skyConfig.mapId].Navigate.UndergroundMode = bool;
}

skylineControl.queryTask = function (skylineid,layerName) {


  var layerArr = new Array();

  var ItemID =  skylineState.state.sgworldHash[skylineid].ProjectTree.FindItem(layerName);
  var obj = skylineState.state.sgworldHash[skylineid].ProjectTree.GetLayer(ItemID);

  // 遍历当前图层中已经在地图上加载的全部对象及其属性

  var featureGroup = obj.FeatureGroups.Item(0);
  for( var z = 0; z < featureGroup.Features.Count;z++)
  {
    if(z > 5)
    {
      break;
    }

    var pIFeature = featureGroup.Features.Item(z);
    //取得定位的id
    var layerObject  = new Object();
    layerObject['ObjectID'] = featureGroup.Features.Item(z).ID;
    for (var j = 0; j < pIFeature.FeatureAttributes.Count; j++) {

      var pIFeatureAttribute = pIFeature.FeatureAttributes.Item(j);
      if(pIFeatureAttribute.Name == 'NAME')
      {
        layerObject[pIFeatureAttribute.Name] = pIFeatureAttribute.Value;
        break;
      }
      else if(pIFeatureAttribute.Name == '站点编号')
      {
        layerObject['NAME'] = pIFeatureAttribute.Value;
        break;
      }

    }
    layerArr.push(layerObject)

  }

  return layerArr;
}
















