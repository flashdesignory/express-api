import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
  },
  owner: {
    type: String,
    required: [true, 'An owner is required'],
  },
});

const Model = mongoose.model('dog', dogSchema);

export default Model;
