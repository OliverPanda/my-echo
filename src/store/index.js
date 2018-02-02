import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
    banner: [],
    getAll: [],
    audio: {
        currentTime: 0,
        duration:　0,
        play: false,
        data: null,
        ele: null
    },
    playList: [],
    playMode: 'default'
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
