const Sauce = require("../models/Sauce");

exports.createSauce = (req, res) => {
    const sauceParsed = JSON.parse(req.body.sauce);
    delete sauceParsed._id;   
    const sauce = new Sauce({
        ...sauceParsed,
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
    const sauceParsed = JSON.parse(req.body.sauce);

    Sauce.updateOne({_id : req.params.id}, {...sauceParsed, _id: req.params.id})
    .then(() => res.status(201).json({ message: 'La Sauce a bien été modifiée' }))
    .catch(err => res.status(404).json({ err }));
};

exports.deleteSauce = (req, res) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'La Sauce a bien été supprimée'}))
      .catch(err => res.status(400).json({ err }));
};