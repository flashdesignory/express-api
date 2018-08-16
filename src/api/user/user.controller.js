import Model from './user.model';

const Controller = {
  findOne(req, res, next, id) {
    // var paramId = mongoose.Types.ObjectId(id.toString());
    var paramId = id;
    Model.findById(paramId)
      .then((doc) => {
        if (!doc) {
          next(new Error('Not Found Error'));
        } else {
          req.user = doc;
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
    res.json(req.user);
  },
  createOne(req, res, next) {
    Model.create(req.body)
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
  updateOne(req, res, next) {
    const newUser = Object.assign(req.user, req.body);
    newUser
      .save()
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
  deleteOne(req, res, next) {
    req.user
      .remove()
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
};

export default Controller;
