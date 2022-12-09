import { useRef, useState, useEffect, useContext  } from 'react';

import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// imorting axios
import axios from '../../../api/axios';
import AuthContext from "../../../context/AuthProvider";

// ----------------------------------------------------------------------

const LOGIN_URL = 'http://localhost:3000/login';




export default function LoginForm() {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);

  const { setAuth } = useContext(AuthContext);


  const userRef = useRef();
  const errRef = useRef();

  const [email,setEmail] = useState('')
  const [pwd,setPwd] = useState('')
  const [errMsg,seterrMsg] = useState('')
  const [success, setSuccess] = useState('')


  useEffect(() => {
    userRef.current.focus();
}, [])

  useEffect(() => {
    seterrMsg('');
  }, [email,pwd])


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email,pwd);
    try{
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    console.log(JSON.stringify(response?.data));
  
    // console.log(JSON.stringify(response));
  
    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
    setAuth({ email, pwd, roles, accessToken });
    setEmail('');
    setPwd('');
     // setSuccess(true);
     navigate('/dashboard', { replace: true });
  
    }
    catch(err){
    if (!err?.response) {
                seterrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                  seterrMsg('Missing Username or Password');
                } else if (err.response?.status === 401) {
                  seterrMsg('Unauthorized');
                } else {
                  seterrMsg('Login Failed');
                }
                errRef.current.focus();
            }

  }






  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  return (
    <>
     
              <section>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"  style={{color: "red"}}> {errMsg}</p>
        <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField 
          name="email" 
          label="Email address"
          ref={userRef}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          
           />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}> */}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" >
          Login
        </LoadingButton>
      </form>
      </section>
           
     
    </>
  );
}
