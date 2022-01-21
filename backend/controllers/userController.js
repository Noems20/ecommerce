import User from '../models/userModel.js';
import S3 from 'aws-sdk/clients/s3.js';

import multerSharp from 'multer-sharp-s3';

import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Email from '../utils/email.js';
import multer from 'multer';
import { getAll } from './handlerFactory.js';
import { validateMailData } from '../utils/validators.js';
import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// ----------------------------------------------------------------------
//                             FILE UPLOAD
// ----------------------------------------------------------------------

// Image stores as a buffer
// const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Not an image! Please upload only images.', 400, {
        photo: 'Por favor selecciona una imagen',
      }),
      false
    );
  }
};

// export const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

const upload = multer({
  fileFilter: multerFilter,
  storage: multerSharp({
    Key: (req, file, cb) => {
      const folder = 'users/';
      const strOne = 'user-';
      const userId = `${req.user.id}.`;
      const extension = file.mimetype.split('/')[1];
      const finalStr = folder + strOne.concat(userId, extension);
      cb(null, finalStr);
    },
    s3,
    Bucket: bucketName,
    ACL: 'private',
    resize: {
      width: 500,
      height: 500,
    },
    toFormat: {
      type: 'jpeg',
      options: {
        progressive: true,
        quality: 90,
      },
    },
  }),
});

export const uploadUserPhoto = upload.single('photo');

// ----------------------------------------------------------------------
//                          RESIZE USER PHOTO
// ----------------------------------------------------------------------
export const resizeUserPhoto = (req, res, next) => {
  // As we saved image in memory filename doesn't exist but updateMe needs it
  // if (req.file) {
  //   req.file.filename = `user-${req.doc.id}.jpg`;
  //   console.log(req.file);

  //   sharp(req.file.buffer)
  //     .resize(500, 500)
  //     .withMetadata()
  //     .toFormat('jpg')
  //     .jpeg({ quality: 90 })
  //     .toFile(`backend/public/img/users/${req.file.filename}`)
  //     .then(() => {
  //       return res.status(200).json({
  //         status: 'success',
  //         user: req.doc,
  //       });
  //     });
  // } else {
  //   res.status(200).json({
  //     status: 'success',
  //     user: req.doc,
  //   });
  // }

  res.status(200).json({
    status: 'success',
    user: req.doc,
  });
};

// ----------------------------------------------------------------------
//                          FILTER OBJECT
// ----------------------------------------------------------------------
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// ----------------------------------------------------------------------
//                            GET ALL USERS
// ----------------------------------------------------------------------
export const getAllUsers = getAll(User);

// ----------------------------------------------------------------------
//                          UPDATE USER INFO
// ----------------------------------------------------------------------
export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }

  // console.log(req.body);
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name');
  if (req.file) filteredBody.photo = `user-${req.user.id}.jpeg`;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  req.doc = updatedUser;
  next();
});

// ----------------------------------------------------------------------
//                          SEND EMAIL
// ----------------------------------------------------------------------
export const sendContactMail = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  // 1) Check Data
  const { errors, valid } = validateMailData(name, email, subject, message);

  if (!valid) {
    return next(new AppError('Mail details must be valid', 400, errors));
  }

  const user = { name, email: process.env.EMAIL_FROM };
  const content = { subject, message, email };
  let url;
  if (process.env.NODE_ENV === 'development') {
    url = `${req.protocol}://localhost:3000/`;
  } else {
    url = `${req.protocol}://${req.get('host')}/`;
  }

  // 4) Send it to own email
  try {
    await new Email(user, url, content).sendContactMail();
  } catch (error) {
    console.log(error);

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
        {
          email: 'Ocurrio un error enviando el email',
        }
      )
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'Mail sent!',
  });
});

// ----------------------------------------------------------------------
//                          CHECK USER ROLE
// ----------------------------------------------------------------------
export const changeUserRole = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});

// ----------------------------------------------------------------------
//                  DELETE USER AND HIS APPOINTMENTS
// ----------------------------------------------------------------------
export const deleteUser = catchAsync(async (req, res, next) => {
  const userDeleted = await User.findByIdAndDelete(req.params.id);

  if (!userDeleted) {
    return next(new AppError('No document found with that ID', 404));
  }
  // await Appointment.deleteMany({
  //   user: req.params.id,
  // });

  res.status(204).json({ status: 'success', data: null });
});

// ----------------------------------------------------------------------
//                       UPDATE AND ADD USER ADDRESS
// ----------------------------------------------------------------------
export const updateAddress = catchAsync(async (req, res, next) => {
  const { idx: addressIdx } = req.params;
  let { addresses } = req.user;

  addresses[addressIdx] = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { addresses },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    results: updatedUser.addresses.length,
    data: updatedUser.addresses,
  });
});

// ----------------------------------------------------------------------
//                       MAKE ADDRESS PREDETERMINED
// ----------------------------------------------------------------------
export const makePredetermined = catchAsync(async (req, res, next) => {
  const { idx: addressIdx } = req.params;
  const { addresses } = req.user;

  addresses.map((address, index) => {
    if (index === Number(addressIdx)) address.predetermined = true;
    else address.predetermined = false;
    return address;
  });

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { addresses },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    results: updatedUser.addresses.length,
    data: updatedUser.addresses,
  });
});

// ----------------------------------------------------------------------
//                       REMOVE USER ADDRESS
// ----------------------------------------------------------------------
export const removeAddress = catchAsync(async (req, res, next) => {
  const { idx: addressIdx } = req.params;
  let { addresses } = req.user;

  addresses.splice(addressIdx, 1);

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { addresses },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    results: updatedUser.addresses.length,
    data: updatedUser.addresses,
  });
});
