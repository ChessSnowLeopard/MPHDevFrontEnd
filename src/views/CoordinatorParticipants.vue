<template>
  <div>
    <h2>参与方管理</h2>
    <div v-if="participantsData" class="summary">
      <span>总数: {{ participantsData.total_participants }}</span>
      <span>在线: {{ participantsData.online_participants }}</span>
      <span>离线: {{ participantsData.offline_participants }}</span>
    </div>
    <ParticipantList v-if="participantsData" :participants="participantsData.participants" />
    <div v-else class="loading">
      加载中...
    </div>
  </div>
</template>

<script>
import { getCoordinatorParticipants } from '@/api/coordinator'
import ParticipantList from '@/components/ParticipantList.vue'

export default {
  name: 'CoordinatorParticipants',
  components: { ParticipantList },
  data() {
    return {
      participantsData: null
    }
  },
  async mounted() {
    await this.fetchParticipants()
  },
  methods: {
    async fetchParticipants() {
      try {
        const res = await getCoordinatorParticipants()
        this.participantsData = res.data
      } catch (e) {
        console.error('获取参与方列表失败:', e)
        alert('获取参与方列表失败: ' + (e.response?.data?.message || e.message))
      }
    }
  }
}
</script>

<style scoped>
.summary span {
  margin-right: 20px;
  font-weight: bold;
}
.loading {
  text-align: center;
  color: #666;
  margin-top: 20px;
}
</style>
