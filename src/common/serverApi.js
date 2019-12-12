

export default {
    getUserInfo: {
        name: '获取当前登陆信息',
        url: '/vote-sys-v1/account/login',
        method: 'GET',
        params: {}
    },
    getStarList: {
        name: '首页加载名星列表信息',
        url: '/vote-sys-v1/star/list',
        method: 'GET',
        params: {}
    },
    getStarFansList: {
        name: '当前名星投票数的粉丝排行',
        url: '/vote-sys-v1/star/fans/list',
        method: 'GET',
        params: {}
    },
    saveStarVote: {
        name: '为自己喜欢的名星投票',
        url: '/vote-sys-v1/star/vote',
        method: 'GET',
        params: {}
    },
    getPersonStarList: {
        name: '选择对应的名星，显示出名星折线图',
        url: '/vote-sys-v1/person/star/graph',
        method: 'GET',
        params: {}
    },
    getPersonVoteInfo: {
        name: '选择对应的名星，显示出名星饼状图',
        url: '/vote-sys-v1/person/vote/info',
        method: 'GET',
        params: {}
    },
    getIdolLimit: {
        name: '判断是否具有爱豆权',
        url: '/vote-sys-v1/idol/limit',
        method: 'GET',
        params: {}
    },
    saveIdolMessage: {
        name: '保存爱豆寄语',
        url: '/vote-sys-v1/idol/message',
        method: 'GET',
        params: {}
    },
    saveIdolFlock: {
        name: '爱豆社群（用户发布社群）',
        url: '/vote-sys-v1/idol/flock',
        method: 'POST',
        params: {}
    },
    saveIdolImage: {
        name: '爱豆爱豆图像（用户设置明星头像）',
        url: '/vote-sys-v1/idol/image',
        method: 'POST',
        params: {}
    },
    updateUserByUserName: {
        name: '获取用户的基本信息',
        url: '/vote-sys-v1/person/update/user_name',
        method: 'POST',
        params: {}
    },
    getUserMessage: {
        name: '查询用户私信信息',
        url: '/vote-sys-v1/account/user_message',
        method: 'POST',
        params: {}
    },
    updateMessageById: {
        name: '更新用户私信状态',
        url: '/vote-sys-v1/account/read_message',
        method: 'POST',
        params: {}
    },
    sendVerifyCode: {
        name: '发送短信',
        url: '/vote-sys-v1/account/send_verify_code',
        method: 'POST',
        params: {}
    }
}