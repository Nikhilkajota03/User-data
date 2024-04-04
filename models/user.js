import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/ 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  hobbies: {
    type: [String],
    required: true
  },
});

const Users = mongoose.models.Users || mongoose.model("Users", adminSchema);

export default Users;
