import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { useParams, useRoutes } from 'react-router-dom'
import { Alert, Button, CircularProgress, FormLabel, Snackbar, Stack, Typography } from '@mui/material';
import { editSlideDetails, getSliderDetails } from '../../services/app.services';

function EditCarosel() {
    const { id } = useParams();
    const [loading,setLoading] = useState(false)
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
    const [slide,setSlide] = useState()
    const [open,setOpen] = useState(false)
    const [msg,setMsg] = useState('')
    const [variant,setVariant] = useState('')
    useEffect(()=>{
        console.log(id)
        getSliderDetails(id).then(res=>{
            console.log(res)
            setSlide(res)
            setTitle(res?.title)
            setDesc(res?.description)
        })
    },[])
    const handleSubmit = () => {
        setLoading(true)
        editSlideDetails(id,title,desc,slide?.image).then(()=>{
            setLoading(false)
            setMsg(`${title} edited succesfully`)
            setVariant('success')
            setOpen(true)
        }).catch(()=>{
            setLoading(false)
            setMsg(`Something went Wrong`)
            setVariant('error')
            setOpen(true)
        })
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <MainLayout>
            <Typography variant='h5' sx={{fontWeight:'500'}}>Edit {id}</Typography>
            <Stack sx={{mt:6}} direction={'row'}>
                <Stack sx={{width:'40%'}}>
                    <FormLabel>
                        Title
                    </FormLabel>
                    <div className="input-group">
                        <input name="text" value={title} id="Email" className="input" type="text" onChange={(e)=>setTitle(e.target.value)} />
                    </div>
                </Stack>
                <Stack sx={{width:'40%',ml:5}}>
                    <FormLabel>
                        Description
                    </FormLabel>
                    <div className="input-group">
                        <textarea name="text" value={desc} id="Email" className="input" type="text" onChange={(e)=>setDesc(e.target.value)} />
                    </div>
                </Stack>
            </Stack>
            {loading?<Button disabled variant="contained" sx={{mt:6,width:170}}><CircularProgress color="success" /></Button>
            :<Button onClick={handleSubmit} variant="contained" sx={{mt:6,width:170}}>Edit Slide </Button>}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert onClose={handleClose} severity={variant} sx={{ width: 500 }}>
                    <h1 className="font-semibold text-xl">{msg}</h1>
                </Alert>
            </Snackbar>
        </MainLayout>
    )
}

export default EditCarosel