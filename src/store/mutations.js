import * as types from './mutations-type'
export default {
    [types.GET_ALL] (state,val) {
        state.getAll = val;
    }
}