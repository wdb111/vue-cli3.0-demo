<template>
  <div class="hello">
    <h1>从这里开始创建Vue项目</h1>
    <div>{{nickName}}</div>
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
<style scoped>
</style>
