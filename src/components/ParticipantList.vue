<template>
  <table class="participant-list">
    <thead>
      <tr>
        <th>ID</th>
        <th>URL</th>
        <th>状态</th>
        <th>最后心跳</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in participants" :key="p.id">
        <td>{{ p.id }}</td>
        <td>{{ p.url || '-' }}</td>
        <td><StatusBadge :status="p.status" /></td>
        <td>{{ p.last_heartbeat || '-' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import StatusBadge from './StatusBadge.vue'
export default {
  name: 'ParticipantList',
  components: { StatusBadge },
  props: {
    participants: { 
      type: Array, 
      required: true,
      // 验证数据结构为 ParticipantStatus[]
      validator: function(value) {
        return value.every(p => 
          typeof p.id === 'number' && 
          typeof p.url === 'string' && 
          typeof p.status === 'string' && 
          typeof p.last_heartbeat === 'string'
        );
      }
    }
  }
}
</script>

<style scoped>
.participant-list {
  width: 100%;
  border-collapse: collapse;
}
.participant-list th, .participant-list td {
  border: 1px solid #eee;
  padding: 6px 10px;
  text-align: center;
}
</style>
