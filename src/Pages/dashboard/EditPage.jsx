import { Button, Container, FormLabel, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Alert, Breadcrumbs, CircularProgress, Snackbar } from "@mui/material";
import { editDetails } from "../../services/app.services";
import { HomeFilled } from '@ant-design/icons';
import { getDetails } from "../../services/app.services"
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

export default function EditMovie(){
    const {id} = useParams()
    const [title,setTitle] = useState();
    const [desc,setDesc] = useState();
    const [duration,setDuration] = useState();
    const [date,setDate] = useState();
    const [img,setImg] = useState();
    const [open,setOpen] = useState(false);
    const [msg,setMsg] = useState('');
    const [variant,setVariant] = useState('')
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setTitle(id)
        get()
    },[])
    async function get(){
        const dataa = await getDetails(id)
        console.log(dataa)
        setDesc(dataa.description)
        setDuration(dataa.duration)
        setDate(dataa.release)
        setImg(dataa.image)
        console.log(img)
    }

    const handleSubmit = async() => {
        setLoading(true);
        console.log(title,desc,duration,date)
        if(title === undefined||desc === undefined||duration === undefined||date === undefined){
            setMsg("All Feilds are required")
            setVariant("error")
            console.log("sdkh")
            setLoading(false)
            return setOpen(true);
        }
        const create = editDetails(id,title,desc,img,duration,date)
        if(create){
            setMsg("Updated Succesfully")
            setVariant("success")
            setLoading(false)
            return setOpen(true);
        }
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
                    <h1 className="font-semibold text-xl">Edit</h1>
                    <h1 className="font-semibold text-xl">{id}</h1>
                </Breadcrumbs>
                <h1 className="font-semibold text-xl">Edit {id}</h1>
                <Stack direction='column' sx={{mt:10}}>
                    <Stack direction='row' spacing={3}>
                        <Stack sx={{width:'50%'}}>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <div className="input-group">
                                <input name="text" value={title} id="Email" className="input" type="text" onChange={(e)=>setTitle(e.target.value)} />
                            </div>
                        </Stack>
                        <Stack sx={{mt:2,width:'50%'}} >
                            <FormLabel>
                                Description
                            </FormLabel>
                            <div className="input-group">
                                <textarea className="input" value={desc}  onChange={(e)=>setDesc(e.target.value)} />
                            </div>
                        </Stack>
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{mt:10}}>
                        <Stack sx={{width:'50%'}} >
                            <FormLabel>
                                Duration
                            </FormLabel>
                            <div className="input-group">
                                <input name="text" id="Email" value={duration} className="input" type="text"  onChange={(e)=>setDuration(e.target.value)} />
                            </div>
                        </Stack>
                        <Stack sx={{mt:2,width:'50%'}}>
                            <FormLabel>
                                Release Date
                            </FormLabel>
                            <div className="input-group" style={{display: 'flex', justifyContent:'center',alignItems: 'center'}}>
                                <input name="date" value={date} id="Email" className="input" type="date"  onChange={(e)=>setDate(e.target.value)} />
                            </div>
                        </Stack>
                    </Stack>
                    {loading?<Button disabled variant="contained" sx={{mt:6,width:170}}><CircularProgress color="success" /></Button>
                    :<Button onClick={handleSubmit} variant="contained" sx={{mt:6,width:170}}>Edit Movie </Button>}
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