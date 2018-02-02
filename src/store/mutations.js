import * as types from './mutations-type'
import cache from 'src/config/setCookie'
export default {
    [types.GET_ALL] (state,val) {
        state.getAll = val;
    },
    [SET_PLAYLIST] (state,val) {
        // 不直接等于是解决数组赋值引用的问题
        // 当参入的参数是Object类型--数组，函数，对象的时候，函数内部对prototype做修改的时候,调用传入的参数会受到影响
        state.playList = val.slice();
        console.log('直接传入val',val)
        console.log('传入val.slice()',val.slice())
        cache.setCookie('playList',val)
    },
    
}