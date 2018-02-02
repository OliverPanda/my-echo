import { fetch } from 'src/config/fetch'
import { GET_ALL, SET_PLAYLIST } from './mutations-type'

export default {
    async getBanner({commit,state}) {
        let res = await fetch('GET','banner')
        // 合并banner recommend里的数据并按ID排列,详情页的时候用
        if (res.data) {
            let list = {}
            for (var i = 0; i < res.data.length; i++) {
                // 根据sound.id排列
                list[res.data[i].sound.id] = res.data[i]
            }
            list = { ...state.getAll, ...list }
            commit(GET_ALL, list)
        }
        return res
    },
    async getHot({commit,state}) {
        let res = await fetch('GET','recommend')
        if (res.data) {
            let list = {}
            for (var i = 0; i < res.data.length; i++) {
                list[res.data[i].sound.id] = res.data[i]
            }
            list = { ...state.getAll, ...list }
            commit(GET_ALL, list)
        }
        return res
    },
    // 根据 ID 获取音乐的所有数据, id在调用的时候传个路由id
    async get_music_data ({ state, commit,dispatch }, id) {
        // 如果没有数据的话，重新触发getBanner  getHot 获取banner recommend里的所有数据
        if(!state.getAll[id]) {
            await dispatch('getBanner')
            await dispatch('getHot')
        }
        let res = state.getAll[id]
        // 如果在playList里找不到该歌，则添加到playList中
        let ishash = false
        if (state.playList.find((n) => n.sound.id === id)) {
            ishash = true
        }
        if(!ishash) {
            state.playList.unshift(res)
            commit(SET_PLAYLIST,state.playList)
        }
        return res
        try {
            console.log(state.playList)
        }
        catch(e){
            throw new Error()
        }
    }
    
}