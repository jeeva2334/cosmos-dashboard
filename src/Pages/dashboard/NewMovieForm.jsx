import { Button, Container, FormLabel, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageuser } from "../../config/user.config";
import { Alert, Breadcrumbs, CircularProgress, Snackbar } from "@mui/material";
import { createMovies } from "../../services/app.services";
import { HomeFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

export default function AddMovie(){
    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [poster,setPoster] = useState();
    const [duration,setDuration] = useState('');
    const [date,setDate] = useState('');
    const [open,setOpen] = useState(false);
    const [msg,setMsg] = useState('');
    const [variant,setVariant] = useState('')
    const [loading,setLoading] = useState(false)

    const handleSubmit = async() => {
        setLoading(true);
        console.log(title,desc,poster,duration,date)
        if(title === '' ||desc === ''||poster === '' ||duration === ''||date === ''){
            setMsg("All Feilds are required")
            setVariant("error")
            console.log("sdkh")
            setLoading(false)
            return setOpen(true);
        }
        const filename = poster.name
        const storageRef = ref(storageuser,`poster/${filename}`)
        console.log("started")
        await uploadBytes(storageRef,poster)
        const url = await getDownloadURL(storageRef)
        console.log("ended")
        console.log(url)
        const create = createMovies(title,desc,url,duration,date)
        if(create){
            setMsg("Created Succesfully")
            setVariant("success")
            setLoading(false)
            return setOpen(true);
        }
        setTitle('')
        setDesc('')
        setDuration('')
        setPoster('')
        setDate('')
        setLoading(false)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };
    return(
        <MainLayout>
            <Container>
                <Breadcrumbs sx={{mb:4}}>
                    <Link to='/'>
                        <HomeFilled style={{fontSize:20}} />
                    </Link>
                    <h1 className="font-semibold text-xl">New Movie</h1>
                </Breadcrumbs>
                <h1 className="font-semibold text-2xl">Add New Movie</h1>
                <Stack direction='column' sx={{mt:10}}>
                    <Stack direction='row' spacing={3}>
                        <Stack sx={{width:'50%'}}>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <div className="input-group">
                                <input name="text" id="Email" className="input" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
                            </div>
                        </Stack>
                        <Stack sx={{mt:2,width:'50%'}} >
                            <FormLabel>
                                Description
                            </FormLabel>
                            <div className="input-group">
                                <textarea className="input"  onChange={(e)=>setDesc(e.target.value)} value={desc} />
                            </div>
                        </Stack>
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{mt:10}}>
                        <Stack sx={{width:'50%'}}>
                            <FormLabel>
                                Poster
                            </FormLabel>
                            <div className="input-group" style={{display: 'flex', justifyContent:'center',alignItems: 'center'}}>
                                <input name="file" id="Email" className="input" type="file" onChange={(e)=>setPoster(e.target.files[0])} style={{cursor:'pointer'}}/>
                            </div>
                        </Stack>
                        <Stack sx={{mt:2,width:'50%'}} >
                            <FormLabel>
                                Duration
                            </FormLabel>
                            <div className="input-group">
                                <input name="text" id="Email" className="input" type="text" value={duration}  onChange={(e)=>setDuration(e.target.value)} />
                            </div>
                        </Stack>
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{mt:10}}>
                        <Stack sx={{width:'50%'}}>
                            <FormLabel>
                                Release Date
                            </FormLabel>
                            <div className="input-group" style={{display: 'flex', justifyContent:'center',alignItems: 'center'}}>
                                <input name="date" id="Email" className="input" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                            </div>
                        </Stack>
                    </Stack>
                    {loading?<Button disabled variant="contained" sx={{mt:6,width:170}}><CircularProgress color="success" /></Button>
                    :<Button onClick={handleSubmit} variant="contained" sx={{mt:6,width:170}}>Add New Movie + </Button>}
                </Stack>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                    <Alert onClose={handleClose} severity={variant} sx={{ width: 500 }}>
                        <h1 className="font-semibold text-xl">{msg}</h1>
                    </Alert>
                </Snackbar>
            </Container>
        </MainLayout>
    )
}