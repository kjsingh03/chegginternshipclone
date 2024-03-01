import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom';
import {  updateInternships } from './store/internshipslice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get("http://localhost:8080/internship")
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
