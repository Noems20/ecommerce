import LocalOrder from '../models/localOrderModel.js';

// Handler factory
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

import catchAsync from '../utils/catchAsync.js';
import validator from 'validator';
import AppError from '../utils/appError.js';
import moment from 'moment';

export const setOrderUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllLocalOrders = getAll(LocalOrder);
export const getLocalOrder = getOne(LocalOrder);
export const createLocalOrder = createOne(LocalOrder);
export const updateLocalOrder = updateOne(LocalOrder);
export const deleteLocalOrder = deleteOne(LocalOrder);

const availableHoursWeekday = [
  //   '9:0',
  '9:30',
  '10:0',
  '10:30',
  '11:0',
  '11:30',
  '12:0',
  '12:30',
  '13:0',
  '13:30',
  '14:0',
  '14:30',
  '15:0',
  '15:30',
  '16:0',
  '16:30',
  '17:0',
  '17:30',
  '18:0',
  '18:30',
];

const availableHoursSaturday = [
  //   '9:0',
  '9:30',
  '10:0',
  '10:30',
  '11:0',
  '11:30',
  '12:0',
  '12:30',
  '13:0',
  '13:30',
];

export const checkDate = catchAsync(async (req, res, next) => {
  // Check if date of appointment is valid
  if (req.body.date && !validator.isISO8601(req.body.date)) {
    return next(
      new AppError('Date must in be in format ISO8601', 400, {
        date: 'Debe ser una fecha valida',
      })
    );
  }

  const date = moment(req.body.date);
  if (date.day() === 6) {
    if (!availableHoursSaturday.includes(`${date.hour()}:${date.minutes()}`)) {
      return next(
        new AppError(`Must be a valid date`, 400, {
          date: 'Debe ser una fecha válida',
        })
      );
    }
  } else {
    if (!availableHoursWeekday.includes(`${date.hour()}:${date.minutes()}`)) {
      return next(
        new AppError(`Must be a valid date`, 400, {
          date: 'Debe ser una fecha válida',
        })
      );
    }
  }

  if (
    !(
      date.isBefore(moment().add(30, 'day').startOf('day')) && // Checks if appointment before 30 days after current time
      date.isAfter(moment().add(2, 'hour')) && // Checks if two hours after current time
      date.day() !== 0
    ) // Checks if is not sunday
  ) {
    return next(
      new AppError(`Must be a valid date`, 400, {
        date: 'Debe ser una fecha válida',
      })
    );
  }

  next();
});
