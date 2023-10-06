import { useState } from 'react';
import bg from '../../assets/cosmo.jpg';
import logo from './assets/cosmo.png';
import { Login } from '../../services/app.services';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

function LoginPage() {
    const nav = useNavigate()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [open,setOpen] = useState()
    const [msg,setMsg] = useState()
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(email,password)
        const user = Login(email,password,nav,setOpen,setMsg)
        if(!user){
            return console.log('not signed')
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };
    return ( 
        <div style={{backgroundImage: `url(${bg})`}} className='bg-cover bg-center h-screen'>
            <div className='bg-opacity-30 h-full p-10 backdrop-blur-sm bg-white'>
                <div className=''>
                    <img src={logo} className='w-36' />
                </div>
                <div className='flex h-[80vh] justify-center items-center'>
                    <form className="form" onSubmit={handleSubmit}>
                        <p className="form-title">Sign in to your account</p>
                            <div className="input-container">
                                <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                            <span>
                            </span>
                        </div>
                        <div className="input-container">
                            <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="submit">
                            Sign in
                        </button>
                    </form>
                </div>
                <div className='text-gray-800'>
                    &copy; Cosmo Cinemas
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert onClose={handleClose} severity="error" sx={{ width: 500 }}>
                    <h1 className="font-semibold text-xl">{msg}</h1>
                </Alert>
            </Snackbar>
        </div>
    );
}

export default LoginPage;