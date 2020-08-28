const Sauce = require("../models/Sauce");

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;   
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'La Sauce a bien été ajoutée'}))
    .catch(err => res.status(400).json({err}));
}

exports.getAllSauce = (req, res) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(400).json({ err }));
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(err => res.status(404).json({ err }));
};

exports.modifySauce = (req, res) => {
    const sauceObject = req.file ?
    { ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(201).json({ message: 'La Sauce a bien été modifiée' }))
    .catch(err => res.status(404).json({ err }));
};

exports.deleteSauce = (req, res) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'La Sauce a bien été supprimée'}))
      .catch(err => res.status(400).json({ err }));
};