const Personne = require("../models/personne.model.js");
 
// Create and Save a new Personne
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Personne
  const personne = new Personne({
    nom: req.body.nom,
    prenom: req.body.prenom,
    age: req.body.age,
    nni: req.body.nni,
    // Personne: req.body.Personne || false
  });

  // Save Personne in the database
  Personne.create(personne, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Personne."
      });
    else res.send(data);
  });
};

// Retrieve all Personnes from the database (with condition).
exports.findAll = (req, res) => {
  const nom = req.query.nom;

  Personne.getAll(nom, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving personnes."
      });
    else res.send(data);
  });
};

// Find a single Personne by Id
exports.findOne = (req, res) => {
  Personne.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Personne with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Personne with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all Personne Personnes
exports.findAllPersonne = (req, res) => {
  Personne.getAllPersonne((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving personnes."
      });
    else res.send(data);
  });
};

// Update a Personne identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Personne.updateById(
    req.params.id,
    new Personne(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Personne with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Personne with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Personne with the specified id in the request
exports.delete = (req, res) => {
  Personne.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Personne with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Personne with id " + req.params.id
        });
      }
    } else res.send({ message: `Personne was deleted successfully!` });
  });
};

// Delete all Personnes from the database.
exports.deleteAll = (req, res) => {
  Personne.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all personnes."
      });
    else res.send({ message: `All Personnes were deleted successfully!` });
  });
};
