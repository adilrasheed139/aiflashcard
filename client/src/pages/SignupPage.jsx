import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid, Divider } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Google } from '@mui/icons-material';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const handleEmailSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // Signed up successfully
                console.log('User signed up:', userCredential.user);
            })
            .catch(error => {
                console.error('Error signing up:', error);
            });
    };

    const handleGoogleSignup = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(result => {
                console.log('User signed in with Google:', result.user);
            })
            .catch(error => {
                console.error('Error signing in with Google:', error);
            });
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleEmailSignup}
                    >
                        Sign Up
                    </Button>
                    <Divider sx={{ my: 2 }}>OR</Divider>
                    <Grid container justifyContent="center">
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Google />}
                            onClick={handleGoogleSignup}
                        >
                            Sign Up with Google
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignupPage;
