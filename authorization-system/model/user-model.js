const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const userModel = model("user", UserSchema);

module.exports = {
  userModel,
};
