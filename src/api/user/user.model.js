import createUniqueId from '../utils/utils.js';

var users =  [
    {
      "id":"0",
      "first_name":"joe",
      "last_name": "doe",
    },
    {
      "id":"1",
      "first_name":"steve",
      "last_name": "smith",
    },
    {
      "id":"2",
      "first_name":"tom",
      "last_name": "doodle",
    }
  ];

const Model = {
  findOne(id) {
    return users.filter((user) => user.id === id);
  },
  getAll() {
    return users;
  },
  createOne(value) {
    let id = createUniqueId();
    users.push({...value, id});
    return users;
  },
  getOne(id) {
    return users.filter((user) => user.id === id);
  },
  updateOne(id,value) {
    users = users.map((user) => {
      if(user.id === id){
        user = {...user, ...value}
      }
      return user;
    });
    return users;
  },
  deleteOne(id) {
    return users = users.filter((user) => user.id !== id);
  }
}

export default Model;
