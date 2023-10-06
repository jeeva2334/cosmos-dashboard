import { useEffect,useState } from "react";
import { Grid, Container, Typography, CardMedia, Card, CardContent, Stack, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { onAuthStateChanged } from 'firebase/auth'
import { authuser } from "../../config/user.config";
import { Link, useNavigate } from "react-router-dom";
import { DeleteAll, getMovies } from "../../services/app.services";
import MainLayout from "../../layouts/MainLayout";
import nodata from '../../assets/nodata.jpg'

export default function Home(){
    const navigate = useNavigate();
    const [nowShowing,setNowShowing] = useState([]);
    const [comingSoon,setComingSoon] = useState([]);
    const [loading,setLoading] = useState(false);
    const today = new Date();

    useEffect(()=>{
        console.log("use effect")
        onAuthStateChanged(authuser,(user)=>{
        if(!user){
            navigate('/login')
        }
        })
        fetchMovies();
    },[])
    async function fetchMovies() {
        setLoading(true)
        try {
            const moviesData = await getMovies();
            if (moviesData !== null) {
            console.log('Movies data:', moviesData);
            const resultArray = Object.entries(moviesData).map(([title, data]) => ({
                title,
                data
            }));
            console.log(resultArray);
            const nowShowingMovies = [];
            const comingSoonMovies = [];
            resultArray.forEach((movie) => {
                const releaseDate = new Date(movie.data.release);
                if(releaseDate <= today) {
                    nowShowingMovies.push({ title: movie.title, data: movie.data });
                }else if(releaseDate >= today) {
                    console.log(movie)
                    comingSoonMovies.push({ title: movie.title, data: movie.data });
                }
            });
            console.log(comingSoonMovies.length)
            if(nowShowingMovies.length > 0){
                setNowShowing(nowShowingMovies);
            }else{
                setNowShowing([]);
            }
            if (comingSoonMovies.length > 0) {
                setComingSoon(comingSoonMovies);
            } else {
                setComingSoon([]);
            }            
            console.log("done",nowShowing)
            }else{
            console.log('No movies data found');
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
        setLoading(false)
    }
    const handleDeleteAll = async() => {
        const del = await DeleteAll()
        if(del){
            handleClose()
            fetchMovies()
        }
    }
    const handleNavigate = () => {
        navigate('/new')
    }
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return(
        <MainLayout>
            <Container>
                <Stack direction='row' justifyContent={'space-between'}>
                    <h1 className="font-semibold text-3xl mt-4">Movies</h1>
                    <Button onClick={handleClickOpen} variant="contained" sx={{height:35}} color="error">Delete All Movies</Button>
                </Stack>
                <h1 className="font-semibold text-xl mt-6">Now Showing</h1>
                <Grid container spacing={3} sx={{ mt:2 }}>
                    {!loading ? nowShowing.length > 0 ?nowShowing.map((item,key)=>(<Grid item xs={12} sm={6} md={3}  key={key}>
                    <Link to={`/details/${item.title}`} style={{textDecoration:'none'}}>
                        <Card sx={{ maxWidth: 245 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={item.data.image}
                            title={item.title}
                        />
                        <CardContent>
                            <Stack
                            justifyContent={'space-between'}
                            direction={'row'}
                            >
                                <h1 className="font-semibold text-xl mt-6">{item.data.title}</h1>
                            </Stack>
                        </CardContent>
                        </Card>
                    </Link>
                    </Grid>)):
                    <div className="flex flex-col justify-center items-center w-full">
                        <img src={nodata} className="w-56" />
                        <h1 className="font-semibold text-xl mt-4">No Movies Created</h1>
                    </div>:<div className="flex flex-col justify-center items-center w-full">
                        <div class="custom-loader"></div>
                    </div>
                    }
                </Grid>
                <Stack 
                    justifyContent={'space-between'}
                    direction={'row'}
                    sx={{mt:10}}
                >
                    <h1 className="font-semibold text-xl mt-6">Coming Soon</h1>
                    <Button onClick={handleNavigate} sx={{height:35}} variant="contained">Add New Movie +</Button>  
                </Stack>
                <Grid container spacing={3} sx={{ mt:2 }}>
                    {!loading ? comingSoon.length > 0 ?comingSoon.map((item,key)=>(<Grid item xs={12} sm={6} md={3}  key={key}>
                    <Link to={`/details/${item.title}`} style={{textDecoration:'none'}}>
                        <Card sx={{ maxWidth: 245 }}>
                            <CardMedia
                            sx={{ height: 140 }}
                            image={item.data.image}
                            title={item.title}
                            />
                            <CardContent>
                            <Stack
                                justifyContent={'space-between'}
                                direction={'row'}
                            >
                            <h1 className="font-semibold text-xl mt-6">{item.data.title}</h1>
                            </Stack>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>)): 
                <div className="flex flex-col justify-center items-center w-full">
                    <img src={nodata} className="w-56" />
                    <h1 className="font-semibold text-xl mt-4">No Movies Created</h1>
                </div>:
                <div className="flex flex-col justify-center items-center w-full">
                    <div class="custom-loader"></div>
                </div>}
            </Grid>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete All movies
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