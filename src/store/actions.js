import { fetch } from 'src/config/fetch'
import { GET_BANNER,GET_HOT } from './mutations-type'

export default {
    async getBanner({commit,state}) {
        let res = await fetch('GET','banner')
        return res
        

    },
    async getHot({commit,state}) {
        let res = await fetch('GET','recommend')
        return res
    },

    
    
}