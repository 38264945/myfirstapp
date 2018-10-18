//引入 fly
var Fly = require("flyio/dist/npm/wx")
var fly = new Fly;
var logininit=new Fly;
import config from '@/config'
//配置请求基地址
// //定义公共headers
// fly.config.headers={xx:5,bb:6,dd:7}
// //设置超时
fly.config.timeout = 30000;
// //设置请求基地址
fly.config.baseURL = config.host

//添加请求拦截器
fly.interceptors.request.use((request) => {
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    console.log(request);
    if (wx.getStorageSync('token')) { //检查本地缓存是否有token存在没有则重新获取
        request.headers = { //设置请求头
            "content-type": "application/json",
            "cld.stats.page_entry": wx.getStorageSync('scene'),
            "version": 1,
            "token": wx.getStorageSync('token'),
            "Authorization":wx.getStorageSync('token')
        }
        return request;
    } else {
        if (request.url != "/Login/Token?name=admins&pass=admins") {
            fly.lock(); //锁住请求
            return logininit.get("/Login/Token?name=admins&pass=admins").then(res => { //重新获取token             
                wx.setStorageSync("scene", "1")
                wx.setStorageSync("token", res.data.data.token);
                request.timeout = 30000,
                    request.headers = { //设置请求头
                        "content-type": "application/json",
                        "cld.stats.page_entry": wx.getStorageSync('scene'),
                        "version":1,
                        "token": wx.getStorageSync('token'),
                        "Authorization":wx.getStorageSync('token')
                    }              
                fly.unlock(); //解锁请求
                return request; //继续之前的请求
            })
        }
    }
})

fly.interceptors.response.use(
    (response) => {
        wx.hideLoading();
        return response; //请求成功之后将返回值返回
    },
    (err) => {
        //请求出错，根据返回状态码判断出错原因
        console.log(err)
        wx.hideLoading();
        if (err.status == 0) {
            return "网络连接异常"
        } else if (err.status == 1) {
            return "网络连接超时"
        } else if (err.status == 401) {
            return "用户未登录"
        } else {
            if (err.response.data.message) {
                return err.response.data.message
            } else {
                return '请求数据失败,请稍后再试'
            }
        };
        // Do something with response error
    }
)

logininit.config.timeout = 30000;
// //设置请求基地址
logininit.config.baseURL = config.host;
// Vue.prototype.$http=fly //将fly实例挂在vue原型上

export default fly