<template>
  <div>
    <h2>密钥测试</h2>
    
    <!-- 密钥进度显示 -->
    <div v-if="progress" class="progress-section">
      <h3>密钥收集进度</h3>
      <div class="progress-grid">
        <div class="progress-item">
          <strong>公钥:</strong> {{ progress.public_key.received_shares }}/{{ progress.public_key.total_expected }}
          <StatusBadge :status="progress.public_key.ready ? 'ready' : 'pending'" />
        </div>
        <div class="progress-item">
          <strong>私钥:</strong> {{ progress.secret_key.received_shares }}/{{ progress.secret_key.total_expected }}
          <StatusBadge :status="progress.secret_key.ready ? 'ready' : 'pending'" />
        </div>
        <div class="progress-item">
          <strong>伽罗瓦密钥:</strong> {{ progress.galois_keys.completed_keys }}/{{ progress.galois_keys.total_keys }}
          <StatusBadge :status="progress.galois_keys.ready ? 'ready' : 'pending'" />
        </div>
        <div class="progress-item">
          <strong>重线性化密钥:</strong> 
          <span v-if="progress.relinearization_key.round1_ready">R1✓</span>
          <span v-if="progress.relinearization_key.round2_ready">R2✓</span>
          <StatusBadge :status="progress.relinearization_key.ready ? 'ready' : 'pending'" />
        </div>
      </div>
      <div class="overall-progress">
        <strong>总体进度:</strong> {{ progress.overall_progress }}%
        <StatusBadge :status="progress.all_keys_ready ? 'ready' : 'pending'" />
      </div>
    </div>
    
    <!-- 密钥测试 -->
    <div class="test-section">
      <button @click="testAll" :disabled="loading || !progress?.all_keys_ready">
        {{ loading ? '测试中...' : '测试所有密钥' }}
      </button>
      <KeyTestResultTable v-if="results" :testResults="results" />
    </div>
  </div>
</template>

<script>
import { testKeys, getKeyProgress } from '@/api/coordinator'
import KeyTestResultTable from '@/components/KeyTestResultTable.vue'
import StatusBadge from '@/components/StatusBadge.vue'

export default {
  name: 'KeyTest',
  components: { KeyTestResultTable, StatusBadge },
  data() {
    return {
      results: null,
      loading: false,
      progress: null
    }
  },
  async mounted() {
    await this.fetchProgress()
  },
  methods: {
    async fetchProgress() {
      try {
        const res = await getKeyProgress()
        this.progress = res.data
      } catch (e) {
        console.error('获取密钥进度失败:', e)
      }
    },
    async testAll() {
      this.loading = true
      try {
        const res = await testKeys({ 
          test_types: ['public_key', 'relinearization_key', 'galois_keys'] 
        })
        this.results = res.data.test_results
      } catch (e) {
        alert('测试失败: ' + (e.response?.data?.message || e.message))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.progress-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 15px 0;
}
.progress-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.overall-progress {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 10px;
}
.test-section {
  margin-top: 20px;
}
</style>
