import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const connect = () => mongoose.connect(
  process.env.DATA_CONNECTION,
  { useNewUrlParser: true },
);

export default connect;
