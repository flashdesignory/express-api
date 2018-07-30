// import mongoose from 'mongoose';
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
    /* .then((result) => {
      console.log(result);
      req.dog = result;
      if (!req.dog || req.dog.length === 0) {
        next(new Error('No dog with that id'));
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
    res.json(req.dog);
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
    const newDog = Object.assign(req.dog, req.body);
    newDog
      .save()
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
  deleteOne(req, res, next) {
    /* Model.getAll()
      .then(result => Model.deleteOne(result, req.params.id))
      .then(result => res.json(result)); */
    req.dog
      .remove()
      .then(doc => res.status(201).json(doc))
      .catch(error => next(error));
  },
};

export default Controller;
