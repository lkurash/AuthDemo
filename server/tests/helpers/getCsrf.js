export async function getCsrf(agent) {
  const res = await agent.get('/api/auth/login');
  const cookies = res.headers['set-cookie'] || [];
  const raw = cookies.find((c) => c.startsWith('XSRF-TOKEN=')) || '';
  const token = raw.split('XSRF-TOKEN=')[1]?.split(';')[0];
  return token || '';
}
