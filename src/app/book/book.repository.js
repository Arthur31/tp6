const { AppError, AppErrorTypes } = require('../error/error');
const books = require('../../assets/books.entities.json') || [];

const getNextId = () => Math.max(...books.map(book => book.id)) + 1;

const findAll = () => Promise.resolve(books);

const find = id => {
  const entity = books.find(book => book.id === id);
  if (entity) {
    return Promise.resolve(entity);
  } else {
    const error = new AppError(AppErrorTypes.RESOURCE_NOT_FOUND, `No book with id=${id} has been found`);
    return Promise.reject(error);
  }
};

const create = entity => {
  const book = {...entity, id: getNextId()};
  books.push(book);
  return Promise.resolve(book);
};

const update = entity => {
  const index = books.findIndex(book => book.id === entity.id);
  if (index > -1) {
    books[index] = entity;
    return Promise.resolve(entity);
  } else {
    const error = new AppError(AppErrorTypes.RESOURCE_NOT_FOUND, `No book with id=${entity.id} has been found`);
    return Promise.reject(error);
  }
};

const remove = id => {
  const index = books.findIndex(book => book.id === id);
  if (index > -1) {
    const [book] = books.splice(index, 1);
    return Promise.resolve(book);
  } else {
    const error = new AppError(AppErrorTypes.RESOURCE_NOT_FOUND, `No book with id=${id} has been found`);
    return Promise.reject(error);
  }
};

module.exports = {
  findAll,
  find,
  create,
  update,
  remove
};