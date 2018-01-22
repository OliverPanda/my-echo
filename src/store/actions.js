import {Banner} from 'src/services/getData'
import {
    GET_BANNER,
    GET_HOT
} from './mutations-type'
export default {
    async getBanner({commit, state}) {
        let res = await Banner();
        // 数组转换成以id为属性的对象，方便根据id取对应数据
        if (res.data) {
            let list = {}
            for (var i = 0; i < res.data.length; i++) {
                list[res.data[i].sound.id] = res.data[i]
            }
            list = { ...state.listJson, ...list }
            commit('set_listJson', list)
        }
        commit(GET_BANNER, res)
    }

}