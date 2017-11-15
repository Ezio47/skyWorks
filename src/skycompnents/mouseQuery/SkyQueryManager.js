/**
 * Created by Administrator on 2017/11/14 0014.
 */

import {skylineControl} from '../map/SkylineControl';
import {ProjectTree} from '../layerTree/SkylineTree';
import {eventBus} from "../eventBus/eventBus";

export const skyQueryManager = {}

skyQueryManager.flag = false;

skyQueryManager.init = function (SGWorldLeft) {
  SGWorldLeft.AttachEvent("OnLButtonDown", OnLButtonDown);
  eventBus.bus.addListener(eventBus.MENU_SELECT,menuSelect)
}

function menuSelect(item) {
  if(item.name == "移动查询"){
    console.log(item.name);
    skyQueryManager.flag = item.select;

  } else{
    skyQueryManager.flag = false;
  }
}


function OnLButtonDown(Flags, X, Y)
{
  if(skyQueryManager.flag == false)
  {
    return;
  }
  let mi  = skylineControl.mapHash[skyConfig.mapId].Window.GetMouseInfo();
  let iwp = skylineControl.mapHash[skyConfig.mapId].Window.PixelToWorld(mi.X, mi.Y);
  console.log(iwp.ObjectID);
  if(iwp.ObjectID != "")
  {
    let pIFeature = skylineControl.mapHash[skyConfig.mapId].Creator.GetObject(iwp.ObjectID);

    let layerId = pIFeature.LayerID;
    let layer3DName = skyQueryManager.getLayerNameById(layerId);
    let selectObjectName = "";


    let trString = "";
    for (let j = 0; j < pIFeature.FeatureAttributes.Count; j++) {

      let pIFeatureAttribute = pIFeature.FeatureAttributes.Item(j);
      trString += ` <tr>
                <td>${pIFeatureAttribute.Name}</td>
                <td>${pIFeatureAttribute.Value}</td>
              </tr>`
    }

    // console.log({
    //   id:iwp.ObjectID,
    //   layer3DName:layer3DName,
    //   selectObjectName:selectObjectName,
    //   a:pIFeature.FeatureAttributes
    // });
    let popup =  skylineControl.mapHash[skyConfig.mapId].Creator.CreatePopupMessage("详细信息");
    let popupWidth = 300;
    let popupHeight = 300;
    if(pIFeature.FeatureAttributes.Count != 0){
      popupHeight = 20 * pIFeature.FeatureAttributes.Count + 200;
    }
    popup.Width = popupWidth;
    popup.Height = popupHeight;

    popup.InnerHTML
      = `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>skyworks</title>
              </head>
              <body>
                <link rel="stylesheet" href="http://localhost:8080/static/css/bootstrap.css">
                   <table class="table" border="1">
              <tr>
                <th>名称</th>
                <th>值</th>
              </tr>
             ${trString}
            </table>
              </body>
           </html>`

    skylineControl.mapHash[skyConfig.mapId].Window.ShowPopup(popup);

  }
}

skyQueryManager.getLayerNameById = function(layerId)
{
  let playersInfo = ProjectTree.playersInfo;
  let layerName ="kong";

  for(let key of Object.keys(playersInfo))
  {
    console.log(key);
    let item = playersInfo[key];
    if(item.ID == layerId)
    {
      layerName = key;
      break;
    }
  }
  return layerName;
}
