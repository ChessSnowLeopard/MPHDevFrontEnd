<template>
  <span :class="['status-badge', statusClass]">{{ label }}</span>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: { 
      type: String, 
      required: true,
      validator: function(value) {
        return ['online', 'offline', 'passed', 'failed', 'pending', 'ready'].includes(value);
      }
    }
  },
  computed: {
    statusClass() {
      switch (this.status) {
        case 'online': return 'badge-online'
        case 'offline': return 'badge-offline'
        case 'passed': return 'badge-passed'
        case 'failed': return 'badge-failed'
        case 'pending': return 'badge-pending'
        case 'ready': return 'badge-ready'
        default: return 'badge-default'
      }
    },
    label() {
      switch (this.status) {
        case 'online': return '在线'
        case 'offline': return '离线'
        case 'passed': return '通过'
        case 'failed': return '失败'
        case 'pending': return '等待中'
        case 'ready': return '就绪'
        default: return this.status
      }
    }
  }
}
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #fff;
}
.badge-online { background: #4caf50; }
.badge-offline { background: #f44336; }
.badge-passed { background: #2196f3; }
.badge-failed { background: #ff9800; }
.badge-pending { background: #9e9e9e; }
.badge-ready { background: #4caf50; }
.badge-default { background: #9e9e9e; }
</style>
