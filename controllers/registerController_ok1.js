import User from '../models/Account.js'; // Import the User model
// import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes'; // Import named HTTP status codes
import dotenv from 'dotenv'; // To load environment variables
import process from 'process';
import formidable from 'formidable'; // Import formidable for handling file uploads
import path from 'path'; // To handle file paths
import fs from 'fs'; // For deleting files
import sizeOf from 'image-size'; // For checking if the file is a valid image

dotenv.config(); // Load environment variables from .env file

// Helper function to clean up uploaded files
const cleanupUploadedFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // Delete the uploaded file if it exists
  }
};

export const registerUser = async (req, res) => {
  const form = formidable({
    uploadDir: './public/uploads/profile_images',
    keepExtensions: true,
    maxFileSize: 1 * 1024 * 1024, // Max file size of 1MB
    minFileSize: 50 * 1024, // Min file size of 50KB
    filter: ({ name, originalFilename, mimetype }) => {
      if (name !== 'profilePicture') {
        // If the name does not match the expected field, reject the file
        return false;
      }

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
    let profilePicture = files?.profilePicture?.path;

    try {
      if (!username || !password || !fullname || !email) {
        // Clean up uploaded file if validation fails
        cleanupUploadedFile(profilePicture);
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Please provide all required fields.'
        });
      }

      // Check if profile picture is provided
      if (!profilePicture) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Please upload a valid profile picture.'
        });
      }

      // Check if the file exists on the server
      if (!fs.existsSync(profilePicture)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Uploaded file does not exist on the server.'
        });
      }

      // Validate the image file (check if it's a valid image)
      try {
        const dimensions = sizeOf(profilePicture);
        if (!dimensions) {
          // If the file can't be read as an image, return an error
          cleanupUploadedFile(profilePicture);
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Uploaded file is not a valid image.'
          });
        }

        // Check if the image is at least 300x300
        const { width, height } = dimensions;
        if (width < 300 || height < 300) {
          cleanupUploadedFile(profilePicture);
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Image dimensions must be at least 300x300 pixels.'
          });
        }
      } catch (error) {
        console.error(
          'Error during image validation or user registration:',
          error
        ); // Log the error for debugging

        // Handle any errors from image validation (e.g., corrupt file)
        cleanupUploadedFile(profilePicture);
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Uploaded file is not a valid image.'
        });
      }

      // Check if user already exists (by email or username)
      const userExists = await User.findOne({ $or: [{ email }, { username }] });
      if (userExists) {
        // Clean up uploaded file if user already exists
        cleanupUploadedFile(profilePicture);
        const errorMessage =
          userExists.email === email
            ? 'Email already in use.'
            : 'Username already in use.';
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: errorMessage });
      }

      // Hash the password with salt
      //   const salt = process.env.PASSWORD_SALT || 'salt';
      //   const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
      //   const hashedPassword = await bcrypt.hash(password + salt, saltRounds);

      // Rename the uploaded profile picture to 'user_<random_string>.<ext>'
      if (profilePicture) {
        const extname = path.extname(profilePicture);
        const newFileName = `user_${nanoid(10)}${extname}`;
        const newFilePath = path.join(
          './public/uploads/profile_images',
          newFileName
        );

        fs.renameSync(profilePicture, newFilePath); // Rename the file
        profilePicture = newFileName; // Update profile picture name
      }

      // Construct full URL for the profile picture only after the file is uploaded successfully
      const baseURL = process.env.BASE_URL || 'http://localhost:5000';
      const fullProfilePictureURL = profilePicture
        ? `${baseURL}/uploads/profile_images/${profilePicture}`
        : null;

      //   if (hashedPassword || !hashedPassword) {
      //     const isPasswordMatch = await bcrypt.compare(
      //       password + salt,
      //       '$2a$10$SdmV9l6EiHYnOn2mOdI1fO91J/Xd2kAqH.t8RfK/yC6.zEdSoiLXa'
      //     );
      //     return res.status(StatusCodes.BAD_REQUEST).json({
      //       message: hashedPassword
      //     });
      //   }

      // Create and save new user after we have the profile picture URL
      //   const newUser = new User({
      //     userId: nanoid(10),
      //     username,
      //     password: hashedPassword,
      //     fullname,
      //     email,
      //     profilePicture: fullProfilePictureURL
      //   });
      //   await newUser.save();

      const newUser = new User({
        userId: nanoid(10),
        username,
        password,
        fullname,
        email,
        profilePicture: fullProfilePictureURL
      });
      await newUser.save();

      // Respond with the user details
      const { userId, status } = newUser;
      res.status(StatusCodes.CREATED).json({
        message: 'User registered successfully.',
        user: {
          userId,
          username,
          fullname,
          email,
          profilePicture: fullProfilePictureURL,
          status
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);

      // Cleanup file in case of any error
      cleanupUploadedFile(profilePicture);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Server error'
      });
    }
  });
};
