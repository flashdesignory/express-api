import express from 'express';
import Controller from './user.controller';

const router = express.Router();

router.param('id', Controller.findOne);

router.route('/')
	.get(Controller.getAll)
	.post(Controller.createOne);

router.route('/:id')
	.get(Controller.getOne)
	.put(Controller.updateOne)
	.delete(Controller.deleteOne);

export default router;
