const sql = require("./db.js");

// constructor
const Personne = function(person) {
  this.nom = person.nom;
  this.email = person.email;
  this.nni = person.nni;
  this.phone = person.phone;
  this.salary = person.salary;
  this.department = person.department;
  this.nbPres = person.nbPres;
  this.nbAbs = person.nbAbs;

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

//////// get count users
Personne.getTotalCount = result => {
  sql.query("SELECT COUNT(*) AS totalUsers FROM personne", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    result(null, res[0].totalUsers);
  });
}
///// search
// Model function to get all users or filter by name
Personne.getAll = result => {
  sql.query("SELECT * FROM personnes", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Personne.getUsersByName = (nom, result) => {
  sql.query("SELECT * FROM personnes WHERE nom LIKE ?", [`%${nom}%`], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Personne.updateById = (id, person, result) => {
  sql.query(
    "UPDATE personne SET nom = ?, email = ?, nni = ?,phone = ?,salary = ?, department = ?, nbPres = ?, nbAbs = ? WHERE id = ?",
    [person.nom, person.email,person.nni, person.phone, person.salary,person.department, person.nbPres,person.nbAbs, id],
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
