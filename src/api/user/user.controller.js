import Model from './user.model';

const Controller = {
  findOne(req, res, next, id){
		req.user = Model.findOne(id);
    if(!req.user || req.user.length === 0){
      next(new Error('No user with that id'));
    } else {
      next();
    }
	},
  getAll(req, res, next){
    let users = Model.getAll();
    if(!users || users.length === 0){
      next(new Error('No users exist'));
    }else{
      res.json(users);
    }
	},
  getOne(req, res, next){
		res.json(req.user);
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
