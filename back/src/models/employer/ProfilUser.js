// import module connection de la base de données
const connection = require("../../config/ConnectionDB");

//Creation du Constructeur profilUser pour exporter les fonctions dans ce model model
const ProfilUser = function (profilUser) {
  (this.id = profilUser.id), (this.mail = profilUser.mail);
};
// console.log("profilUser dans model", ProfilUser);

//Creation du constructeur profilUserCompagny pour exporter les fonctions dans ce model model
const ProfilUserCompagny = function (profilUserCompagny) {
  this.user_id = Number(profilUserCompagny.user_id),
    this.name = String(profilUserCompagny.name),
    this.address = String(profilUserCompagny.address),
    this.town = String(profilUserCompagny.town),
    this.zipCode = Number(profilUserCompagny.zipCode),
    this.avatar = String(profilUserCompagny.avatar),
    this.siret = Number(profilUserCompagny.siret)
  this.siren = Number(profilUserCompagny.siren),
    this.category = String(profilUserCompagny.category);
};

// Get profil employer User (by id)
ProfilUser.getById = function (id, result) {
  // console.log("model Profiluser", id, result)  
  //ici on se connect à la base de donnée en appellant le module importé
  connection.getConnection(function (error, conn) {
    if (error) throw error;
    // si la connection est établie alors on fait la requete Sql,
    // ici on fait un select de la table user par l'ID en gradant que les colonnes id, mail, date update et date create
    conn.query(
      `SELECT id,mail,date_update, date_create
     FROM user WHERE id = ${id}`,
      (error, data) => {
        if (error) throw error;
        result(null, data);
        // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
        conn.release();
      }
    );
  });
};

// Update mail in profil employer User (by id)
ProfilUser.editMail = function (profilUserObj, oldMail, result) {
  // console.log(
  //   "edit mail in Model:",
  //   "id:",
  //   typeof profilUserObj.id,
  //   profilUserObj.id,
  //   "mail:",
  //   profilUserObj.mail,
  //   "oldMail:",
  //   oldMail
  // );
  //ici on se connect à la base de donnée en appellant le module importé
  connection.getConnection(function (error, conn) {
    // ici on fait un update de la colonne mail de la table user par l'ID
    conn.query(
      `
          UPDATE user
              SET mail = '${profilUserObj.mail}'
              WHERE id = ${profilUserObj.id}
        `,
      (error, data) => {
        if (error) throw error;
        // ici on fait un select de la table user par l'ID en gradant que les colonnes id, mail, date update et date create
        conn.query(
          `SELECT id,mail,date_update, date_create
          FROM user WHERE id = ${profilUserObj.id}`,
          (error, data) => {
            if (error) throw error;
            result(null, data);
          }
        );
        // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
        conn.release();
      }
    );
  });
};

// Get profil employer User (by id)
ProfilUserCompagny.getProfilCompagnyById = function (id, result) {
  // console.log("model Profiluser", id, result)

  //ici on se connect à la base de donnée en appellant le module importé
  connection.getConnection(function (error, conn) {
    if (error) throw error;
    // si la connection est établie alors on fait la requete Sql,
    // ici on fait un select de la table user par l'ID en gradant que les colonnes id, mail, date update et date create
    conn.query(
      `SELECT user_id, name, address,town,zipCode,avatar,siret,siren,category
     FROM contactProfil WHERE user_id = ${id}`,
      (error, data) => {
        if (error) throw error;
        result(null, data);
        // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
        conn.release();
      }
    );
  });
};

// Creation profil employer User
ProfilUserCompagny.createProfilCompagny = function (
  profilUserCompagny,
  result
) {
  // console.log("Model for create profil entreprise", profilUserCompagny);
  //ici on se connect à la base de donnée en appellant le module importé
  connection.getConnection(function (error, conn) {
    conn.query(
      `INSERT INTO contactProfil (
      user_id,name,
      address,town,
      zipCode,avatar,
      siret,
      siren,
      category)
      VALUES (
        ${profilUserCompagny.user_id},
        "${profilUserCompagny.name}",
        "${profilUserCompagny.address}",
        "${profilUserCompagny.town}",
        ${profilUserCompagny.zipCode},
        "${profilUserCompagny.avatar}",
        ${profilUserCompagny.siret},
        ${profilUserCompagny.siren},
        "${profilUserCompagny.category}")
        `,
      (error, data) => {
        if (error) throw error;
        // ici on fait un select de la table user par l'ID en gradant que les colonnes id, mail, date update et date create
        conn.query(
          `SELECT user_id, name, address,town,zipCode,avatar,siret,siren,category
         FROM contactProfil WHERE user_id = ${profilUserCompagny.user_id}`,
          (error, data) => {
            if (error) throw error;
            result(null, data);
            // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
          }
        );
        // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
        conn.release();
      }
    );
  });
};

// Update profil employer User
ProfilUserCompagny.updateProfilCompagny = function (
  profilUserCompagnyObj,
  result
) {
  console.log("Model for update profil entreprise", profilUserCompagnyObj);
  //ici on se connect à la base de donnée en appellant le module importé
  connection.getConnection(function (error, conn) {
    conn.query(
      `
      UPDATE contactProfil
          SET name = '${profilUserCompagnyObj.name}',
          address = \"${profilUserCompagnyObj.address}"\,
          town = '${profilUserCompagnyObj.town}',
          zipCode = '${profilUserCompagnyObj.zipCode}',
          avatar = '${profilUserCompagnyObj.avatar}',
          siret = '${profilUserCompagnyObj.siret}',
          siren = '${profilUserCompagnyObj.siren}',
          category = '${profilUserCompagnyObj.category}' 
          WHERE user_id = ${profilUserCompagnyObj.user_id}
    `,
      (error, data) => {
        if (error) throw error;
        // ici on fait un select de la table user par l'ID en gradant que les colonnes id, mail, date update et date create
        conn.query(
          `SELECT user_id, name, address,town,zipCode,avatar,siret,siren,category
         FROM contactProfil WHERE user_id = ${profilUserCompagnyObj.user_id}`,
          (error, data) => {
            if (error) throw error;
            result(null, data);
            // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
          }
        );
        // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
        conn.release();
      }
    );
  });
};

module.exports = { ProfilUser, ProfilUserCompagny }

// name = '${profilUserCompagnyObj.name}'
// address = '${profilUserCompagnyObj.address}',
//   town = '${profilUserCompagnyObj.town}',
//   zipCode = '${profilUserCompagnyObj.zipCode}',
//   avatar = '${profilUserCompagnyObj.avatar}',
//   siret = '${profilUserCompagnyObj.siret}',
//   siren = '${profilUserCompagnyObj.siren}',
//   category = '${profilUserCompagnyObj.category}'   