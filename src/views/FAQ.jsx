import React, { useState } from "react";
import { Box, useTheme, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "src/utils/theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchQuery, setSearchQuery] = useState("");

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
                "On the top right of the page, click on the 'Generate Heats' button. Select the time range you want to generate heats for and click 'Submit'."
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
                filteredFaqs.map((faq, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography color={colors.greenAccent[500]} variant="h5">
                                {faq.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography>No results found.</Typography>
            )}
        </Box>
    );
};

export default FAQ;