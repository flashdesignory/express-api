import Model from './dog.model';

// example: http://10.6.6.33:3000/dog/5b5f93524ba72212e6d49ba5

const Controller = {
  findOne(req, res, next, id) {
    // var paramId = mongoose.Types.ObjectId(id.toString());
    var paramId = id;
    Model.findById(paramId)
      .then((doc) => {
        if (!doc) {
          next(new Error('Not Found Error'));
        } else {
          req.dog = doc;
          next();
        }
      })
      .catch((error) => {
        next(error);
      });
  },
  getAll(req, res, next) {
    Model.find({})
      .then(docs => res.json(docs))
      .catch(error => next(error));
  },
  getOne(req, res /* next, */) {
    res.json(req.dog);
  },
  createOne(req, res, next) {
    Model.create(req.body)
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
  updateOne(req, res, next) {
    const newDog = Object.assign(req.dog, req.body);
    newDog
      .save()
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
  deleteOne(req, res, next) {
    req.dog
      .remove()
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
};

export default Controller;
