import axios from "axios";
import Qs from 'qs';

export const Request = (url, param, medthod) => {
    // @ts-ignore
    //url = isMock != "dev" ? `mock${url}` : url;
    axios.defaults.withCredentials = true;
    return axios({
        method: medthod ? medthod : "POST",
        url,
        params: param ? param : {},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": 'true'
        },
        withCredentials: true
    });
}

export const RequestPost = (url, data) => {
    // @ts-ignore
    //url = isMock != "dev" ? `mock${url}` : url;
    axios.defaults.withCredentials = true;
    return axios({
        method: "POST",
        url,
        data: data ? data : {},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": 'true',
        },
        withCredentials: true
    });
}

export const Ajax = (url) => {
    var xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容
    // 前端设置是否带cookie
    xhr.withCredentials = true;
    xhr.responseType = 'json';
    xhr.open("get", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://122.14.199.232:8090');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
}

export const AxiosPost = (url, param) => {
    axios.defaults.withCredentials = true;
    axios(url, {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': 'http://122.14.192.9:8080',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true
        },
        data: param,
        withCredentials: true,
    }).then(response => {
        console.log(response)
    })
}

