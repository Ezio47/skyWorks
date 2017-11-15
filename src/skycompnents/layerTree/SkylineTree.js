/**
 * Created by Administrator on 2017/4/1 0001.
 *
 */
import {skylineControl}  from '../map/SkylineControl'

export const  ProjectTree = {};

ProjectTree.playersName = [];
ProjectTree.playersInfo = {};
ProjectTree.playersId = {};
ProjectTree.pLayerTree = [];


/*
 遍历获取图层树
 container:图层树的容器，例如div，不设置此参数则不加载到指定容器中
 */

ProjectTree.loadProjectTree = function () {

        let sgworld = skylineControl.mapHash[skyConfig.mapId];
        //18:The root of the Tree.树的根节点
        let proTree = sgworld.ProjectTree;
        let rootid = proTree.RootID;
        console.log(rootid,'rootid');
        let rootID = proTree.GetNextItem(rootid, 18);
        ProjectTree.bulidTreeFirst(sgworld, rootID);
        console.log(ProjectTree.playersInfo,'playersInfo')
    }



ProjectTree.bulidTreeFirst = function(sgworld65, current)
{
        while (current) {
            let fchild = { 'name': '', 'child': [], id:'','leaf': true };
            //获取树节点的名称
             let  itemName = sgworld65.ProjectTree.GetItemName(current);

            //判断子项是否是一个组（为什么判断是否为组呢？因为skyline的数据结构是这样组织的，结构如下：
            //子项-组-图层等）
            if (sgworld65.ProjectTree.IsGroup(current)) {

                fchild.name = itemName;
                fchild.id = current;
                if (sgworld65.ProjectTree.IsLayer(current)) {//叶子节点
                    let name = sgworld65.ProjectTree.GetItemName(current);

                    let layer = sgworld65.ProjectTree.getLayer(current);
                    ProjectTree.playersName.push(name);
                    ProjectTree.playersInfo[name] = layer;
                    //fchild.leaf = true;
                    fchild.name = name;
                }
                else {//递归遍历
                    //获取改组的第一个item
                    //
                    /*JavaScript
                     GetNextItem(ID,Code)
                     code=11:第一个item
                     */


                    fchild.leaf = false;
                    //var schild = { 'name': '', 'child': [], 'leaf': true };
                    //fchild.child.push(schild);

                    let childItem = sgworld65.ProjectTree.GetNextItem(current, 11);
                    ProjectTree.buildTreeChild(sgworld65, childItem, fchild);
                }
              ProjectTree.pLayerTree.push(fchild);
        }

        //13:获取其兄弟节点
        current = sgworld65.ProjectTree.GetNextItem(current, 13);
    }
}


ProjectTree.buildTreeChild = function (sgworld65,current,parent) {
      try
      {
          while (current) {
              let fchild = {'name':'','child':[],'leaf':true};
              //获取树节点的名称
              let itemName = sgworld65.ProjectTree.GetItemName(current);

              //判断子项是否是一个组（为什么判断是否为组呢？因为skyline的数据结构是这样组织的，结构如下：
              //子项-组-图层等）
              if (sgworld65.ProjectTree.IsGroup(current)) {
                  fchild.name = itemName;
                  fchild.id = current;
                  if (sgworld65.ProjectTree.IsLayer(current)) {//叶子节点
                      let name = sgworld65.ProjectTree.GetItemName(current);

                      let layer = sgworld65.ProjectTree.getLayer(current);
                      ProjectTree.playersName.push(name);
                      ProjectTree.playersInfo[name] = layer;
                      fchild.name = name;
                      //fchild.leaf = true;
                  }
                  else {//递归遍历
                      //获取改组的第一个item
                      //
                      /*JavaScript
                       GetNextItem(ID,Code)
                       code=11:第一个item
                       */

                      fchild.leaf = false;
                      //var schild = { 'name': '', 'child': [], 'leaf': true };
                      //fchild.child.push(schild);

                      //this.pLayerTree.push(fchild);

                      let  childItem = sgworld65.ProjectTree.GetNextItem(current, 11);
                      ProjectTree.buildTreeChild(sgworld65, childItem, fchild);
                  }
                  parent.child.push(fchild);
              }
              //13:获取其兄弟节点
              current = sgworld65.ProjectTree.GetNextItem(current, 13);
          }
      }
      catch (e) {
          alert(e.message);
      }
    }


