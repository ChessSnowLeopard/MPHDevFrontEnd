<template>
  <div>
    <div style="margin-bottom: 20px;">
      <label>
        参与方数量：
        <input v-model.number="participantCount" type="number" min="1" style="width: 60px;" />
      </label>
      <label style="margin-left: 20px;">
        数据集划分方式：
        <select v-model="dataSplitType">
          <option value="horizontal">horizontal</option>
          <option value="vertical">vertical</option>
        </select>
      </label>
      <button @click="submitStart">启动协调器</button>
    </div>
    
    <h2>协调器状态</h2>
    <div v-if="status" class="status-info">
      <div class="status-item">
        <strong>协调器ID:</strong> {{ status.coordinator_id }}
      </div>
      <div class="status-item">
        <strong>预期参与方数量:</strong> {{ status.expected_participants }}
      </div>
      <div class="status-item">
        <strong>数据集划分方式:</strong> {{ status.data_split_type }}
      </div>
      <div class="status-item">
        <strong>状态:</strong> <StatusBadge :status="status.status" />
      </div>
      <div class="status-item">
        <strong>协调器IP:</strong> {{ status.coordinator_ip }}
      </div>
      <div class="status-item">
        <strong>协调器端口:</strong> {{ status.coordinator_port }}
      </div>
      <div class="status-item">
        <strong>启动时间:</strong> {{ status.start_time }}
      </div>
    </div>
    
    <div v-else class="no-status">
      未启动协调器，请先设置参数并启动
    </div>
  </div>
</template>

<script>
import { startCoordinator, getCoordinatorStatus } from '@/api/coordinator'
import StatusBadge from '@/components/StatusBadge.vue'

export default {
  name: 'CoordinatorDashboard',
  components: { StatusBadge },
  data() {
    return {
      participantCount: 1,
      dataSplitType: 'horizontal',
      status: null
    }
  },
  methods: {
    async submitStart() {
      try {
        const res = await startCoordinator({
          participant_count: this.participantCount,
          data_split_type: this.dataSplitType
        });
        alert('启动成功: ' + res.data.message);
        await this.fetchStatus();
      } catch (e) {
        alert('启动失败: ' + (e.response?.data?.message || e.message));
      }
    },
    async fetchStatus() {
      try {
        const res = await getCoordinatorStatus();
        this.status = res.data;
      } catch (e) {
        console.error('获取状态失败:', e);
      }
    }
  },
  mounted() {
    this.fetchStatus();
  }
}
</script>

<style scoped>
.status-info {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}
.status-item {
  margin-bottom: 10px;
}
.no-status {
  color: #666;
  font-style: italic;
  margin-top: 20px;
}
</style>
