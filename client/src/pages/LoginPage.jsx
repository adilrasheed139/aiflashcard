import React, { useState } from "react";
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Button, TextField, Container, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // Initialize useRouter

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                router.push('/dashboard'); // Redirect to the dashboard after login
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
                router.push('/dashboard'); // Redirect to the dashboard after Google login
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAnonymousLogin = () => {
        signInAnonymously(auth)
            .then((result) => {
                console.log(result.user);
                router.push('/dashboard'); // Redirect to the dashboard after anonymous login
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<EmailIcon />}
                onClick={handleLogin}
                sx={{ mt: 2 }}
            >
                Login with Email
            </Button>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{ mt: 2 }}
            >
                Login with Google
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<PersonIcon />}
                onClick={handleAnonymousLogin}
                sx={{ mt: 2 }}
            >
                Login Anonymously
            </Button>
        </Container>
    );
}

export default LoginPage;
