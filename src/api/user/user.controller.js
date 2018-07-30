// import mongoose from 'mongoose';
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
    /* Model.findOne(id)
      .then((result) => {
        req.user = result;
        if (!req.user || req.user.length === 0) {
          next(new Error('No user with that id'));
        } else {
          next();
        }
      }); */
  },
  getAll(req, res, next) {
    // Model.getAll().then(result => res.json(result));
    Model.find({})
      .then(docs => res.json(docs))
      .catch(error => next(error));
  },
  getOne(req, res /* next, */) {
    res.json(req.user);
  },
  createOne(req, res, next) {
    /* Model.getAll()
      .then(result => Model.createOne(result, req.body))
      .then(result => res.json(result)); */
    Model.create(req.body)
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
  updateOne(req, res, next) {
    /* Model.getAll()
      .then(result => Model.updateOne(result, req.params.id, req.body))
      .then(result => res.json(result)); */
    const newUser = Object.assign(req.user, req.body);
    newUser
      .save()
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
  deleteOne(req, res, next) {
    /* Model.getAll()
      .then(result => Model.deleteOne(result, req.params.id))
      .then(result => res.json(result)); */
    req.user
      .remove()
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
};

export default Controller;
