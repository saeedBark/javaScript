const sql = require("./db.js");

// constructor
const Personne = function(person) {
  this.nom = person.nom;
  this.prenom = person.prenom;
  this.age = person.age;
  this.nni = person.nni;

};

Personne.create = (newPersonne, result) => {
  sql.query("INSERT INTO personne SET ?", newPersonne, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created person: ",   { id: res.insertId, ...newPersonne });
    result(null, { id: res.insertId, ...newPersonne });
  });
};

Personne.findById = (id, result) => {
  sql.query(`SELECT * FROM personne WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found person: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Personne with the id
    result({ kind: "not_found" }, null);
  });
};

Personne.getAll = (nom, result) => {
  let query = "SELECT * FROM personne";

  if (nom) {
    query += ` WHERE nom LIKE '%${nom}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("personne: ", res);
    result(null, res);
  });
};

Personne.getAllPersonne = result => {
  sql.query("SELECT * FROM personne ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("personne: ", res);
    result(null, res);
  });
};

Personne.updateById = (id, person, result) => {
  sql.query(
    "UPDATE personne SET nom = ?, prenom = ?, age = ?,nni = ? WHERE id = ?",
    [person.nom, person.prenom, person.age, person.nni, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Personne with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated person: ", { id: id, ...person });
      result(null, { id: id, ...person });
    }
  );
};

Personne.remove = (id, result) => {
  sql.query("DELETE FROM personne WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Personne with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted person with id: ", id);
    result(null, res);
  });
};

Personne.removeAll = result => {
  sql.query("DELETE FROM personne", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} personne`);
    result(null, res);
  });
};

module.exports = Personne;
