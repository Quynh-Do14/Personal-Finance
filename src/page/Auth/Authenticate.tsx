import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';

const Authenticate = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const baseURL = process.env.REACT_APP_BASE_URL
  useEffect(() => {
    console.log("window.location.href: ", window.location.href);

    const accessTokenRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    console.log("isMatch: ", isMatch);

    if (isMatch) {
      const authCode = isMatch[1];
      axios.post(`${baseURL}/auth/oauth2/authentication?code=${authCode}`, {
        code: authCode
      }).then((response) => {
        console.log("response: ", response);
        const { refreshToken, accessToken } = response.data;
        Cookies.set('token', JSON.stringify({ refreshToken, accessToken }));
        setIsLoggedin(true);
      }).catch((error) => {
        console.log("error: ", error);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <div className="authenticate">
      <div className="loading-card">
        <div className="spinner" />
        <p className="loading-text">Vui lòng chờ<br />Đang đăng nhập bằng Google...</p>
      </div>
    </div>
  )
}

export default Authenticate
