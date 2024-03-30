import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom';
import { setLoader, setThumbnails, updateInternships } from './store/internshipslice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loader = useSelector(state => state.loader)

  useEffect(() => {

    dispatch(setLoader(true))

    axios.get(`${import.meta.env.VITE_API_KEY}/api/internship`)
      .then(res => dispatch(updateInternships(res.data.internships)))
      .catch(err => console.log(err))

    axios.get(`${import.meta.env.VITE_API_KEY}/api/user/all`)
      .then(res => {
        dispatch(setThumbnails(res.data[0]?.thumbnails))
        dispatch(setLoader(false))
      })
      .catch(err => console.log(err))


  }, [])

  return (
    <>
    <Navbar/>
      {
        loader &&
        <Loader />
      }
      <Outlet />
    </>
  )
}

export default App
