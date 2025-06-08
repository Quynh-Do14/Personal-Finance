import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies, { CookieAttributes } from 'js-cookie';

const TOKEN_COOKIE_OPTIONS: CookieAttributes = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  expires: 7, // 7 ngày
};

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
      }).then((response: any) => {
        if (response?.accessToken && response?.refreshToken) {
          Cookies.set('accessToken', response.accessToken, TOKEN_COOKIE_OPTIONS);
          Cookies.set('refreshToken', response.refreshToken, TOKEN_COOKIE_OPTIONS);

        }
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
