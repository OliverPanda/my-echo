import fetch from 'src/config/fetch'

export default {
    async getBanner({commit,state}) {
        let res = fetch('banner')
        return res
    }

}