import Model from './dog.model';

const Controller = {
  findOne(req, res, next, id){
		req.dog = Model.findOne(id);
    if(!req.dog || req.dog.length === 0){
      next(new Error('No dog with that id'));
    } else {
      next();
    }
	},
  getAll(req, res, next){
    let dogs = Model.getAll();
    if(!dogs || dogs.length === 0){
      next(new Error('No dogs exist'));
    }else{
      res.json(dogs);
    }
	},
  getOne(req, res, next){
		res.json(req.dog);
	},
  createOne(req, res, next){
		res.json(Model.createOne(req.body));
	},
  updateOne(req, res, next){
		res.json(Model.updateOne(req.params.id, req.body));
	},
  deleteOne(req, res, next){
		res.json(Model.deleteOne(req.params.id));
	}
}

export default Controller;
