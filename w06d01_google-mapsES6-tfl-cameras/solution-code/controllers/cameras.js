const Camera = require('../models/camera');

function camerasIndex(req, res){
  Camera.find((err, cameras) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ cameras: cameras });
  });
}

module.exports = {
  index: camerasIndex
};
