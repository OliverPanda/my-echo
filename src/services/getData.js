import fetch from '@/config/fetch'

let rootUrl = 'http://localhost:8089'
export const getBanner = () => fetch(rootUrl + '/banner', {
    
})

export const getHot = () => fetch(rootUrl + '/recommend', {

})