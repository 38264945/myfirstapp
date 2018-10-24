
<template>
    <div class="main">
        <input type="text" placeholder="填入你想传至hello页的信息" v-model.lazy="msg">
        <button @click="toChild">去hello页面</button>       
        <i-button @click="login" type="primary">{{loginname}}</i-button>
        <c-test :date="date">子组件</c-test>
        <div>子页面，传入的消息为：{{msg}}
  </div>
    </div>
</template>
<script>
import { get } from "@/http/api";
import cTest from "@/components/c-test";
export default {
  data() {
    return {
      msg: "",
      loginname: "登录",
      date: ""
    };
  },
  components: {
    cTest
  },
  methods: {
    toChild() {
      let msg = this.msg;
      // 引入了mpvue-router-patch依赖，兼容vue-router的写法，让写法更“vue”，以及为转换h5做铺垫
       this.$router.push({ path: "/pages/hello", query: { msg } });
    },
    login() {
      var params = {};
      params.url = "/Blog?page=1&bcategory=技术博文";
      get(params).then(res => {
        this.msg = res.data.data[0].btitle;
      });
    }
  },
  onLoad() {
    // query需要在onLoad周期内获取
    this.date = new Date();
    let query = this.$route.query;
    console.log(query);
    this.msg = query.msg;
  },
  created() {
    console.log(3);
  }
}
</script>

<style scoped lang="scss">
.main {
}
</style>