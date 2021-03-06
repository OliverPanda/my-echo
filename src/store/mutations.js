import * as types from './mutations-type'
import * as cache from 'src/config/cookies'
export default {
    [types.GET_ALL] (state, val) {
        state.getAll = val
        cache.setCookie('getAll',val)        
    },
    [types.SET_PLAYLIST] (state, val) {
        // 不直接等于是解决数组赋值引用的问题
        // 当参入的参数是Object类型--数组，函数，对象的时候，函数内部对prototype做修改的时候,调用传入的参数会受到影响
        state.playList = val.slice()
        cache.setCookie('playList', val)
    },
    [types.SET_AUDIO_DATA] (state, val) {
        state.audio.data = val
    },
    [types.SET_AUDIO_ELE] (state, val) {
        state.audio.ele = val
    },
    [types.SET_AUDIO_PLAY] (state, val) {
        state.audio.play = val
    },
    [types.SET_AUDIO_DURATION] (state, val) {
        state.audio.duration = val
        
    },
    [types.SET_AUDIO_CURRENTTIME] (state, val) {
        state.audio.currentTime = val
    },
    [types.SET_AUDIO_PLAYMODE] (state, val) {
        state.playMode = val
        cache.setCookie('playMode', val)
        console.log("state.playMode为：" + state.playMode)
        
    },
    [types.SET_APP_CACHE] (state, val) {
        let getAll = JSON.parse(cache.getCookie('getAll'))
        let playList = JSON.parse(cache.getCookie('playList'))
        let playMode = cache.getCookie('playMode')
        if(getAll) {
            state.getAll = getAll
        }
        if (playList) {
            state.playList = playList
        }
        if (playMode) {
            state.playMode = playMode
        }
    }
    
}  