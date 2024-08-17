import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid, Divider } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Google } from '@mui/icons-material';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const handleEmailLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log('User logged in:', userCredential.user);
            })
            .catch(error => {
                console.error('Error logging in:', error);
            });
    };

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(result => {
                console.log('User logged in with Google:', result.user);
            })
            .catch(error => {
                console.error('Error logging in with Google:', error);
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
                    Sign In
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
                        onClick={handleEmailLogin}
                    >
                        Sign In
                    </Button>
                    <Divider sx={{ my: 2 }}>OR</Divider>
                    <Grid container justifyContent="center">
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Google />}
                            onClick={handleGoogleLogin}
                        >
                            Sign In with Google
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;
