/**
 * Created by Administrator on 2017/7/11 0011.
 */

import EventEmitter from 'wolfy87-eventemitter'

export const eventBus = {};

/**
 * 创建一个事件总线实例
 * */
eventBus.bus = new EventEmitter;


/**
 * 编译grid
 * @type {string}
 */
eventBus.MENU_SELECT = "MENU_SELECT";



