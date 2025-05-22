import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import ToastAlert from '../components/ToastAlert';
import Detector from '../components/Detector';
import './LoginPage.css';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="kb-login-wrapper">
      <Detector />
      <div className="kb-login-box">
        <div className="kb-login-header">KB스타뱅킹 로그인</div>
        <LoginForm
          userId={userId}
          setUserId={setUserId}
          password={password}
          setPassword={setPassword}
          setToast={setToast}
          setLoading={setLoading}
        />
        {toast && <ToastAlert message={toast} />}
        {loading && <div className="loading">로그인 중...</div>}
      </div>
    </div>
  );
};

export default LoginPage;
