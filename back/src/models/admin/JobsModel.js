/*
 * Model de 'Jobs'
 ******************************/

// Connection à la base de données
const connection = require("../../config/ConnectionDB");

// Model
const Job = function (job) {
    this.offer_id = job.offer_id,
    this.offer_id = job.offer_id,
    this.title = job.title,
    this.type = job.type,
    this.period = job.period,
    this.description = job.description,
    this.profil = job.profil,
    this.isVerified = job.isVerified,
    this.createDate = job.createDate;
};

Job.getJobAll = function (result) {
  console.log("Method getAll Model Jobs");
  // Se connecter à la base de données
  connection.getConnection(function (err, conn) {
    /* Requête SQL pour afficher tous les Jobs 
      de la table offre de la DB Skew */
    conn.query(`SELECT * FROM offre`, (error, data) => {
      //   Si erreur l'afficher
      if (error) throw error;
      //   Sinon afficher les datas
      else result(null, data);
    });
    // Stop la function une fois exécutée
    conn.release();
  });
};

// Get One Job
Job.getJobId = function (job, result) {
  // console.log("Method getID Model User", user);
  const { id } = job;
  connection.getConnection(function (error, conn) {
    conn.query(` SELECT * FROM offre WHERE offer_id = :id;`, { id }, (error, data) => {
      if (error) throw error;
      else result(null, data);
      // console.log("data", data);
    });
    conn.release();
  });
};




// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = Job;
