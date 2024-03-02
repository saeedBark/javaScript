module.exports = app => {
  const personne = require("../controllers/personne.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/add-person", personne.create);

  // Retrieve all Tutorials
  router.get("/", personne.findAll);

  // Retrieve all PerfindAllPersonne Tutorials
  router.get("/personnes", personne.findAllPersonne);

  // Retrieve a single Tutorial with id
  router.get("/:id", personne.findOne);

  // Update a Tutorial with id
  router.put("/:id", personne.update);

  // Delete a Tutorial with id
  router.delete("/:id", personne.delete);

  // Delete all Tutorials
  router.delete("/", personne.deleteAll);

  app.use('/api/personnes', router);
};
