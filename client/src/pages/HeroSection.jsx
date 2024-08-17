import React from 'react';
import { Button, Container, Typography } from '@mui/material';

function HeroSection() {
    return (
        <div style={{ 
            backgroundImage: 'url(/assets/HeroSection.jpg)', // Replace with actual image path
            backgroundSize: 'cover', 
            padding: '100px 0', 
            textAlign: 'center',
            color: '#fff',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Container maxWidth="md">
                <Typography variant="h2" component="h1" gutterBottom>
                    Elevate Your Learning
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Flashcards Made Smarter with ThinkFlash
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    style={{ marginTop: '20px' }}
                >
                    Get Started
                </Button>
            </Container>
        </div>
    );
}

export default HeroSection;
