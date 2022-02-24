import React from 'react';
import VisiteurLayout from 'layouts/VisiteurLayout';
import { Box } from "@mui/material";
import { Button, Typography } from "@mui/material";
import RecruteurCard from 'assets/images/recruteurCard.jpg';
import { useNavigate } from 'react-router-dom';
import WhyHome1 from 'assets/images/WhyHome01.jpg';
import WhyHome2 from 'assets/images/WhyHome02.jpg';

import ParagraphCard from 'components/visiteur/ParagraphCard';
import StatBarHome from 'components/visiteur/home/StatBarHome';

export default function Home() {

    const navigate = useNavigate();

    const CardsList = [
        { titre: "Je suis un recruteur", lien: "recruteur", color: "tiers", image: RecruteurCard },
        { titre: "Je suis un candidat", lien: "candidat", color: "secondary", image: RecruteurCard }
    ];
    const CardsContents = [
        { image: WhyHome1, titre: "Pourquoi nous?", texte: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", position: true },
        { image: WhyHome2, titre: "Nos méthodes", texte: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", position: false },
    ]

    return (
        <VisiteurLayout>
            <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 50 }, mx: 5 }}>
                Ici on ne cherche pas un travail <br />
                On le trouve
            </Typography>

            {/* CardHome */}
            <Box maxWidth='xl' disableGutters sx={{ display: 'flex', mx: 'auto', my: 10 }}>
                {CardsList.map((card, index) => (
                    <Button
                        key={index}
                        onClick={() => navigate({ pathname: `/${card.lien}` })}
                        variant='contained'
                        color={card.color}
                        sx={{ width: "45%", m: 'auto', minWidth: 150, maxWidth: 600, height: { xs: 400, md: 500 } }}>
                        <Typography color="initial" sx={{ fontSize: { xs: 20, md: 45 } }}>
                            {card.titre}
                        </Typography>
                    </Button>
                ))}
            </Box>

            <Box maxWidth="xl" sx={{ mx: 'auto' }}>
                {CardsContents.map((cardsContent, index) => (
                    <ParagraphCard cardsContent={cardsContent} key={index} />
                ))}
            </Box>
            <StatBarHome />
        </VisiteurLayout>
    );
};