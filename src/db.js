import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const connect = () => {
  console.log(`url: ${process.env.DATA_CONNECTION}`);
  mongoose.connect(
    process.env.DATA_CONNECTION,
    { useNewUrlParser: true },
  );
};

export default connect;
