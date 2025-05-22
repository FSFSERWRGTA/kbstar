import React from 'react';
import { useNavigate } from 'react-router-dom';
import './KBLayout.css'; // KBLayout.jsx 상단에 추가

const KBLayout = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="kb-wrapper">
      <header className="kb-header">
        <div className="kb-logo">KB스타뱅킹</div>
        <nav className="kb-nav">
          <ul>
            <li>홈</li>
            <li>금융상품</li>
            <li>고객센터</li>
            <li>이벤트</li>
          </ul>
        </nav>
      </header>

      <section className="kb-banner">
        <h2>믿을 수 있는 금융 파트너</h2>
        <p>KB스타뱅킹과 함께 안전하고 빠르게</p>
        <button onClick={handleLoginClick}>로그인</button>
      </section>

      <section className="kb-icons">
        <div className="icon-box">계좌조회</div>
        <div className="icon-box">이체</div>
        <div className="icon-box">카드</div>
        <div className="icon-box">대출</div>
      </section>

      <footer className="kb-footer">
        <p>© 2025 KB국민은행 (교육용 모사 페이지)</p>
      </footer>
    </div>
  );
};

export default KBLayout;
