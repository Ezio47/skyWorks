/**
 * Created by Administrator on 2017/11/14 0014.
 */

import {ProjectTree} from '../layerTree/SkylineTree';
import {skylineControl} from '../map/SkylineControl';


export  const skyLayerManager = {}


skyLayerManager.showLayer = function(skylineid,layerName,bool)
{
  let arr  = ProjectTree.pLayerTree;
  for(let layerInfo of arr) {
    if (layerInfo.name == layerName) {
      skylineControl.mapHash[skyConfig.mapId].ProjectTree.SetVisibility(layerInfo.id, bool);
    }
  }
}
