import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from '../config/db.js';

// Data
import users from './users.js';
import products from './products.js';

// Model Schemas
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await User.deleteMany();
    await Product.deleteMany();

    // await User.create(users, { validateBeforeSave: false });
    await Product.create(products, { validateBeforeSave: false });

    // const adminUser = createdUsers[0]._id;

    // const sampleProducts = products.map((product) => {
    //   return { ...product, user: adminUser };
    // });

    // await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
