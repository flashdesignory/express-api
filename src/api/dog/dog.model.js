/* import fs from 'fs';
import path from 'path';
import createUniqueId from '../utils/utils';

const url = process.env.DATA_URL
  ? path.join(__dirname, process.env.DATA_URL_DOG)
  : path.join(__dirname, '../../data/dog.data.json');

const Model = {
  findOne(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(url, 'utf8', (error, result) => {
        if (error) {
          reject(error);
        } else {
          const data = JSON.parse(result);
          const dog = data.dogs.filter(value => value.id === id);
          resolve(dog);
        }
      });
    });
  },
  getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(url, 'utf8', (error, result) => {
        if (error) {
          reject(error);
        } else {
          const data = JSON.parse(result);
          resolve(data.dogs);
        }
      });
    });
  },
  createOne(newDogs, newDog) {
    const id = createUniqueId();
    newDogs.push({ ...newDog, id });
    const newData = { dogs: newDogs };
    return new Promise((resolve, reject) => {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(newDogs);
        }
      });
    });
  },
  updateOne(oldDogs, id, value) {
    let result;
    const newDogs = oldDogs.map((dog) => {
      if (dog.id === id) {
        result = { ...dog, ...value };
      }
      return result;
    });
    const newData = { dogs: newDogs };
    return new Promise((resolve, reject) => {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(newDogs);
        }
      });
    });
  },
  deleteOne(oldDogs, id) {
    const newDogs = oldDogs.filter(dog => dog.id !== id);
    const newData = { dogs: newDogs };
    return new Promise((resolve, reject) => {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(newDogs);
        }
      });
    });
  },
};

export default Model; */

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
