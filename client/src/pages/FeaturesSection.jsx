import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Container } from '@mui/material';
import { Fade } from 'react-awesome-reveal';

const features = [
    {
        title: "AI-Powered Learning",
        description: "Harness the power of AI to tailor your flashcards.",
        icon: "/path-to-icon1.png", // Replace with actual icon path
    },
    {
        title: "Custom Flashcards",
        description: "Create and customize your flashcards with ease.",
        icon: "/path-to-icon2.png", // Replace with actual icon path
    },
    {
        title: "Progress Tracking",
        description: "Track your progress and improve your learning.",
        icon: "/path-to-icon3.png", // Replace with actual icon path
    }
];

function FeaturesSection() {
    return (
        <Container>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
                Key Features
            </Typography>
            <Grid container spacing={4}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Fade delay={index * 100}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={feature.icon}
                                    alt={feature.title}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default FeaturesSection;
