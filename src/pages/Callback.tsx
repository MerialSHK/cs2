import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

export function Callback() {
  const { handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback();
        navigate('/dashboard');
      } catch (error) {
        console.error('Error handling callback:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return <LoadingSpinner />;
}