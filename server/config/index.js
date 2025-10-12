export default function loadConfig() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT || 4000);
  const corsOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ];
  return {
    isProd,
    port,
    cors: {
      origins: corsOrigins,
      credentials: true,
    },
    cookies: {
      sameSite: 'lax',
      secure: isProd,
    },
    csrf: {
      sameSite: 'lax',
      secure: isProd,
      headerName: 'X-XSRF-TOKEN',
      cookieName: 'XSRF-TOKEN',
    },
  };
}
