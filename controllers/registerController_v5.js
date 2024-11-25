import User from '../models/Account.js'; // Import the User model
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes'; // Import named HTTP status codes
import dotenv from 'dotenv'; // To load environment variables
import formidable from 'formidable'; // Import formidable for handling file uploads
import cloudinary from 'cloudinary'; // Import Cloudinary SDK
import process from 'process';
import path from 'path'; // To handle file paths

dotenv.config(); // Load environment variables from .env file

// Configure Cloudinary using CLOUDINARY_URL from .env
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

// Controller for handling user registration with profile image upload using Cloudinary
export const registerUser = async (req, res) => {
  const form = formidable({
    keepExtensions: true, // Keep file extensions like .jpg, .png, etc.
    maxFileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    filter: ({ name, originalFilename, mimetype }) => {
      const fileTypes = /jpeg|jpg|png/;
      return (
        fileTypes.test(mimetype) &&
        fileTypes.test(path.extname(originalFilename).toLowerCase())
      );
    }
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }

    const { username, password, fullname, email } = fields;
    const profilePicture = files?.profilePicture;

    console.log('File uploaded to: ', profilePicture?.path);

    try {
      // Validate the form fields
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

      // Upload the profile picture to Cloudinary
      let profilePictureURL = null;
      if (profilePicture) {
        const uploadResponse = await cloudinary.v2.uploader.upload(
          profilePicture.path,
          {
            folder: 'profile_images', // Optional: Specify folder in Cloudinary
            public_id: `user_${nanoid(10)}`, // Custom public ID for the image
            overwrite: true // Overwrite if file with same name exists
          }
        );

        // Extract the URL of the uploaded image
        profilePictureURL = uploadResponse.secure_url;
      }

      // Create and save the new user
      const newUser = new User({
        userId: nanoid(10), // Generate a unique user ID
        username,
        password: hashedPassword,
        fullname,
        email,
        profilePicture: profilePictureURL // Store the Cloudinary image URL
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
          profilePicture: profilePictureURL, // Send back the image URL
          status
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Server error'
      });
    }
  });
};
