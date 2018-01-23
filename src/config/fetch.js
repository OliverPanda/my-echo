import Vue from 'vue'
import axios from 'axios'
// qs库，能够解析表单中提交的参数
import qs from 'qs'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8089/'

export const fetch = async(type='GET',url = '',data = {}) => {
    let result = ''
    type = type.toUpperCase()
    if(type === 'GET') {
        await axios.get(url,{ params: data })
        .then(res => {
            result = res.data
        })
    } else {
        await axios.post(url,qs.stringify(data))
        .then(res => {
            result = res.data
        })
    }
    return result
} 

