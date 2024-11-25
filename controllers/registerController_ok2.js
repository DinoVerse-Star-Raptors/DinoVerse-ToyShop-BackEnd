import User from '../models/Account.js'; // Import the User model
import { nanoid } from 'nanoid'; // For generating random IDs
import { StatusCodes } from 'http-status-codes'; // HTTP status codes
import dotenv from 'dotenv'; // To load environment variables
import cloudinary from 'cloudinary'; // Cloudinary SDK
import formidable from 'formidable'; // Formidable for handling file uploads
import process from 'process';

dotenv.config(); // Load environment variables from .env file

// Initialize Cloudinary with the CLOUDINARY_URL
cloudinary.config({
  url: process.env.CLOUDINARY_URL // Use the URL from the environment variable
});

// Vercel configuration to disable the default body parser
export const config = {
  api: {
    bodyParser: false // Disable Vercel's default body parser
  }
};

// Register new user function
export const registerUser = async (req, res) => {
  let uploadResponse;
  let profilePictureURL;
  let uploadedImagePublicId;

  try {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true; // Preserve file extensions (e.g., .jpg, .png)
    form.uploadDir = '/tmp'; // Use Vercel's /tmp directory for temporary file storage

    // Parse the form and handle the file upload
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Error processing the file upload.',
          error: err.message
        });
      }

      const { username, password, fullname, email } = fields;
      const profilePicture = files?.profilePicture?.path; // Assuming 'profilePicture' is the file input field name

      // Validate required fields
      if (!profilePicture) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'including a valid profile picture.'
        });
      }
      if (!username || !password || !fullname || !email || !profilePicture) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:
            'Please provide all required fields, including a valid profile picture.'
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

      // Upload the profile picture to Cloudinary
      try {
        console.log('File path:', profilePicture.path);
        uploadResponse = await cloudinary.v2.uploader.upload(profilePicture, {
          folder: 'dinoimage/profiles', // Set the target folder in Cloudinary
          allowed_formats: ['jpeg', 'png', 'jpg'], // Define allowed image formats
          public_id: `user_${nanoid(10)}` // Generate a unique filename with a random ID
        });
        console.log('Upload Successful:', uploadResponse);
        uploadedImagePublicId = uploadResponse.public_id; // Save the public_id for later deletion
      } catch (error) {
        console.error('Error during upload:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to upload profile picture to Cloudinary.'
        });
      }

      // Retrieve the URL of the uploaded image
      profilePictureURL = uploadResponse.secure_url;
      if (!profilePictureURL) {
        // If upload failed, attempt to delete the image from Cloudinary
        await cloudinary.v2.uploader.destroy(uploadedImagePublicId);
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Failed to upload the profile picture.'
        });
      }

      // Create and save the new user
      const newUser = new User({
        userId: nanoid(10),
        username,
        password,
        fullname,
        email,
        profilePicture: profilePictureURL
      });

      try {
        await newUser.save();
      } catch (error) {
        // If saving user fails, delete the image from Cloudinary
        await cloudinary.v2.uploader.destroy(uploadedImagePublicId);
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
          profilePicture: profilePictureURL,
          status: newUser.status
        }
      });
    });
  } catch (error) {
    console.error('Error registering user:', error);

    // If an error occurred before Cloudinary upload, ensure the image is deleted
    if (uploadedImagePublicId) {
      await cloudinary.v2.uploader.destroy(uploadedImagePublicId);
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error occurred while registering user.'
    });
  }
};
