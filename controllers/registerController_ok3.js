import User from '../models/Account.js'; // Import the User model
import { nanoid } from 'nanoid'; // For generating random IDs
import { StatusCodes } from 'http-status-codes'; // HTTP status codes
import dotenv from 'dotenv'; // To load environment variables
import formidable from 'formidable'; // Import formidable for handling form data

dotenv.config(); // Load environment variables from .env file

// Register new user function
export const registerUser = (req, res) => {
  const form = new formidable.IncomingForm();

  // Set the directory for file uploads if necessary
  //   form.uploadDir = './uploads'; // You can set the directory where the files will be stored
  //   form.keepExtensions = true; // Keep the file extension after upload

  // Parse the form data
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the form:', err);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Error parsing the form data.'
      });
    }

    // Destructure form fields from 'fields' object
    const { username, password, fullname, email, profilePictureURL } = fields;

    // Validate required fields
    if (!username || !password || !fullname || !email || !profilePictureURL) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          'Please provide all required fields, including a valid profile picture URL.'
      });
    }

    // Check if user already exists (by email or username)
    const userExists = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          userExists.email === email
            ? 'Email already in use.'
            : 'Username already in use.'
      });
    }

    // Handle file upload (optional)
    let profilePicture;
    if (files.profilePicture) {
      // If file is uploaded, you can store the file path or URL
      profilePicture = `/uploads/${files.profilePicture.newFilename}`;
    } else {
      // If no file uploaded, use the profilePictureURL field
      profilePicture = profilePictureURL;
    }

    // Create and save the new user
    const newUser = new User({
      userId: nanoid(10),
      username,
      password,
      fullname,
      email,
      profilePicture
    });

    try {
      await newUser.save();
    } catch (error) {
      if (error || !error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Error saving the user to the database.'
        });
    }

    // Respond with the user details
    res.status(StatusCodes.CREATED).json({
      message: 'User registered successfully.',
      user: {
        userId: newUser.userId,
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePicture: profilePicture,
        status: newUser.status
      }
    });
  });
};
