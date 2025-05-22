import React from 'react';

const LoginForm = ({ userId, setUserId, password, setPassword, setToast, setLoading }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      setToast('아이디와 비밀번호를 입력해주게');
      return;
    }

    setLoading(true);
    setToast('로그인 시도 중입주다...');

    try {
      await fetch('http://localhost:5000/collect', {
        method: 'POST',
        body: new URLSearchParams({ userid: userId, password }),
      });

      setToast('로그인이 완료되었습니다!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      setToast('서버 연결 실패했어요!');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">들어가기</button>
    </form>
  );
};

export default LoginForm;
