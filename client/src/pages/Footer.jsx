import React from 'react';
import { Container, Typography, Grid, Link, TextField, Button } from '@mui/material';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0' }}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            ThinkFlash
                        </Typography>
                        <Typography variant="body2">
                            Elevate your learning experience with our smart flashcards. Join us and enhance your study sessions.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/" color="inherit">Home</Link><br />
                        <Link href="/features" color="inherit">Features</Link><br />
                        <Link href="/contact" color="inherit">Contact</Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Newsletter
                        </Typography>
                        <TextField
                            variant="outlined"
                            label="Email"
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" fullWidth>
                            Subscribe
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;
