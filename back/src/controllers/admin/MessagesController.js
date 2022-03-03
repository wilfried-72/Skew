// Import Model
const nodemailer = require("../../config/nodemailer");
const Message = require("../../models/admin/MessageModel");

// Import nodemailer
// const nodemailer = require('nodemailer')

require("dotenv").config();

class MessagesController {
  // GET ALL MESSAGES
  // Récupération de la route "getMessageAll"
  async getListMessages(req, res) {
    // Essayes cette fonction
    try {
      /* SQL récupération de tous les messages
      à partir de la fonction qui a été créé dans le model */
      Message.getListMessages((err, data) => {
        console.log("response controller all messages", data);
        // Si il y a erreur le mentionner
        if (err) res.send({ message: "error in request db" });
        // Sinon retourné cette réponse avec les data
        else
          return res.json({
            messages: data,
            message: "All messages has been successfully GETTED. !!!",
          });
      });
    } catch (error) {
      throw error;
    }
  }

  // GET MESSAGES ID
  // Récupération de la route "getMessageId"
  async getMessageId(req, res) {
    const { id } = req.params;
    // Essayes cette fonction
    try {
      console.log(id, "req.params", { ...req.params });
      Message.getMessageId({ id }, (err, data) => {
        console.log("response controller message ID", data);
        if (err) res.send({ message: "error in request db" });
        // Sinon retourné cette réponse avec les data
        else
          return res.json({
            messages: data,
            message: "The message has been successfully GETTED. !!!",
          });
      });
    } catch (error) {
      throw error;
    }
  }

  // POST MESSAGE
  async replyMessage(req, res) {
    console.log("controller Reply message");
    if ({ ...req.body }) {
      nodemailer.replyMessage(req, res);
    } else res.json("Error Request");
  }

  // DELETE MESSAGE
  async deleteMessage(req, res) {
    try {
      Message.deleteMessage(req.params, (err, data) => {
        if (err) res.send({ message: "error in request db" });
        else
          return res.json({
            mess: data,
            message: " The message has been successfully DELETED.!!",
          });
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MessagesController;
