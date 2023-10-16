import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import MainLayout from '../../layouts/MainLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteSLide, getSliderDetails } from '../../services/app.services';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function CarouselDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [slider,setSlider] = useState()
  const [delLoading,setDelLoading] = useState(false)
  useEffect(()=>{
    console.log(id)
    getSliderDetails(id).then((res)=>{
      console.log(res)
      setSlider(res)
    })
  },[])
  const deleteS = () =>{
    setDelLoading(true)
    deleteSLide(id).then(()=>{
      setDelLoading(false)
      nav('/slider')
    }).catch(()=>{
      setDelLoading(false)
    })
  }
  const navigate = () => {
    nav(`/slider/edit/${id}`)
  } 
  return (
    <MainLayout>
        <Stack>
          <Typography variant='h4' sx={{fontWeight:'600'}}>Slider</Typography>
          {slider&&<Stack>
            <img src={slider?.image} className='w-[40rem] mt-10' />
            <Typography variant='h5' sx={{fontWeight:'600',mt:4}}>{slider?.title}</Typography>
            <Typography variant='body1' sx={{mt:3}}>{slider?.description}</Typography>
            <Stack direction={'row'} sx={{mt:6,mb:5}}>
              <Button variant='contained' onClick={navigate} color='primary' sx={{width:170}}>Edit&nbsp;<EditOutlined /></Button>
              <Button variant='contained' disabled={delLoading} color='error' onClick={deleteS} sx={{width:170,ml:4}}>{!delLoading ?<span className='flex items-center'>Delete&nbsp;<DeleteOutlined /></span>:<span><CircularProgress color='error' /></span>}</Button>
            </Stack>  
          </Stack>}
        </Stack>
    </MainLayout>
  )
}

export default CarouselDetails