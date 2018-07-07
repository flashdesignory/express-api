import Model from './dog.model';

const Controller = {
  findOne(req, res, next, id) {
    Model.findOne(id)
      .then((result) => {
        req.dog = result;
        if (!req.dog || req.dog.length === 0) {
          next(new Error('No dog with that id'));
        } else {
          next();
        }
      });
  },
  getAll(req, res /* next, */) {
    Model.getAll()
      .then(result => res.json(result));
  },
  getOne(req, res /* next, */) {
    res.json(req.dog);
  },
  createOne(req, res /* next, */) {
    Model.getAll()
      .then(result => Model.createOne(result, req.body))
      .then(result => res.json(result));
  },
  updateOne(req, res /* next, */) {
    Model.getAll()
      .then(result => Model.updateOne(result, req.params.id, req.body))
      .then(result => res.json(result));
  },
  deleteOne(req, res /* next, */) {
    Model.getAll()
      .then(result => Model.deleteOne(result, req.params.id))
      .then(result => res.json(result));
  },
};

export default Controller;
