import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/'
});

export default instance;

// 1.1 启动协调器
export function startCoordinator(data) {
  // data: { participant_count: int, data_split_type: string }
  return instance.post('/api/coordinator/start', data);
}

// 1.2 查看参与方进度与状态
export function getCoordinatorStatus() {
  return instance.get('/api/coordinator/status');
}

// 1.3 查看密钥收集与测试进度
export function getKeyProgress() {
  return instance.get('/api/coordinator/key-progress');
}

// 1.4 密钥功能测试
export function testKeys(data) {
  // data: { test_types: [string] }
  return instance.post('/api/coordinator/test-keys', data);
}

// 1.5 参与方管理
export function getCoordinatorParticipants() {
  return instance.get('/api/coordinator/participants');
}