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
        play: false
        
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
