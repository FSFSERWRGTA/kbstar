// src/components/NomppiKBPage.jsx

import React from "react";

const NomppiKBPage = () => {
  return (
    <iframe
      src="/KB국민은행.html"
      title="KB 국민은행"
      style={{
        width: '10000px',
        height: '1000px', // 적당히 보기 좋은 높이
        border: 'none',
        maxWidth: '100%',
        overflow: 'auto',
      }}
    />
  );
};

export default NomppiKBPage;
