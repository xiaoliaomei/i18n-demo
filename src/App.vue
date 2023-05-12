<template>
  <div id="app">
    测试
    {{test}}
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
  },
  data(){
    return {
      test:'大赛项目仅超级管理员可删除'
    }
  },
  created(){
    // Message.info('大赛项目仅超级管理员可删除');
  }
};
</script>

<style>
#app{
  height: calc(100% - 1px);
}
</style>
