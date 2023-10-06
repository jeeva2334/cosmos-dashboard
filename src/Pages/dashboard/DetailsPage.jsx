import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteMovies, getDetails } from "../../services/app.services"
import { HomeFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumbs,Button,Stack } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MainLayout from "../../layouts/MainLayout";

export default function Details(){
    const { id } = useParams() 
    const [data,setData] = useState()
    const nav = useNavigate()
    useEffect(()=>{
        get()
    },[])
    async function get(){
       const dataa = await getDetails(id)
       console.log(dataa)
       setData(dataa)
    }
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        console.log(id)
        const det = deleteMovies(id)
        if(det){
            console.log("done")
            nav('/')
        }
        setOpen(false);
    }
    const handleNavigate = () => {
        nav(`/edit/${id}`)
    }
    return(
        <MainLayout>
            <Breadcrumbs sx={{mb:4}}>
                <HomeFilled style={{fontSize:20}} />
                <h1 className="font-semibold text-xl">{data&&data.title}</h1>
            </Breadcrumbs>
            {data&&
                <Stack sx={{mt:6}}>
                    <Stack direction="column" spacing={3}>
                        <img src={data.image} alt={id} style={{width:300}} />
                        <Stack sx={{p:10}}>
                            <h1 className="font-semibold text-3xl mt-6">{data.title}</h1>
                            <h1 className="font-semibold text-gray-400 text-lg mt-6">{data.duration} hr</h1>
                            <h1 className="font-semibold text-xl mt-6">{data.description}</h1>
                            <Stack direction="row" spacing={3} sx={{mt:4}}>
                                <Button sx={{width:200,height:40}} variant="contained" onClick={handleNavigate}>Edit &nbsp;<EditOutlined /></Button>
                                <Button sx={{width:200,height:40}} variant="contained" color="error" onClick={handleClickOpen}>Delete &nbsp;<DeleteOutlined /></Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete {data&&data.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to proceed with Deleting ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    )
}