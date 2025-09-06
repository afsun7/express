const { Schema, model } = require("mongoose");

const BLogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, minLength: 4 },
    text: { type: String, required: true, trim: true, minLength: 4 },
    show: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    bookMarks: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);
const BlogModel = model("blog", BLogSchema);
module.exports = {
  BlogModel,
};

// timestamps تاریخ ویرایش و ایجاد را برای ما ذخیره میکند
// const BlogModel = model("blog", BLogSchema,اسم کالکشن اگر نزاریم خودش  اسم مدل جمع میزنه و د ر نظر میگیره );
