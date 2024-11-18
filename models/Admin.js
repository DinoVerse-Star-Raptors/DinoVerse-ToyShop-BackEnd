const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const AdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Admin username is required'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long'],
            maxlength: [50, 'Username must be at most 50 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Admin email is required'],
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Admin password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        fullName: {
            type: String,
            required: [true, 'Admin full name is required'],
            minlength: [3, 'Full name must be at least 3 characters long'],
            maxlength: [100, 'Full name must be at most 100 characters long'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Admin phone number is required'],
            validate: {
                validator: (value) => /^(0[1-9]{1})\d{8}$/.test(value), // Thai phone number format
                message: 'Please provide a valid Thai phone number',
            },
        },
        role: {
            type: String,
            enum: ['admin', 'superadmin'], // Including 'superadmin' as an option
            default: 'admin',
        },
        profileImage: {
            type: String,
            default: '', // URL or file path to the profile image
        },
        lastLogin: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended'],
            default: 'active', // Admin status
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Custom timestamp field names
    }
)

module.exports = mongoose.model('Admin', AdminSchema)

// Pre-save hook to hash the password before saving the Admin model
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Method to compare the entered password with the stored hashed password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Create Admin model
const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin

// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin'], default: 'admin' }, // ระบุว่าเป็นผู้ดูแลระบบเท่านั้น
//   permissions: [
//     {
//       type: String,
//       enum: ['manage_users', 'manage_products', 'manage_orders'],
//     },
//   ], // การกำหนดสิทธิพิเศษ
// });

// module.exports = mongoose.model('Admin', adminSchema);
