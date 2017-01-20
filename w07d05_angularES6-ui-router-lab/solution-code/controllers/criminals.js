const Criminal = require('../models/criminal');

function criminalsIndex(req, res) {
  Criminal.find({}, (err, criminals) => {
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    return res.status(200).json(criminals);
  });
}

function criminalsShow(req, res) {
  Criminal.findById(req.params.id, (err, criminal) => {
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    if (!criminal) return res.status(404).json({message: 'No criminal was found.'});
    return res.status(200).json(criminal);
  });
}

function criminalsCreate(req, res) {
  const criminal = new Criminal(req.body);
  criminal.save(err => {
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    return res.status(201).json(criminal);
  });
}

function criminalsUpdate(req, res) {
  Criminal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, criminal) => {
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    if (!criminal) return res.status(404).json({message: 'No criminal was found.'});
    return res.status(200).json(criminal);
  });
}

function criminalsDelete(req, res) {
  Criminal.findByIdAndRemove(req.params.id, (err, criminal) => {
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    if (!criminal) return res.status(404).json({message: 'No criminal was found.'});
    return res.status(200).json({message: 'Criminal successfully deleted'});
  });
}

module.exports = {
  index: criminalsIndex,
  create: criminalsCreate,
  show: criminalsShow,
  update: criminalsUpdate,
  delete: criminalsDelete
};
