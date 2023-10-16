import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, Typography } from '@mui/material'
import { DeleteAllSlides, getSliders } from "../../services/app.services";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import nodata from '../../assets/nodata.jpg'

export default function CarouselAdd(){
    const [slider,setSlider] = useState([])
    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)
    const nav = useNavigate()
    useEffect(()=>{
        fetchSlider()
    },[])
    async function fetchSlider(){
        setLoading(true)
        try {
            const moviesData = await getSliders();
            if (moviesData !== null) {
                console.log('Movies data:', moviesData);
                const resultArray = Object.entries(moviesData).map(([title, data]) => ({
                    title,
                    data
                }));
                console.log(resultArray);
                setSlider(resultArray)
            }
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)

        }
    }
    const handleClose = () =>{
        setOpen(false)
    }
    const handleDeleteAll = () => {
        DeleteAllSlides().then(()=>{
            console.log("deleted all")
            setSlider([])
            fetchSlider()
            setOpen(false)
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <MainLayout>
            <Stack direction={'row'} justifyContent={'space-between'} sx={{p:10}}>
                <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                    Carousel
                </Typography>
                <Stack direction={'row'} justifyContent={'center'}>
                    <Button sx={{width: 160}} variant="contained" onClick={()=>nav('/slider/add')}>
                        Add Slides
                    </Button>
                    <IconButton sx={{color:'red',ml:2}} onClick={()=>setOpen(true)}>
                        <DeleteOutlined />
                    </IconButton>
                </Stack>
            </Stack>
            <Grid container spacing={3} sx={{ mt:2 }}>
                {!loading ? slider.length > 0 ? slider.map((item,key)=>(
                    <Grid item xs={12} sm={6} md={3}  key={key}>
                        <Link to={`/slider/${item?.title}`} sx={{w:400,}}>
                            <img src={item?.data?.image}/>
                            <Typography variant="h6" sx={{mt:2,fontWeight: 'bold'}}>
                                {item?.data?.title}
                            </Typography>
                        </Link>
                    </Grid>
                )):<div className="flex flex-col justify-center items-center w-full">
                    <img src={nodata} className="w-56" />
                    <h1 className="font-semibold text-xl mt-4">No Slides Created</h1>
                </div>:
                <div className="flex flex-col justify-center items-center w-full">
                    <div class="custom-loader"></div>
                </div>}
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete All Slides
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to proceed with Deleting ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeleteAll} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    )
}