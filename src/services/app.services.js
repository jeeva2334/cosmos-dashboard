import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, child, get, set, update, remove  } from 'firebase/database';
import { authuser, dbuser } from '../config/user.config';

export async function Login(email, password, nav, setOpen, setMsg) {
  try {
    const user = await signInWithEmailAndPassword(authuser, email, password);
    await onAuthStateChanged(authuser,(user)=>{
        console.log(user)
    })
    const dbRef = ref(dbuser)
    const role = await get(child(dbRef,`roles/${user.user.uid}`))
    console.log(role.val());
    if(!role.val().admin){
        await signOut(dbRef)
        return false;
    }
    nav('/')
    return true;
  } catch (error) {
    console.error(error);
    setOpen(true)
    setMsg(error.message);
    return false;
  }
}

export async function getMovies(){
    try {
        console.log('Getting movies')
        const dbRef = ref(dbuser)
        const movies = await (await get(child(dbRef,'movies/'))).val()
        console.log(movies)
        return movies
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function createMovies(title,desc,image,duration,release){
    try {
       console.log("hello") 
       await set(ref(dbuser,`movies/${title}`),{
        title:title,
        description:desc,
        image:image,
        duration:duration,
        release:release
       })
       console.log("done")
    } catch (error) {
        console.log(error)
    }
}

export async function getDetails(title){
    try {
        console.log("Started")
        const dbRef = ref(dbuser)
        const data = await get(child(dbRef,`movies/${title}`))
        console.log("done",data.val())
        return data.val()
    } catch (error) {
       console.log(error) 
    }
}

export async function editDetails(id,title,desc,image,duration,release){
    try {
        const dbRef = ref(dbuser,`movies/${id}`)
        const updates = {
            title:title,
            description:desc,
            image:image,
            duration:duration,
            release:release
        }
        await update(dbRef,updates)
        console.log("done update")
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function deleteMovies(id){
    try {
        const dbRef = ref(dbuser,`movies/${id}`)
        await remove(dbRef)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function DeleteAll(){
    try {
        const dbRef = ref(dbuser,`movies/`)
        await remove(dbRef)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function create_user(email,password){
    try {
        const {user} = await createUserWithEmailAndPassword(authuser,email,password)
        await set(ref(dbuser,`roles/${user.uid}`),{
            admin: true
        })
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export async function createSlider(title,desc,image){
    try {
       console.log("hello") 
       await set(ref(dbuser,`slider/${title}`),{
        title:title,
        description:desc,
        image:image
       })
       console.log("done")
       return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function getSliders(){
    try {
        console.log('Getting movies')
        const dbRef = ref(dbuser)
        const movies = await (await get(child(dbRef,'slider/'))).val()
        console.log(movies)
        return movies
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getSliderDetails(title){
    try {
        console.log("Started")
        const dbRef = ref(dbuser)
        const data = await get(child(dbRef,`slider/${title}`))
        console.log("done",data.val())
        return data.val()
    } catch (error) {
       console.log(error) 
    }
}

export async function deleteSLide(id){
    try {
        const dbRef = ref(dbuser,`slider/${id}`)
        await remove(dbRef)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function editSlideDetails(id,title,desc,image){
    try {
        const dbRef = ref(dbuser,`slider/${id}`)
        const updates = {
            title:title,
            description:desc,
            image:image
        }
        await update(dbRef,updates)
        console.log("done update")
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function DeleteAllSlides(){
    try {
        const dbRef = ref(dbuser,`slider/`)
        await remove(dbRef)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}