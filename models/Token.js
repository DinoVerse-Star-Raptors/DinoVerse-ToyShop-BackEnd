import mongoose from 'mongoose';

// Destructure Schema and Types from mongoose
const { Schema } = mongoose;

// Define the schema for the token collection
const tokenSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, // Reference to the User model
    token: { type: String, required: true }, // JWT token string
    created_at: { type: Date, default: Date.now }, // Timestamp when token was created
    expires_at: { type: Date, required: true }, // Timestamp when token expires
    ip_address: { type: String, required: true }, // IP address from which the token was created
    user_agent: { type: String, required: true }, // User-Agent string (browser/device info)
    revoked: { type: Boolean, default: false } // Flag indicating if the token has been revoked
  },
  { timestamps: true }
);

// Create an index on `expires_at` for automatic expiration handling
tokenSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

// Method to check if a token has expired
tokenSchema.methods.isExpired = function () {
  return new Date() > this.expires_at;
};

// Method to revoke a token
tokenSchema.methods.revoke = async function () {
  this.revoked = true;
  await this.save();
};

// Static method to find a token by user ID
tokenSchema.statics.findByUserId = function (userId) {
  return this.findOne({ user_id: userId, revoked: false });
};

// Static method to find a token by token string
tokenSchema.statics.findByToken = function (token) {
  return this.findOne({ token, revoked: false });
};

// Static method to find expired tokens
tokenSchema.statics.findExpiredTokens = function () {
  return this.find({ expires_at: { $lt: new Date() }, revoked: false });
};

// Static method to find revoked tokens
tokenSchema.statics.findRevokedTokens = function () {
  return this.find({ revoked: true });
};

// Create and export the Token model
const Token = mongoose.model('Token', tokenSchema);

export default Token;
