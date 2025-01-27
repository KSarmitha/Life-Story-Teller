import React from 'react';
import { useLocation } from 'react-router-dom';

export const Landing = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>`Welcome: Hello {user?.name}`</div>
  )
}
