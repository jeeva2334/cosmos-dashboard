import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/dashboard/Home'
import LoginPage from './Pages/Auth/LoginPage'
import AddMovie from './Pages/dashboard/NewMovieForm'
import Details from './Pages/dashboard/DetailsPage'
import EditMovie from './Pages/dashboard/EditPage'
import AddUser from './Pages/Users/createUser'
import CarouselAdd from './Pages/Add/Carousel'
import AddSlider from './Pages/Add/AddSlider'
import { useEffect } from 'react'
import CarouselDetails from './Pages/Add/CarouselDetails'
import EditCarosel from './Pages/Add/EditCarosel'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/new' element={<AddMovie  />} />
          <Route path='/edit/:id' element={<EditMovie />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/user/new' element={<AddUser />} />
          <Route path='/slider' element={<CarouselAdd />} />
          <Route path='/slider/add' element={<AddSlider />} />
          <Route path='/slider/:id' element={<CarouselDetails />} />
          <Route path='/slider/edit/:id' element={<EditCarosel />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
