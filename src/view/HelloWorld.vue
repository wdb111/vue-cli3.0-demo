<template>
  <div class="hello">
    <h1>从这里开始创建Vue项目</h1>
    <div>{{nickName}}</div>
    <iframe id="ifa" ref="canvas" width="100%" height="1000" src="/pdf/web/viewer.html?file=/Git.pdf" frameborder="0" ></iframe>
  </div>
</template>

<script>
import { getUsers } from "@/api/load";
export default {
  name: "HelloWorld",
  data() {
    return {
      nickName: ""
    };
  },
  created() {
    getUsers().then(res => {
      this.nickName = res.data.nickName;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
 
</style>
<style scoped>
@import "./HelloWorld.less";
</style>
