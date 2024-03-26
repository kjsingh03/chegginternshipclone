import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom';
import {  updateInternships } from './store/internshipslice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_KEY}/api/internship`)
      .then(res => dispatch(updateInternships(res.data.internships)))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Outlet />
      
    </>
  )
}

export default App
