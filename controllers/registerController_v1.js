import User from '../models/Account.js'; // Import the User model
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes'; // Import named HTTP status codes
import dotenv from 'dotenv'; // To load environment variables
import process from 'process';
import multer from 'multer'; // Import multer for handling file uploads
import path from 'path'; // To handle file paths

dotenv.config(); // Load environment variables from .env file

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/profile_images'); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, `${nanoid(10)}_${Date.now()}${path.extname(file.originalname)}`); // Create a unique filename for the image
  }
});
// uploads/profile_images/favicon.ico

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
}).single('profilePicture'); // Expecting the image field to be named 'profilePicture'

// Controller for handling user registration with profile image upload
export const registerUser = async (req, res) => {
  const { username, password, fullname, email } = req.body;
  console.log(req.body);
  try {
    // Validation: Ensure all required fields are provided
    if (!username || !password || !fullname || !email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Please provide all required fields.'
      });
    }

    // Check if user already exists (by email or username)
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      const errorMessage =
        userExists.email === email
          ? 'Email already in use.'
          : 'Username already in use.';
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessage });
    }

    // Hash the password with salt
    const salt = process.env.PASSWORD_SALT || 'salt'; // Default salt value
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10; // Default salt rounds to 10
    const hashedPassword = await bcrypt.hash(password + salt, saltRounds);

    // Handle image upload
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: err.message });
      }

      // Profile picture path (assuming the image is stored locally)
      const profilePicturePath = req.file ? req.file.path : null; // Save file path if available

      // Construct full URL for the profile picture
      const baseURL = process.env.BASE_URL || 'http://localhost:5000'; // Replace with your server's base URL
      const fullProfilePictureURL = profilePicturePath
        ? `${baseURL}/${profilePicturePath.replace('public/', '')}` // Remove 'uploads/' part to form the URL
        : null;

      // Create and save new user
      const newUser = new User({
        userId: nanoid(10), // Generate a unique user ID
        username,
        password: hashedPassword,
        fullname,
        email,
        profilePicture: fullProfilePictureURL // Store the image path
      });

      await newUser.save();

      // Respond with the user details (excluding sensitive info like password)
      const { userId, status } = newUser;
      res.status(StatusCodes.CREATED).json({
        message: 'User registered successfully.',
        user: {
          userId,
          username,
          fullname,
          email,
          profilePicture: profilePicturePath, // Send back the image path or URL
          status
        }
      });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error'
    });
  }
};

// import express from 'express';
// import formidable from 'express-formidable';
// import { promises as fs } from 'fs';
// const app = express();
// const port = 3000;
// app.use(formidable());
// app.post('/company', async (req, res, next) => {
//   console.log(req.fields);
//   console.log(req.files.image);
//   await fs.copyFile(req.files.image.path, './nature-desination.jpeg');
//   await fs.unlink(req.files.image.path);
//   res.send('success');
// });
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
