import createUniqueId from '../utils/utils.js';

var dogs =  [
  {
    "id": "0",
    "name": "fifi",
    "owner": "nikki"
  },
  {
    "id": "1",
    "name": "woof",
    "owner": "crystal"
  },
  {
    "id": "2",
    "name": "moe",
    "owner": "six"
  }
]

const Model = {
  findOne(id) {
    return dogs.filter((dog) => dog.id === id);
  },
  getAll() {
    return dogs;
  },
  createOne(value) {
    let id = createUniqueId();
    dogs.push({...value, id});
    return dogs;
  },
  getOne(id) {
    return dogs.filter((dog) => dog.id === id);
  },
  updateOne(id,value) {
    dogs = dogs.map((dog) => {
      if(dog.id === id){
        dog = {...dog, ...value}
      }
      return dog;
    });
    return dogs;
  },
  deleteOne(id) {
    return dogs = dogs.filter((dog) => dog.id !== id);
  }
}

export default Model;
