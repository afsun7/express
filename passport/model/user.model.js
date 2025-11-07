const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);
const userModel = model("user", UserSchema);

module.exports = {
  userModel,
};
