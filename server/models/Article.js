const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    title: { type: String },
    content: { type: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Article", schema);
