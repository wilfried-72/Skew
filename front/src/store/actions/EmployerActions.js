/*
 * Import - Module
 * *************** */
import { apiSiret } from "configs/axios";
import {
  DELETE_OFFER,
  GET_API_SIRET,
  GET_PROFIL_EMPLOYER,
  POST_MESSAGE_CANDIDATE,
  POST_OFFER,
  POST_PROFIL_EMPLOYER,
  PUT_ACTION_CANDIDATE,
  PUT_PROFIL_EMPLOYER,
} from "./ActionTypes";

// import image en static mais à voir pour aller chercher l'image dans le back plus tard
import imageEmployer from "assets/images/imageEmployor.png";

const dataDefault = {
  user_id: 1,
  mail: "wilfried.cda@gmail.com",
  name: "Buno & Co",
  zipCode: "85600",
  siren: "356454356",
  siret: "40976852000135",
  address: "21 fze fzefjzpej",
  category: "fvevfeqrg",
  town: "Bonnetable",
  avatar:imageEmployer,
};

// const dataDefault = {
// }
const message ="Votre offre a bien été publiée !"
const messagePostCandidate = "Votre mail a bien été envoyé !"
/*
 * Import types { ... }
 * ******************** */

/*
 * Actions
 * ******* */

// Get Api siret employer
export const getApiSiret = (siretNumber) => {
  return (dispatch) => {
    return apiSiret
      .get(siretNumber)
      .then((res) => {
        // console.log("resApi action store", res.data.etablissement);
        dispatch({ type: GET_API_SIRET, payload: res.data.etablissement });
      })
      .catch((err) => console.log(err));
  };
};

// get profil employer
export const getProfilEmployer = () => {
  return (dispatch) => {
    // console.log("GET_PROFIL_EMPLOYER action", data);
    dispatch({ type: GET_PROFIL_EMPLOYER, payload: dataDefault });
  };
};

// Post profil employer
export const postFormProfilEmployer = (data) => {
  return (dispatch) => {
    // console.log("POST_PROFIL_EMPLOYER action", data);
    dispatch({ type: POST_PROFIL_EMPLOYER, payload: data });
  };
};

// Put profil employer
export const putFormProfilEmployer = (data) => {
  return (dispatch) => {
    // console.log("PUT_PROFIL_EMPLOYER action", data);
    dispatch({ type: PUT_PROFIL_EMPLOYER, payload: data});
  };
};

// Post add offer
export const postFormAddOffer = (data) => {
  return (dispatch) => {
    // console.log("POST_OFFER action", data, message);
    dispatch({ type: POST_OFFER, payload: {data, message}});
  };
};

//  Delete offer
export const deleteOffer = (id) => {
  return (dispatch) => {
  console.log("DELETE_OFFER action", id);
    // dispatch({ type: DELETE_OFFER, payload: {data, messagePostCandidate}});
  };
};

//  Delete offer
export const putActionCandidate = (data) => {
  return (dispatch) => {
  // console.log("PUT_ACTION_CANDIDATE", data);
    // dispatch({ type: PUT_ACTION_CANDIDATE, payload: {data, messagePostCandidate}});
  };
};

// Post message candidate
export const postMessageCandidate = (data) => {
  return (dispatch) => {
  // console.log("POST_MESSAGE_CANDIDATE action", data, messagePostCandidate);
    dispatch({ type: POST_MESSAGE_CANDIDATE, payload: {data, messagePostCandidate}});
  };
};
