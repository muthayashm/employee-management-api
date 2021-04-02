const {
  Employee
} = require('../models');
const config = require('../config');


const create = async (req, res) => {
  console.log('create emp');

  const {
    empId,
    empName,
    empSalary
  } = req.body;

  let status;
  let message;

  try {
    const emp = new Employee({
      empId,
      name: empName,
      salary: empSalary
    });
    await emp.save();
    status = 200;
    message = 'Employee create successfully';
  } catch (err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request';
  }

  res.status(status).send({
    message
  });
}

const getAll = async (req, res) => {
  let statusCode;
  let message;

  //Pagination:- using page & limit query params
  const pageNo = parseInt(req.query.page);
  const pageSize = parseInt(req.query.limit);

  //Sorting:- using sorton & order query params
  const sortOn = req.query.sorton;
  const sortOrder = req.query.order;

  //----------------------------------------------
  try {
    if (pageNo && pageSize && sortOn && sortOrder) { //Get with Pagination & Sorting
      console.log("PAGE: " + pageNo + ", PAGE_SIZE: " + pageSize);
      console.log("SORT-ON: " + sortOn + ", ORDER: " + sortOrder);
      const skip = (pageNo - 1) * pageSize;
      if (sortOn == "id" && sortOrder == "asc") {
        message = await Employee.find({}).sort({
          "empId": 1
        }).skip(skip).limit(pageSize);
      } else if (sortOn == "id" && sortOrder == "desc") {
        message = await Employee.find({}).sort({
          "empId": -1
        }).skip(skip).limit(pageSize);
      } else if (sortOn == "name" && sortOrder == "asc") {
        message = await Employee.find({}).sort({
          "empName": 1
        }).skip(skip).limit(pageSize);
      } else if (sortOn == "name" && sortOrder == "desc") {
        message = await Employee.find({}).sort({
          "empName": -1
        }).skip(skip).limit(pageSize);
      }

    } else if (pageNo && pageSize) { //Get with Pagination
      console.log("PAGE: " + pageNo + ", PAGE_SIZE: " + pageSize);

      const skip = (pageNo - 1) * pageSize;
      message = await Employee.find({}).skip(skip).limit(pageSize);

    } else if (sortOn && sortOrder) { //Get With SortOn and SortOrder
      console.log("SORT-ON: " + sortOn + ", ORDER: " + sortOrder);

      if (sortOn == "id" && sortOrder == "asc") {
        message = await Employee.find({}).sort({
          "empId": 1
        });
      } else if (sortOn == "id" && sortOrder == "desc") {
        message = await Employee.find({}).sort({
          "empId": -1
        });
      } else if (sortOn == "name" && sortOrder == "asc") {
        message = await Employee.find({}).sort({
          "name": 1
        });
      } else if (sortOn == "name" && sortOrder == "desc") {
        message = await Employee.find({}).sort({
          "name": -1
        });
      } else if (sortOn == "salary" && sortOrder == "asc") {
        message = await Employee.find({}).sort({
          "salary": 1
        });
      } else if (sortOn == "salary" && sortOrder == "desc") {
        message = await Employee.find({}).sort({
          "salary": -1
        });
      }

    } else { //Normal Get
      message = await Employee.find({});
    }
    statusCode = 200;
  } catch (err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    statusCode = 400;
    message = 'Bad request'
  }

  res.status(statusCode).send({
    message: message.map((emp) => ({
      empId: emp.empId,
      salary: emp.salary,
      name: emp.name
    }))
  });
}

const getById = async (req, res) => {
  console.log(req.params);
  const {
    id
  } = req.params;

  let status;
  let message;

  try {
    const emp = await Employee.find({
      empId: id
    });
    status = 200;
    message = emp;

  } catch (err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request!!!'
  }

  res.status(status).send({
    message
  });
}

module.exports = {
  create,
  getAll,
  getById,
}