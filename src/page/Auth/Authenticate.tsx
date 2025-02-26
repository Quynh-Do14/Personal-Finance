import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

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
        localStorage.setItem('token', JSON.stringify({ refreshToken, accessToken }));
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
    <div>
      <h1>Vui lòng chờ</h1>
    </div>
  )
}

export default Authenticate
