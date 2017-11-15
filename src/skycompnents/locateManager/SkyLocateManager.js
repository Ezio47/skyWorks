/**
 * Created by Administrator on 2017/11/14 0014.
 */

import {skylineControl} from '../map/SkylineControl'
export const skyLocateManager = {}


skyLocateManager.flyObject  = function (id){

  if(id !="")
  {
    skylineControl.mapHash[skyConfig.mapId].navigate.FlyTo(id);
  }

}
