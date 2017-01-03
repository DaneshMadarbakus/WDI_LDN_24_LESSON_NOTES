const Shoe = require("../models/shoe");

function shoesCreate(req, res) {
  Shoe.create(req.body.shoe, (err, shoe) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!shoe) return res.status(500).json({ success: false, message: "Please send the correct information to create a shoe." });
    return res.status(201).json({ shoe });
  });
}

function shoesIndex(req, res) {
  Shoe.find((err, shoes) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!shoes) return res.status(500).json({ success: false, message: "No shoes found" });
    return res.status(200).json({ shoes });
  });
}

function shoesShow(req, res) {
  Shoe.findById(req.params.id, (err, shoe) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!shoe) return res.status(500).json({ success: false, message: "No shoe found" });
    return res.status(200).json({ shoe });
  });
}

function shoesUpdate(req, res) {
  Shoe.findByIdAndUpdate(req.params.id, req.body.shoe, (err, shoe) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!shoe) return res.status(500).json({ success: false, message: "No shoe found" });
    return res.status(204).json({ success: true });
  });
}

function shoesDelete(req, res) {
  Shoe.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(500).json({ success: false, message: err });
    return res.status(204).json({ success: true });
  });
}

module.exports = {
  create: shoesCreate,
  index: shoesIndex,
  show: shoesShow,
  update: shoesUpdate,
  delete: shoesDelete
};
