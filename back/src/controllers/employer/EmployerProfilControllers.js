// Import Model
const {
  ProfilUser,
  ProfilUserCompagny,
} = require("../../models/employer/ProfilUserModel");

const jwt = require("jsonwebtoken");
const checkValidContentToken = require("../../utils/checkValidContentToken");

const func = require("../../utils/function"),
  path = require("path");

// const class du controlleur EmployerProfilControlleur
class EmployerProfilControllers {
  //action get ProfilUser
  async getProfilUser(req, res) {
    // console.log("controller get Profil user Employeur");
    const decoded = jwt.decode(req.headers["authorization"], {
      complete: true,
    });
    const id = decoded.payload.id;

    // Appel de la fonction getById dans model ProfilUser en passant la data req.params.id
    try {
      //ici String est une coercion qui permet de typer la variable
      ProfilUser.getById(String(id), async (err, data) => {
        // console.log("dataid res", data);
        //Si erreur alors affiche console log erreur et res.status
        if (err) {
          console.log("err", err),
            res.status(500).send({
              message: err.message || "Une erreur est survenue",
            });
          //sinon on envoi les datas retournées du model en format json (data ds controller= result ds model)
        } else {
          return res.json({
            method: req.method,
            status: "success",
            message: "Votre profil utilisateur",
            dataProfilUser: data,
            token: await checkValidContentToken.validContentToken(
              decoded.payload.mail
            ),
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  //action Update mail ProfilUser
  async updateProfilUser(req, res) {
    // console.log(
    //   "controller get Profil user Employeur",
    //   req.body,
    //   req.params.id
    // );
    const decoded = jwt.decode(req.headers["authorization"], {
      complete: true,
    });
    const id = decoded.payload.id;
    if (id && req.body.mail) {
      // console.log("controller update mail", req.body);
      let profilUserObj = new ProfilUser({
        id: Number(id),
        mail: String(req.body.mail),
      });
      // console.log("controller new profilUserObj", profilUserObj, req.body.oldMail);
      // Appel de la fonction editmail dans model ProfilUser en passant l'objet profilUserObj et req.body.oldMail
      try {
        ProfilUser.editMail(
          profilUserObj,
          req.body.oldmail,
          async (err, data) => {
            //Si erreur alors affiche console log erreur et res.status
            if (err) {
              console.log("err", err),
                res.status(500).send({
                  message: err.message || "Une erreur est survenue",
                });
            } else {
              //sinon on envoi les datas retournées du model en format json (data ds controller= result ds model)
              // console.log(data.message);
              if (data.message === "errorEmail") {
                return res.json({
                  method: req.method,
                  status: "success",
                  message: "Adresse mail déjà utilisée",
                  dataProfilUser: data,
                  token: await checkValidContentToken.validContentToken(
                    decoded.payload.mail
                  ),
                });
              } else {
                return res.json({
                  method: req.method,
                  status: "success",
                  message: "Votre email a bien été modifié",
                  dataProfilUser: data,
                  token: await checkValidContentToken.validContentToken(
                    decoded.payload.mail
                  ),
                });
              }
            }
          }
        );
      } catch (error) {
        throw error;
      }
    } else res.json("Error Request");
  }

  //action Update password ProfilUser
  async updateProfilUserPw(req, res) {
    // console.log(
    //   "controller get Profil PW user Employeur",
    //   req.body,
    //   // req.params.id
    // );
    const decoded = jwt.decode(req.headers["authorization"], {
      complete: true,
    });
    const id = decoded.payload.id;
    if (id && req.body.mail && req.body.password && req.body.oldPassword) {
      // console.log("controller update mail", req.body);
      let profilUserObj = new ProfilUser({
        id: id,
        mail: req.body.mail,
        pass: req.body.password,
      });
      try {
        ProfilUser.editPw(
          profilUserObj,
          req.body.oldPassword,
          async (err, data, errorModel) => {
            if (err) {
              console.log("err", err),
                res.status(500).send({
                  message: err.message || "Une erreur est survenue",
                });
            } else {
              if (errorModel) {
                return res.json({
                  method: req.method,
                  status: "error",
                  message: "Votre ancien mot de passe est incorrect",
                  dataProfilUser: data,
                  token: await checkValidContentToken.validContentToken(
                    decoded.payload.mail
                  ),
                });
              } else {
                return res.json({
                  method: req.method,
                  status: "success",
                  message: "Votre mot de passe a bien été modifié",
                  dataProfilUser: data,
                  token: await checkValidContentToken.validContentToken(
                    decoded.payload.mail
                  ),
                });
              }
            }
          }
        );
      } catch (error) {
        throw error;
      }
    } else res.json("Error Request");
  }

  //action get profil entreprise
  async getProfilCompagny(req, res) {
    const decoded = jwt.decode(req.headers["authorization"], {
      complete: true,
    });
    const id = decoded.payload.id;
    // console.log("controller get profil Compagny");new TokenJWT().checkToken
    // Appel de la fonction getById dans model ProfilUser en passant la data req.params.id
    try {
      //ici String est une coercion qui permet de typer la variable
      ProfilUserCompagny.getProfilCompagnyById(
        String(id),
        async (err, data) => {
          // console.log("dataid res", data);
          //Si erreur alors affiche console log erreur et res.status
          if (err) {
            console.log("err", err),
              res.status(500).send({
                message: err.message || "Une erreur est survenue",
              });
            //sinon on envoi les datas retournées du model en format json (data ds controller= result ds model)
          } else {
            return res.json({
              method: req.method,
              status: "success",
              message: "Votre profil entreprise",
              dataProfilEmployer: data,
              token: await checkValidContentToken.validContentToken(
                decoded.payload.mail
              ),
            });
          }
        }
      );
    } catch (error) {
      throw error;
    }
  }

  //action modifier profil entreprise
  async updateProfilCompagny(req, res) {
    let profilUserCompagnyObj;

    const decoded = jwt.decode(req.headers["authorization"], {
      complete: true,
    });
    const id = decoded.payload.id;

    if (id > 0) {
      profilUserCompagnyObj = new ProfilUserCompagny({
        user_id: id,
        ...req.body,    
      });

      try {
        ProfilUserCompagny.updateProfilCompagny(
          profilUserCompagnyObj,
          req.file,
          async (err, data) => {
            //Si erreur alors affiche console log erreur et res.status
            if (err) {
              console.log("err", err),
                res.status(500).send({
                  message: err.message || "Une erreur est survenue",
                  token: await checkValidContentToken.validContentToken(
                    decoded.payload.mail)
                });
            } else {
              //sinon on envoi les datas retournées du model en format json (data ds controller= result ds model)
              return res.json({
                method: req.method,
                status: "success",
                message: "Votre profil entreprise a été modifié",
                dataProfilEmployer: data,
                token: await checkValidContentToken.validContentToken(
                  decoded.payload.mail
                ),
              });
            }
          }
        );
      } catch (error) {
        throw error;
      }
    } else res.json("Error Request");
  }

  //  Plus utlisé dans l'application car profil crée par défaut au register
  // Utiliser pour test postman
  //action creation profil entreprise
  async createProfilCompagny(req, res) {
    // console.log(
    //   "controller post Profil Compagny Employeur",
    //   req.body
    // );

    let index = req.file.mimetype.indexOf("image");
    if (index !== -1) {
      // Recupère le chemin complet avec extention .webp ou l'image a été enregister avec sharp (avec le nom orignal)
      const pathImgWebp = path.resolve(
        pathAvatar +
        req.file.filename.split(".").slice(0, -1).join(".") +
        ".webp"
      );
      // console.log("pathImgWebp", pathImgWebp);
      const pathAvatarWebp = path.resolve(
        pathAvatar + "avatar_user_" + req.body.user_id + ".webp"
      );
      // console.log("pathAvatarWebp", pathAvatarWebp);

      setTimeout(function () {
        //ici on rename le file convertit en webp avec le nouveau nom
        func.renameFile(pathImgWebp, pathAvatarWebp);
      }, 600); //delay is in milliseconds
    }
    if (req.body.user_id && req.file) {
      // console.log("post Profil Compagny Employeur", req.body);
      let profilUserCompagnyObj = new ProfilUserCompagny({
        avatar: pathAvatarDb + "avatar_user_" + req.body.user_id + ".webp",
        ...req.body,
      });
      // console.log("post Profil Compagny Employeur profilUserObj ", profilUserCompagnyObj );
      // Appel de la fonction editmail dans model ProfilUser en passant l'objet profilUserObj et req.body.oldMail
      try {
        ProfilUserCompagny.createProfilCompagny(
          profilUserCompagnyObj,
          (err, data) => {
            //Si erreur alors affiche console log erreur et res.status
            if (err) {
              console.log("err", err),
                res.status(500).send({
                  message: err.message || "Une erreur est survenue",
                });
            } else {
              //sinon on envoi les datas retournées du model en format json (data ds controller= result ds model)
              return res.json({
                method: req.method,
                status: "success",
                message: "Votre profil entreprise a été crée",
                dataProfilEmployer: data,
              });
            }
          }
        );
      } catch (error) {
        throw error;
      }
    } else res.json("Error Request");
  }
}

module.exports = EmployerProfilControllers;
