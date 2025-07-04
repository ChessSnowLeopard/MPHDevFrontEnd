<template>
  <div>
    <h2>密钥收集进度</h2>
    
    <div v-if="progress" class="progress-container">
      <!-- 公钥进度 -->
      <div class="key-section">
        <h3>公钥收集</h3>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: publicKeyPercent + '%' }"></div>
        </div>
        <div class="progress-info">
          <span>{{ progress.public_key.received_shares }}/{{ progress.public_key.total_expected }}</span>
          <StatusBadge :status="progress.public_key.ready ? 'ready' : 'pending'" />
        </div>
      </div>

      <!-- 私钥进度 -->
      <div class="key-section">
        <h3>私钥收集</h3>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: secretKeyPercent + '%' }"></div>
        </div>
        <div class="progress-info">
          <span>{{ progress.secret_key.received_shares }}/{{ progress.secret_key.total_expected }}</span>
          <StatusBadge :status="progress.secret_key.ready ? 'ready' : 'pending'" />
        </div>
      </div>

      <!-- 伽罗瓦密钥进度 -->
      <div class="key-section">
        <h3>伽罗瓦密钥收集</h3>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: galoisKeysPercent + '%' }"></div>
        </div>
        <div class="progress-info">
          <span>{{ progress.galois_keys.completed_keys }}/{{ progress.galois_keys.total_keys }}</span>
          <StatusBadge :status="progress.galois_keys.ready ? 'ready' : 'pending'" />
        </div>
      </div>

      <!-- 重线性化密钥进度 -->
      <div class="key-section">
        <h3>重线性化密钥收集</h3>
        <div class="round-status">
          <div class="round-item">
            <span>第一轮:</span>
            <StatusBadge :status="progress.relinearization_key.round1_ready ? 'ready' : 'pending'" />
          </div>
          <div class="round-item">
            <span>第二轮:</span>
            <StatusBadge :status="progress.relinearization_key.round2_ready ? 'ready' : 'pending'" />
          </div>
        </div>
        <div class="progress-info">
          <StatusBadge :status="progress.relinearization_key.ready ? 'ready' : 'pending'" />
        </div>
      </div>

      <!-- 总体进度 -->
      <div class="overall-section">
        <h3>总体进度</h3>
        <div class="progress-bar">
          <div class="progress-fill overall" :style="{ width: progress.overall_progress + '%' }"></div>
        </div>
        <div class="progress-info">
          <span>{{ progress.overall_progress }}%</span>
          <StatusBadge :status="progress.all_keys_ready ? 'ready' : 'pending'" />
        </div>
      </div>
    </div>

    <div v-else class="loading">
      加载密钥进度中...
    </div>
  </div>
</template>

<script>
import { getKeyProgress } from '@/api/coordinator'
import StatusBadge from '@/components/StatusBadge.vue'

export default {
  name: 'KeyProgress',
  components: { StatusBadge },
  data() {
    return {
      progress: null
    }
  },
  computed: {
    publicKeyPercent() {
      if (!this.progress) return 0
      return Math.round((this.progress.public_key.received_shares / this.progress.public_key.total_expected) * 100)
    },
    secretKeyPercent() {
      if (!this.progress) return 0
      return Math.round((this.progress.secret_key.received_shares / this.progress.secret_key.total_expected) * 100)
    },
    galoisKeysPercent() {
      if (!this.progress) return 0
      return Math.round((this.progress.galois_keys.completed_keys / this.progress.galois_keys.total_keys) * 100)
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
        alert('获取密钥进度失败: ' + (e.response?.data?.message || e.message))
      }
    }
  }
}
</script>

<style scoped>
.progress-container {
  max-width: 800px;
  margin: 0 auto;
}

.key-section, .overall-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s ease;
}

.progress-fill.overall {
  background: #2196f3;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.round-status {
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

.round-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.loading {
  text-align: center;
  color: #666;
  margin-top: 20px;
}
</style> 