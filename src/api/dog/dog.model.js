import createUniqueId from '../utils/utils.js';

import fs from 'fs';
import path from 'path';
const url = path.join(__dirname, '../../data/dog.data.json');

const Model = {
  findOne(id) {
    return new Promise((resolve, reject)=> {
      fs.readFile(url, 'utf8', (error, result) => {
        if(error){
          reject(error);
        }else{
          let data = JSON.parse(result);
          let dog = data.dogs.filter((dog) => dog.id === id);
          resolve(dog)
        }
      })
    })
  },
  getAll() {
    return new Promise((resolve, reject)=> {
      fs.readFile(url, 'utf8', (error, result) => {
        if(error){
          reject(error);
        }else{
          let data = JSON.parse(result);
          resolve(data.dogs)
        }
      })
    })
  },
  createOne(newDogs, newDog) {
    let id = createUniqueId();
    newDogs.push({...newDog, id});
    let newData = {"dogs":newDogs};
    return new Promise((resolve, reject)=> {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error, result) => {
        if(error){
          reject(error);
        }else{
          resolve(newDogs)
        }
      });
    });
  },
  getOne(id) {
    return dogs.filter((dog) => dog.id === id);
  },
  updateOne(oldDogs,id,value) {
    const newDogs = oldDogs.map((dog) => {
      if(dog.id === id){
        dog = {...dog, ...value}
      }
      return dog;
    })
    let newData = {"dogs":newDogs};
    return new Promise((resolve, reject)=> {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error, result) => {
        if(error){
          reject(error);
        }else{
          resolve(newDogs)
        }
      });
    });
  },
  deleteOne(oldDogs, id) {
    let newDogs = oldDogs.filter((dog) => dog.id !== id);
    let newData = {"dogs":newDogs};
    return new Promise((resolve, reject)=> {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error, result) => {
        if(error){
          reject(error);
        }else{
          resolve(newDogs)
        }
      });
    });
  }
}

export default Model;
