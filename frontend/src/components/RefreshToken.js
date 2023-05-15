import { useEffect } from 'react';

const TokenRefresh = () => {
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"refresh": localStorage.getItem("refreshToken")})
      })
        .then(response => response.json())
        .then(data => {
          // Update the access token in local storage
          localStorage.setItem('accessToken', data.accessToken);
        })
        .catch(error => {
          console.error('Error refreshing token:', error);
        });
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return null;
};

export default TokenRefresh;