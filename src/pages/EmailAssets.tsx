import { useEffect } from 'react';

export default function EmailAssets() {
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
      padding: '0',
      margin: '0'
    }}>
      <img src="/email/preview.jpg" alt="" style={{ display: 'block' }} />
      <img src="/email/logo.png" alt="" style={{ display: 'block' }} />
    </div>
  );
}
