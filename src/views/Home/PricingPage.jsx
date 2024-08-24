import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const pricingPlans = [
    {
        title: "Free",
        price: "$0",
        features: [
            "1 user",
            "10 dancers",
            "25 Entries",
            "1 Schedule",
            "10 heats",
            "No Support",
        ],
    },
    {
        title: "Standard",
        price: "$300",
        features: [
            "5 Users",
            "20 Dancers",
            "Unlimited Entries",
            "Unlimited Heats",
            "Paid Support",
        ],
    },
    {
        title: "Premium",
        price: "$500",
        features: [
            "Unlimited Users",
            "Unlimited Dancers",
            "Unlimited Entries",
            "Unlimited Heats",
            "Financial Reporting",
            "Free Priority Support",
        ],
    },
];

const PricingPage = React.memo(() => (
    <Box
        sx={{
            backgroundColor: "#0f2922",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Container maxWidth="lg">
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    textAlign: "center",
                    backgroundColor: "#1e5245",
                    boxShadow: 10,
                }}
            >
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{ color: "white", textShadow: "1px 1px 8px black" }}
                >
                    Pricing Plans
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    sx={{ color: "white", textShadow: "1px 1px 8px black" }}
                >
                    Per Competition
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {pricingPlans.map((plan, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    backgroundColor: "#2e7c67",
                                    color: "white",
                                    boxShadow: 10,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        {plan.title}
                                    </Typography>
                                    <Typography variant="h4" align="center">
                                        {plan.price}
                                    </Typography>
                                    <Box
                                        component="ul"
                                        sx={{
                                            listStyleType: "none",
                                            padding: 0,
                                            margin: "1rem 0",
                                            textAlign: "center",
                                        }}
                                    >
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx}>
                                                <Typography variant="body1">
                                                    {feature}
                                                </Typography>
                                            </li>
                                        ))}
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    <Button variant="contained" color="primary">
                                        Choose Plan
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    </Box>
));

export default PricingPage;