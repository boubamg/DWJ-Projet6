const Sauce = require("../models/Sauce");

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'La Sauce a bien été ajoutée'}))
    .catch(err => res.status(400).json({err}));
}

exports.getAllSauce = (req, res) => {
    Sauce.find()
    .then(sauces => {
        res.status(200).json(sauces)})
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

exports.likeSauce = (req, res) => {
    switch (req.body.like) {

        // dislike sauce
        case -1 :

            Sauce.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
            })
            .then(() => res.status(201).json({ message: 'Sauce was disliked' }) )
            .catch(err => res.status(400).json({ err }) );

            break;

        // take off like or dislike
        case 0 :

            // find sauce
            Sauce.findOne({ _id: req.params.id })
            .then(sauce => {

                let usersLiked = sauce.usersLiked;
                let findLike = usersLiked.indexOf(req.body.userId)

                // look at if user like that sauce
                // if yes : 
                if (findLike !== -1){
                    Sauce.updateOne({ _id: req.params.id }, {
                        $pull : { usersLiked : req.body.userId },
                        $inc : { likes : -1 }
                    });
                    return res.status(201).json({ message : "Like has been taken off" })
                }

                let usersDisliked = sauce.usersDisliked;
                let findDislike = usersDisliked.indexOf(req.body.userId); 

                // look at if user dislike that sauce
                // if yes :
                if (findDislike !== -1){
                    Sauce.updateOne({ _id: req.params.id }, {
                        $pull : { usersDisliked : req.body.userId },
                        $inc : { dislikes : -1 }
                    });
                    return res.status(201).json({ message : "Dislike has been taken off" });
                }  
            }).catch(err => res.status(400).json({ err }))

        // like sauce
        case 1 :
            
            Sauce.updateOne({ _id: req.params.id }, {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
            })
            .then(() => res.status(201).json({ message: 'Sauce was liked' }) )
            .catch(err =>  res.status(400).json({ err }) );

            break;                
    }
}

