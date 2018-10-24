module.exports = [
  {
    path: 'pages/login' ,// 页面路径，同时是 vue 文件相对于 src 的路径
    config: { // 页面配置，即 page.json 的内容，可选
      navigationBarTitleText: '登陆',
      usingComponents:{      
        "i-button": "../../iView/button/index",
        "i-row": "../../iView/row/index",
         "i-col": "../../iView/col/index",
         "i-input": "../../iView/input/index",
         "i-panel": "../../iView/panel/index"
      }
    }
  },
  {
    path: 'pages/index' ,// 页面路径，同时是 vue 文件相对于 src 的路径
    config: { // 页面配置，即 page.json 的内容，可选
      navigationBarTitleText: '首页',
      usingComponents:{      
        "i-button": "../../iView/button/index"
      }
    }
  },
  {
    path: 'pages/hello'
  },
  {
    path: 'pages/me',
    config: { // 页面配置，即 page.json 的内容，可选
      navigationBarTitleText: '文章列表',
      usingComponents:{
        "i-card": "../../iView/card/index",
        "i-button": "../../iView/button/index"
      }
    }
  }
]
