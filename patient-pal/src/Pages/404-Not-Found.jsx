import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                textAlign: 'center',
                padding: 2,
            }}
        >
            <Typography variant="h1" color="primary" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Oops! The page you are looking for does not exist.
            </Typography>
            <Box mt={3}>
                <Button variant="contained" color="primary" onClick={handleGoHome}>
                    Go to Homepage
                </Button>
            </Box>
        </Container>
    );
};

export default PageNotFound;