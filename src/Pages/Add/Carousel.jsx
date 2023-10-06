import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, Stack, Typography } from '@mui/material'
import { getSliders } from "../../services/app.services";
import { Link, useNavigate } from "react-router-dom";

export default function CarouselAdd(){
    const [slider,setSlider] = useState([])
    const [loading,setLoading] = useState(false)
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
        }catch(err){
            console.log(err)
        }
    }
    return(
        <MainLayout>
            <Stack direction={'row'} justifyContent={'space-between'} sx={{p:10}}>
                <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                    Carousel
                </Typography>
                <Button sx={{width: 160}} variant="contained" onClick={()=>nav('/slider/add')}>
                    Add Slides
                </Button>
            </Stack>
            <Grid container spacing={3} sx={{ mt:2 }}>
                {slider.length > 0 && slider.map((item,key)=>(
                    <Grid item xs={12} sm={6} md={3}  key={key}>
                        <Link sx={{w:400,}}>
                            <img src={item?.data?.image}/>
                            <Typography variant="h6" sx={{mt:2,fontWeight: 'bold'}}>
                                {item?.title}
                            </Typography>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </MainLayout>
    )
}