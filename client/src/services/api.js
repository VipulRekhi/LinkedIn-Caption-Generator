import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
});

export async function generateCaption(prompt) {
  const { data } = await api.post('/generate', { prompt });
  return data.caption;
}

export async function fetchHistory() {
  const { data } = await api.get('/history');
  return data;
}

export default api;
