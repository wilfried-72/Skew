import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Button, Stack, TextField } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';



export default function ResponsiveGrid(props) {
    const { ListInterest,
        dataProfilCandidat } = props
    const [edit, setEdit] = React.useState(false);


    const [interest, setInterest] = useState("");



    const setUseState = () => {
        setInterest(ListInterest.intetest);
    };
    useEffect(() => {
        // console.log("effect for useState form employer");
        setUseState();
    }, [dataProfilCandidat]);



    function ModeText(props) {
        return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 8 }}>
                {ListInterest.map((interest, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Typography>{interest}</Typography>
                    </Grid>
                ))}
            </Grid>

        );
    }

    function ModeEdit(props) {
        return (
            <Stack direction="column" spacing={2}>
                {ListInterest.map((interest, index) => (

                    <TextField
                        key={index}
                        size="small"
                        required
                        id="outlined-required"
                        label="Interest"
                        defaultValue={interest}
                    />
                ))}
                <TextField

                    size="small"
                    required
                    id="outlined-required"
                    label="Add Interest"
                />
                <Box>
                    <Button sx={{ bgcolor: "green", color: "white", m: 2 }} >
                        VALID
                    </Button >
                    <Button sx={{ bgcolor: "red", color: "white", m: 2 }} >
                        ANNULER
                    </Button>
                </Box>
            </Stack>


        );
    }

    const checkEdit = () => {
        if (edit === true) return <ModeEdit />;
        else return <ModeText />;
    };
    return (
        <Box
            sx={{
                bgcolor: "#FFFFFF",
                height: "auto",
                borderRadius: 1,
                my: 4,

            }}
        >
            {/* Titre section Compétences */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}
            >
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{
                        px: 1,
                        bgcolor: "#004F98",
                        color: "#FFFFFF",
                        borderRadius: 1,
                        position: "relative",
                        top: -15,
                    }}
                >
                    Interet
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                }}>


                <Button onClick={(e) => setEdit(edit === true ? false : true)}>
                    <BorderColorIcon />
                </Button>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                {checkEdit()}
            </Box>

        </Box>
    );
}



