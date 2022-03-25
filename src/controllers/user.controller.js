const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { apiResponse, genApiResponse } = require('./status.controller');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const message = 'User is Successfully Created!';
  apiResponse.data = { user };
  apiResponse.message = { message };
  return res.status(httpStatus.CREATED).send(genApiResponse(200, true, null, { user }, message));
});

const getAllUser = catchAsync(async (req, res) => {
  let paginationType = null;
  if (req.query) {
    paginationType = req.query.paginationType ? req.query.paginationType : paginationType;
  }

  let isPagination = true;
  if (paginationType == 'all') {
    isPagination = false;
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const filter = pick(req.query, ['email', 'firstName', 'phoneNo']);

  let responseData = null;
  let pagination = null;

  const result = await userService.queryUsers(filter, options, isPagination);
  const message = 'All User Detail!';

  responseData = result;

  if (result.results) {
    responseData = result.results;
    pagination = {
      currentPage: result.page,
      lastPage: result.totalPages,
    };
  }

  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, responseData, message, pagination));
});

const getUser = catchAsync(async (req, res) => {
  const data = jwt.decode(req.params.token);
  // console.log(data.permission, data, 'line no 50');
  const index = data.permission.filter((a) => a === 'getUser');
  console.log(index);
  if (!index || index.length <= 0) return res.send({ message: 'UNAUTHORISED' });

  const user = await userService.getUserById(data.sub);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const message = 'User Details!';
  apiResponse.data = { user };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { user }, message));
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  const message = 'User is Updated Sucessfully!';
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { user }, message));
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.id);
  res.status(httpStatus.OK).send({ message: 'User is Deleted Successfully!' });
});

module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
};
