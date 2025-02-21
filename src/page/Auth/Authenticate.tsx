import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Authenticate: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = React.useState(false);

  React.useEffect(() => {
    console.log("window.location.href: ", window.location.href);
    
    const accessTokenRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    console.log("isMatch: ", isMatch);

    if (isMatch) {
      const authCode = isMatch[1];
      axios.post(`http://localhost:8080/auth/oauth2/authentication?code=${authCode}`, {
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

  React.useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <div>
      <h1>Đây là authenticate</h1>
    </div>
  )
}

export default Authenticate
