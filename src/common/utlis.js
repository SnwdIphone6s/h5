
/**
 * 判断是否是实体类
 * @param {*} entity 
 */
function isResultSuccess(entity) {
    if (entity && entity != null && entity["data"] && entity["data"]["success"]) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 */
function httpStatus_200(http) {
    if (http && parseInt(http.status) == 200 && http.statusText && http.statusText == "OK") {
        return true
    } else {
        return false
    }
}

/**
 * 获取data数据
 * @param {*} entity 
 */
function getResultData(entity) {
    if (entity["data"] && entity["data"]["data"] && entity["data"]["data"].length > 0) {
        return entity["data"]["data"]
    } else {
        return undefined;
    }
}

/**
 * 获取page数据
 * @param {*} entity 
 */
function getResultPage(entity) {
    if (entity["data"] && entity["data"]["page"] && Object.getOwnPropertyNames(entity["data"]["page"]).length > 0) {
        return entity["data"]["page"];
    } else {
        return undefined
    }
}

function getData(entity) {
    if (entity && entity["data"]) {
        return entity["data"];
    } else {
        return undefined
    }
}

module.exports = {
    isResultSuccess,
    getResultData,
    getResultPage,
    getData,
    httpStatus_200
}