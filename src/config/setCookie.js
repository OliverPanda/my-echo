/**
 * 
 * @param {设置的缓存的名称} name 
 * @param {缓存的值} val 
 */
export const setStore = (name,val) => {
    if (!name) {
        return
    }
    if (typeof val !=='string') {
        val = JSON.stringify(val)
    }
    window.localStorage.setItem(name,val)
}

export const getStore = name => {
    if (!name) {
        return
    }
    return window.localStorage.getItem(name)
}

export const deleteStore = name => {
    if (!name) {
        return
    }
    window.localStorage.removeItem(name)
}
