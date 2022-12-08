import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { setUserSession } from '../../../utils/common';
// components
import Iconify from '../../../components/iconify';




// ----------------------------------------------------------------------

export default function LoginForm(props) {


  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);

  

  

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleSubmit =  () => {

    
    // e.preventDefault();

    setError (null);
    setLoading(true);

    axios.post('https://dummyjson.com/users', {email, password})
    .then(response =>{
      
      setLoading(false);
      setUserSession(response.data.token, response.data.user)
      
      // navigate('/dashboard', { replace: true });
      props.history.push('/dashboard')
      
      

    }).catch(error => {
     
      setLoading(false);
      if(error.response.status ===401 || error.response.status ===400){
        setError(error.response.data.message);

      }
      else{
        setError("something went wrong. please try again")
      }
      // console.error('error  >>>', error);
    });
    // navigate('/dashboard', { replace: true });
  };








  return (
    <>
    {error && <div className = "error"  style={{color: "red"}}>{error}</div>}
    
      <Stack spacing={3}>
        <TextField 
        name="email" 
        label="Email address"
        value = {email}
        onChange = {e => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value = {password}
         onChange = {e => setPassword(e.target.value)}
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained"  value = {loading ? "Loading...": "LoginForm"} disabled = {loading} onClick={handleSubmit} >
        Login
      </LoadingButton>
      
    </>
  );
}
