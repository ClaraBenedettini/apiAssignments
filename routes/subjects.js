let Subject = require('../model/subjects');

// Récupérer un assignment par son id (GET)
const getSubject = async (req, res) => {
  let subjectId = req.params.id;

  const subject = await Subject.findById(subjectId);

  if (subject) {
    res.send(subject);
  }
  else {
    res.status(404).send({ message: 'Subject not found' });
  }
}

const getSubjects = async (req, res) => {
  
    const subject = await Subject.find();
    
    if (subject) {
      res.send(subject);
    }
    else {
      res.status(404).send({ message: 'no subjects' });
    }
  }
  








module.exports = { getSubject, getSubjects};
