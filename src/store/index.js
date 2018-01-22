import Vuex from 'vuex'
Vue.use(Vuex)
import actions from './actions'
import mutaions from './mutations'
import getters from './getters'

const state = {

}

export default new Vuex.store({
    state,
    actions,
    mutations,
    getters
})
