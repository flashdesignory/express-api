
import fs from 'fs';
import path from 'path';
import createUniqueId from '../utils/utils';

const url = path.join(__dirname, '../../data/user.data.json');

const Model = {
  findOne(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(url, 'utf8', (error, result) => {
        if (error) {
          reject(error);
        } else {
          const data = JSON.parse(result);
          const user = data.users.filter(value => value.id === id);
          resolve(user);
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
          resolve(data.users);
        }
      });
    });
  },
  createOne(newUsers, newUser) {
    const id = createUniqueId();
    newUsers.push({ ...newUser, id });
    const newData = { users: newUsers };
    return new Promise((resolve, reject) => {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(newUsers);
        }
      });
    });
  },
  /* getOne(id) {
    return users.filter(user => user.id === id);
  }, */
  updateOne(oldUsers, id, value) {
    let result;
    const newUsers = oldUsers.map((user) => {
      if (user.id === id) {
        result = { ...user, ...value };
      }
      return result;
    });
    const newData = { users: newUsers };
    return new Promise((resolve, reject) => {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(newUsers);
        }
      });
    });
  },
  deleteOne(oldUsers, id) {
    const newUsers = oldUsers.filter(user => user.id !== id);
    const newData = { users: newUsers };
    return new Promise((resolve, reject) => {
      fs.writeFile(url, JSON.stringify(newData, null, 4), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(newUsers);
        }
      });
    });
  },
};

export default Model;
