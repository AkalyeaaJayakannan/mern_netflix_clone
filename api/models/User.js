const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/react-netflix-clone-25840.appspot.com/o/profilePicture%2Fnetflix-avatar-smile.gif?alt=media&token=957f7522-f6a1-4e45-a2ae-1f89c1d895ba&_gl=1*r8yqu9*_ga*MzMxODQ5MjM5LjE2OTg2NDE4NjY.*_ga_CW55HF8NVT*MTY5OTE4Njc2Mi4yMC4xLjE2OTkxODY3NzMuNDkuMC4w",
    },
    myList: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
