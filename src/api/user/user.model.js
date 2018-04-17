import createUniqueId from '../utils/utils.js';

import fs from 'fs';
import path from 'path';
const url = path.join(__dirname, '../../data/user.data.json');

const Model = {
  findOne(id) {
    return new Promise((resolve, reject)=> {
      fs.readFile(url, 'utf8', (error, result) => {
        if(error){
          reject(error);
        }else{
          let data = JSON.parse(result);
          let user = data.users.filter((user) => user.id === id);
          resolve(user)
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
          resolve(data.users)
        }
      })
    })
  },
  createOne(newUsers, newUser) {
    let id = createUniqueId();
    newUsers.push({...newUser, id});
    let newData = {"users":newUsers};
    return new Promise((resolve, reject)=> {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error, result) => {
        if(error){
          reject(error);
        }else{
          resolve(newUsers)
        }
      });
    });
  },
  getOne(id) {
    return users.filter((user) => user.id === id);
  },
  updateOne(oldUsers,id,value) {
    const newUsers = oldUsers.map((user) => {
      if(user.id === id){
        user = {...user, ...value}
      }
      return user;
    })
    let newData = {"users":newUsers};
    return new Promise((resolve, reject)=> {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error, result) => {
        if(error){
          reject(error);
        }else{
          resolve(newUsers)
        }
      });
    });
  },
  deleteOne(oldUsers, id) {
    let newUsers = oldUsers.filter((user) => user.id !== id);
    let newData = {"users":newUsers};
    return new Promise((resolve, reject)=> {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error, result) => {
        if(error){
          reject(error);
        }else{
          resolve(newUsers)
        }
      });
    });
  }
}

export default Model;
