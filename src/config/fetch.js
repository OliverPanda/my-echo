export default async (ulr='', data={}, type='GET', method='fetch') => {
    type = type.toUpperCase();
    if(type === 'GET') {
        let dataStr = '';
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        });
        if(dataStr !== '') {
            dataStr = dataStr.substr(0,dataStr.lastIndexOf('&'));
            url = url += dataStr;
        }
    }

    if(window.fetch && method === 'fetch') {
        let fetchHeader = {
            // cookie能同域和跨域发送， 默认值是omit忽略cookie发送， same-origin: 只能同域不能跨域发送cookie 
            crediential: 'include',
            mode: 'cors',
            // force-cache 没有缓存的话，正常发生request，有缓存不管缓存有没有过期都读取缓存
            cache: 'force-cache',
            method: type,
            // 常规http头
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        if(type === 'POST') {
            Object.defineProperty(fetchHeader,'body',{
                value: JSON.stringify(data)
            })
        } else {
            return new Promise((resolve,reject) => {
                let xhr;
                if(window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest(); 
                } else {
                    xhr = new ActiveXObject;
                }
                xhr.open(type,url,true);
                let senData = '';
                if(type === 'POST') {
                    sendData = JSON.stringify(data);
                }
                xhr.setRequestHeader('Content-Type', 'application/x-www.form-urlencoded');
                xhr.send(sendData);

                xhr.onreadystatechange = () => {
                    if(xhr.readystate === 4){
                        if(xhr.readystate === 200) {
                            // 相应成功且数据正确
                            let res = xhr.response;
                            if(typeof res !== 'object') {
                                res = JSON.parse(res);
                            }
                            resolve(xhr);

                        }
                    } else {
                        reject(xhr);
                    }
                }
            })
        }
    }
}