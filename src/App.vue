<template>
  <div id="app">
    <h1>欢迎使用加密协调器系统</h1>
    <nav style="margin-bottom: 24px;">
      <router-link to="/">首页</router-link> |
      <router-link to="/participants">参与者列表</router-link> |
      <router-link to="/key-progress">密钥进度</router-link> |
      <router-link to="/keytest">密钥测试</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
nav {
  margin-bottom: 24px;
}
nav a {
  color: #42b983;
  text-decoration: none;
  margin: 0 8px;
}
nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style> 