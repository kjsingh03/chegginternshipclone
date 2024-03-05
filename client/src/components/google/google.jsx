import React from 'react';
import { jwtDecode } from "jwt-decode"
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Google({ path }) {

    const navigate = useNavigate();

    const submit = (res) => {

        const { name, email } = jwtDecode(res.credential)

        axios.post("http://localhost:8080/auth/google/login", { email: email })
            .then((res) => {
                setTimeout(() => navigate("/"), 500)
                document.getElementById("error").innerText = res.data.message;
                localStorage.setItem("credentials", JSON.stringify(res.data.user))
            })
            .catch((err) => document.getElementById("error").innerText = err.response.data.message + ", Kindly Signup")
            .finally(() => setTimeout(() => { document.getElementById("error").innerText = " "; navigate("/signup")}, 1000))
    }

    return (
        <GoogleLogin
            onSuccess={credentialResponse => submit(credentialResponse)}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}
