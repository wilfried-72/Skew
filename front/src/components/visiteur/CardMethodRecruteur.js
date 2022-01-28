import { Card, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

export default function CardMethodRecruteur({ index }) {
    return (
        <Card
            sx={{
                bgcolor: "#FFD9B8",
                width: 300,
                m: 5,
            }}
        >
            <SearchIcon
                sx={{
                    fontSize: "75px",
                    display: 'block',
                    mx: 'auto',
                }}
            />
            <Typography variant="h6" color="initial">
                {index.titre}
            </Typography>
            <Typography
                variant="body1"
                color="initial"
                sx={{
                    px: 3,
                    pb: 3
                }}
            >
                {index.text}
            </Typography>
        </Card>
    )
}
