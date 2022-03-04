// Import Model
const User = require("../../models/admin/UsersModel");

require("dotenv").config();

class UsersControllers {
  // GET ALL USERS
  // Récupération de la route "usersAll"
  async getListUsers(req, res) {
    // Essayes cette fonction
    try {
      /* SQL récupération de tous les users
      à partir de la fonction qui a été créé dans le model */
      User.getListUsers((err, data) => {
        // console.log("response controller all user", data);
        // Si il y a erreur le mentionner
        if (err) res.send({ message: "error in request db" });
        // Sinon retourné cette réponse avec les data
        else
          return res.json({
            user: data,
            message: "All users has been successfully GETTED. !!!",
          });
      });
    } catch (error) {
      throw error;
    }
  }

  // GET USER ID
  // Récupération de la route "userID"
  async getUserId(req, res) {
    const { id } = req.params;
    // Essayes cette fonction
    try {
      // console.log(id,'req.params', {...req.params});
      User.getUserId({ id }, (err, data) => {
        // console.log('response controller user ID', data);
        if (err) res.send({ message: "error in request db" });
        // Sinon retourné cette réponse avec les data
        else
          return res.json({
            user: data,
            message: "The user has been successfully GETTED. !!!",
          });
      });
    } catch (error) {
      throw error;
    }
  }

  // UPDATE USER
  async putUser(req, res) {
    const { id } = req.params;

    // condition ? valeur_si_false : valeur_si_true ;
    // var isVerified = isVerified === "true" ? 1 : 0;
    var isBanned = isBanned === "true" ? 1 : 0;

    // Essayes cette fonction
    try {
      User.putUser({ id, isBanned }, (err, data) => {
        // console.log("response controller user update", data);
        if (err) res.send({ message: "error in request db" });
        // Sinon retourner cette réponse avec les data
        else
          return res.json({
            user: data,
            message: " The user has been successfully UPDATED.!!!",
          });
      });
    } catch (error) {
      throw error;
    }
  }

  // BADGE
  async putBadge(req, res) {
    const { id } = req.params;

    // condition ? valeur_si_false : valeur_si_true ;
    var badge = badge === "false" ? 0 : 1;
    // Essayes cette fonction
    try {
      // console.log("UpdateBadgeController", id, badge);
      User.putBadge({ id, badge }, (err, data) => {
        // console.log("response controller user update", data);
        if (err) res.send({ message: "error in request db" });
        // Sinon retourner cette réponse avec les data
        else
          return res.json({
            user: data,
            message: " The BADGE has been successfully UPDATED.!!!",
          });
      });
    } catch (error) {
      throw error;
    }
  }


  // Verif
  async verifUser(req, res) {
    const { id } = req.params;

    // condition ? valeur_si_false : valeur_si_true ;
    var isVerified = isVerified === "false" ? 0 : 1;
    // Essayes cette fonction
    try {
      // console.log("UpdateBadgeController", id, badge);
      User.verifUser({ id, isVerified }, (err, data) => {
        // console.log("response controller user update", data);
        if (err) res.send({ message: "error in request db" });
        // Sinon retourner cette réponse avec les data
        else
          return res.json({
            user: data,
            message: " The user has been successfully VERIFIED.!!!",
          });
      });
    } catch (error) {
      throw error;
    }
  }

  // DELETE USER
  async deleteUser(req, res) {
    const { id } = req.params;
    // Essayes cette fonction
    try {
      User.deleteUser({ id }, (err, data) => {
        // console.log('response controller user ID', data);
        if (err) res.send({ message: "error in request db" });
        // Sinon retourner cette réponse avec les data
        else
          return res.json({
            user: data,
            message: " The user has been successfully DELETED.!!",
          });
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersControllers;
