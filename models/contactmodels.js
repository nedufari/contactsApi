const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "please provide a contact name"] },
    email: {
      type: String,
      required: [true, "please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "please provide a contact phone number"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema); //contact name and the schema name
