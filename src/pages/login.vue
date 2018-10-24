<template>
    <div class="main">
      <i-panel title="用户登陆">
      <i-input  title="用户名" autofocus placeholder="请输入用户名" maxlength="50" />
      <i-input type="password" title="密码" placeholder="请输入密码" maxlength="50" />
      <i-input   title="验证码" placeholder="请输入验证码" maxlength="6" />
     <i-button type="primary" @click="login">登陆</i-button>
      </i-panel>
    </div>
</template>
<script>
import { get } from "@/http/api";
export default {
  data() {
    return {
      value3: "",
      value4: "被禁用的INPUT"
    };
  },
  methods: {
    login() {
      var params = {};
      params.url = "/Blog?page=1&bcategory=技术博文";
      get(params).then(res => {
        let msg = res.data.data[0].btitle;
        // 引入了mpvue-router-patch依赖，兼容vue-router的写法，让写法更“vue”，以及为转换h5做铺垫
        //this.$router.push({path:'/pages/index',query:{msg}})
        wx.switchTab({ url: "/pages/index" });
      });
    }
  }
};
</script>
