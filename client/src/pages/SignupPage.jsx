import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Button, TextField, Container, Typography, IconButton } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.error("Error signing up with email:", error);
            });
    };

    const handleGoogleSignup = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.error("Error signing up with Google:", error);
            });
    };

    const handleAnonymousSignup = () => {
        signInAnonymously(auth)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.error("Error signing up anonymously:", error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Signup
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
                onClick={handleSignup}
                sx={{ mt: 2 }}
            >
                Signup with Email
            </Button>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignup}
                sx={{ mt: 2 }}
            >
                Signup with Google
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<PersonIcon />}
                onClick={handleAnonymousSignup}
                sx={{ mt: 2 }}
            >
                Signup Anonymously
            </Button>
        </Container>
    );
}

export default SignupPage;
