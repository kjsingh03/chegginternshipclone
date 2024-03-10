import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './components/Pages/Home.jsx'
import Login from './components/Pages/Login.jsx'
import Signup from './components/Pages/Signup.jsx'
import Internship from './components/Pages/Internship.jsx'
import { store } from './store/store.js'
import Courses from './components/Pages/Courses.jsx'
import Add from './components/Pages/Add.jsx'
import Update from './components/Pages/Update.jsx'
import Verify from './components/Pages/Verify.jsx'
import Profile from './components/Pages/Profile.jsx'
import Contact from './components/Pages/Contact.jsx'
import TnC from './components/Pages/TnC.jsx'
import PrivacyPolicy from './components/Pages/PrivacyPolicy.jsx'
import About from './components/Pages/About.jsx'
import Refund from './components/Pages/Refund.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/internship/:id" element={<Internship />} />
      {/* <Route path="/lesson/:id" element={<Internship />} /> */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/add" element={<Add />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tnc" element={<TnC />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/about" element={<About />} />
      <Route path="/refund" element={<Refund />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
