import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'A first name is required'],
  },
  last_name: {
    type: String,
    required: [true, 'A last name is required'],
  },
});

const User = mongoose.model('user', userSchema);

export default User;
