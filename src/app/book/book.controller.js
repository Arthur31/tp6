const repository = require('./book.repository');
const mapper = require('./book.mapper');
const {AppError, AppErrorTypes} = require('../error/error');

const findAll = (req, res, next) => {
  repository.findAll()
    .then(entities => {
      const books = entities.map(mapper.toDto);
      res.json(books);
    })
    .catch(next)
};

const find = (req, res, next) => {
  const bookId = parseInt(req.params.id);
  if (!bookId) {
    return next(new AppError(AppErrorTypes.DTO_INVALID_FORMAT));
  }
  repository.find(bookId)
    .then(entity => {
      const book = mapper.toDto(entity);
      res.json(book);
    })
    .catch(next);
};

const create = (req, res, next) => {
  const book = req.body;
  if (!book) {
    next(new AppError(AppErrorTypes.DTO_INVALID_FORMAT));
  }
  const entity = mapper.toEntity(book);
  repository.create(entity)
    .then(createdEntity => {
      const createdBook = mapper.toDto(createdEntity);
      res.status(201).json(createdBook);
    })
    .catch(next);
};

const update = (req, res, next) => {
  const book = req.body;
  const bookId = parseInt(req.params.id);
  if (!book) {
    return next(new AppError(AppErrorTypes.DTO_INVALID_FORMAT));
  }
  if (!bookId) {
    return next(new AppError(AppErrorTypes.PARAMETER_INVALID_FORMAT));
  }
  book.id = bookId;
  const entity = mapper.toEntity(book);
  repository.update(entity)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const remove = (req, res, next) => {
  const bookId = parseInt(req.params.id);
  if (!bookId) {
    return next(new AppError(AppErrorTypes.PARAMETER_INVALID_FORMAT));
  }
  repository.remove(bookId)
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = {
  findAll,
  find,
  create,
  update,
  remove
};