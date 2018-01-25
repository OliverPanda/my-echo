import * as types from './mutations-type'
export default {
    [types.SET_ALLDATA] (state,val) {
        state.allData = val;
    }
}