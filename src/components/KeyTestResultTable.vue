<template>
  <table class="keytest-table">
    <thead>
      <tr>
        <th>测试类型</th>
        <th>状态</th>
        <th>消息</th>
        <th>测试时间</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(result, testType) in testResults" :key="testType">
        <td>{{ testType }}</td>
        <td><StatusBadge :status="result.status" /></td>
        <td>{{ result.message }}</td>
        <td>{{ result.test_time }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import StatusBadge from './StatusBadge.vue'
export default {
  name: 'KeyTestResultTable',
  components: { StatusBadge },
  props: {
    testResults: { 
      type: Object, 
      required: true,
      // 验证数据结构为 map[string]KeyTestResult
      validator: function(value) {
        return Object.values(value).every(result => 
          typeof result.status === 'string' && 
          typeof result.message === 'string' && 
          typeof result.test_time === 'string'
        );
      }
    }
  }
}
</script>

<style scoped>
.keytest-table {
  width: 100%;
  border-collapse: collapse;
}
.keytest-table th, .keytest-table td {
  border: 1px solid #eee;
  padding: 6px 10px;
  text-align: center;
}
</style>
