import { Container } from "@mui/material";
import React from "react";
import CandidatureList from "components/candidat/listOffer/CandidatureList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
<<<<<<< HEAD
// import { getProfilCandidate } from "store/actions/CandidateActions";
=======
import { getProfilCandidate } from "store/actions/CandidateActions";
import withCandidat from "components/auth/withCandidat";
>>>>>>> 29e79f3b86879cf4870d9d31aa44e116a6a65ffd

const CandidatCandidature = () => {
  const dispatch = useDispatch()
  const candidatures = useSelector(state => state.candidate.candidatures)

  // useEffect(() => dispatch(getProfilCandidate(), []))
  // console.log('candidature', candidatures);
  return (
    <Container
      sx={{
        bgcolor: "#E5E5E5",
        p: 2,
        height: "auto",
        mt: 2,
      }}>
      {candidatures && candidatures.map((ListCandidature, index) => (
        <CandidatureList ListCandidature={ListCandidature} key={index} />
      ))}
    </Container>

  );
};

export default withCandidat(CandidatCandidature);
// export default CandidatCandidature;