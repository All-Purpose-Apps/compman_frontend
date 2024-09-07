import React, { useState } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { tokens } from "src/utils/theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchQuery, setSearchQuery] = useState("");
    const [flippedIndexes, setFlippedIndexes] = useState([]);

    const faqs = [
        {
            question: "How do I add a studio?",
            answer:
                "On the top right of the page, click on the 'Add Studio' button. Fill out the form and click 'Submit'."
        },
        {
            question: "How do I add a dancer?",
            answer:
                "On the top right of the page, click on the 'Add Dancer' button. Fill out the form and click 'Submit'."
        },
        {
            question: "How do I add an entry?",
            answer:
                "On the top right of the page, click on the 'Add Entry' button. Fill out the form and click 'Submit'."
        },
        {
            question: "How do I generate heats?",
            answer:
                "On the top right of the page, click on the 'Generate Heats' button. Read the warning, then click the button to generate heats."
        },
        {
            question: "How do I contact support?",
            answer:
                "You can contact support by emailing info@allpurposeapps.com or calling 555-555-5555."
        }
    ];

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCardClick = (index) => {
        setFlippedIndexes((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    return (
        <Box m="20px">
            <TextField
                label="Search FAQ"
                variant="outlined"
                fullWidth
                margin="dense"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
            />
            {filteredFaqs.length > 0 ? (
                <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
                    {filteredFaqs.map((faq, index) => (
                        <Box
                            key={index}
                            className="card-container"
                            onClick={() => handleCardClick(index)}
                            sx={{ perspective: '1000px' }}
                        >
                            <Box
                                className={`card ${flippedIndexes.includes(index) ? 'is-flipped' : ''}`}
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '200px',
                                    transformStyle: 'preserve-3d',
                                    transition: 'transform 0.6s',
                                    cursor: 'pointer',
                                }}
                            >
                                <Box
                                    className="card-front"
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '20px',
                                        boxSizing: 'border-box',
                                        backgroundColor: colors.greenAccent[600],
                                        color: colors.grey[100],
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Typography variant="h5">
                                        {faq.question}
                                    </Typography>
                                </Box>
                                <Box
                                    className="card-back"
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '20px',
                                        boxSizing: 'border-box',
                                        backgroundColor: colors.greenAccent[600],
                                        color: colors.grey[100],
                                        borderRadius: '8px',
                                        transform: 'rotateY(180deg)',
                                    }}
                                >
                                    <Typography>
                                        {faq.answer}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography>No results found.</Typography>
            )}
        </Box>
    );
};

export default FAQ;