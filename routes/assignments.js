let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
async function getAssignments(req, res) {
  // const aAssignment = await Assignment.find();
  // aAssignment.forEach(async assignment => {
  //   if (!assignment.etat) {
  //     assignment.note = null;
  //     assignment.nomEleve = "";
  //     assignment.remarque = "";
  //     await assignment.save();
  //   }
  // })
  let filter = {};
  if (req.query.renduFilter == 1) {
    filter = { ...filter, etat: true };
  } else if(req.query.renduFilter == 2) {
    filter = { ...filter, etat: false };
  }
  if (req.query.nameFilter) {
    filter = { nom: { $regex: req.query.nameFilter, $options: "i" } };
  }
  
  if (req.query.matiereFilter) {
    filter = { ...filter, matiere: req.query.matiereFilter };
  }

  if (req.query.promotionFilter) {
    filter = { ...filter, formationConcernee: req.query.promotionFilter };
  }

  var aggregateQuery = Assignment.aggregate([{
    $match: filter
  }]);

  Assignment.aggregatePaginate(aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,

    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}

// Récupérer un assignment par son id (GET)
const getAssignment = async (req, res) => {
  let assignmentId = req.params.id;

  const assignment = await Assignment.findById(assignmentId);

  if (assignment) {
    res.send(assignment);
  }
  else {
    res.status(404).send({ message: 'Assignment not found' });
  }
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.nom = req.body.nom;
  assignment.dateLimite = req.body.dateLimite;
  assignment.etat = req.body.etat;
  assignment.matiere = req.body.matiere;
  assignment.note = req.body.note;
  assignment.remarque = req.body.remarque;
  assignment.nomEleve = req.body.nomEleve;
  assignment.formationConcernee = req.body.formationConcernee;

  console.log("POST assignment reçu :");
  console.log(assignment)

  assignment.save((err) => {
    if (err) {
      res.send('cant post assignment ', err);
    }
    res.json({ message: `${assignment.nom} saved!` })
  })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);
  Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      res.json({ message: 'updated' })
    }

    // console.log('updated ', assignment)
  });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  console.log(req.params.id);
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.send({ message: `${assignment.nom} deleted` });
  })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
