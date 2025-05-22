import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="logo">놈삐</div>
      <h2>놈삐에 오신 걸 환영합주다!</h2>
      <p>로그인을 통해 더 많은 기능을 이용하실 수 있수다.</p>
      <button onClick={handleStart}>로그인하러 가기</button>
    </div>
  );
};

export default Home;