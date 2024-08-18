import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Button, TextField, Container, Typography, IconButton } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Login successful:", userCredential);
                // Redirect or update state here
            })
            .catch((error) => {
                console.error("Error signing in with email:", error);
                setError(error.message);
            });
    };

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google login successful:", result.user);
                // Redirect or update state here
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
                setError(error.message);
            });
    };

    const handleAnonymousLogin = () => {
        signInAnonymously(auth)
            .then((result) => {
                console.log("Anonymous login successful:", result.user);
                // Redirect or update state here
            })
            .catch((error) => {
                console.error("Error signing in anonymously:", error);
                setError(error.message);
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
            {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
        </Container>
    );
}

export default LoginPage;
