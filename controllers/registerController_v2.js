import User from '../models/Account.js'; // Import the User model
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes'; // Import named HTTP status codes
import dotenv from 'dotenv'; // To load environment variables
import process from 'process';
import formidable from 'formidable'; // Import formidable for handling file uploads
import path from 'path'; // To handle file paths
import fs from 'fs'; // For deleting files

dotenv.config(); // Load environment variables from .env file

// Controller for handling user registration with profile image upload using Formidable
export const registerUser = async (req, res) => {
  const form = formidable({
    uploadDir: './public/uploads/profile_images', // Directory to store uploaded files
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
    const profilePicture = files?.profilePicture?.path;

    console.log('File uploaded to: ', profilePicture);
    // console.log('fields: ', fields);
    // console.log('files: ', files?.profilePicture);
    try {
      if (profilePicture || !profilePicture) {
        // const uploadedFilePath = profilePicture.filepath;

        // console.log('File uploaded to: ', uploadedFilePath);
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: profilePicture
        });
      }

      // Validation: Ensure all required fields are provided
      if (!username || !password || !fullname || !email) {
        // Clean up uploaded file if validation fails
        console.log('profilePicture', profilePicture);
        if (profilePicture || !profilePicture) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: profilePicture
          });
        }
        if (profilePicture) {
          const filePath = path.join(
            './public/uploads/profile_images',
            profilePicture
          );
          // Check if the file exists before attempting to delete
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the uploaded file
          }
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Please provide all required fields.'
        });
      }
      // Check if user already exists (by email or username)
      const userExists = await User.findOne({ $or: [{ email }, { username }] });
      if (userExists) {
        // Clean up uploaded file if user already exists
        if (profilePicture) {
          const filePath = path.join(
            './public/uploads/profile_images',
            profilePicture
          );
          // Check if the file exists before attempting to delete
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the uploaded file
          }
        }
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
      // Construct full URL for the profile picture only after the file is uploaded successfully
      const baseURL = process.env.BASE_URL || 'http://localhost:5000'; // Replace with your server's base URL
      const fullProfilePictureURL = profilePicture
        ? `${baseURL}/public/uploads/profile_images/${profilePicture}` // Form the URL based on uploaded file name
        : null;
      // Create and save new user after we have the profile picture URL
      const newUser = new User({
        userId: nanoid(10), // Generate a unique user ID
        username,
        password: hashedPassword,
        fullname,
        email,
        profilePicture: fullProfilePictureURL // Store the image URL
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
          profilePicture: fullProfilePictureURL, // Send back the image URL
          status
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);

      // Cleanup file in case of any error during the user registration process
      if (profilePicture) {
        const filePath = path.join(
          './public/uploads/profile_images',
          profilePicture
        );
        // Check if the file exists before attempting to delete
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the uploaded file
        }
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Server error'
      });
    }
  });
};
