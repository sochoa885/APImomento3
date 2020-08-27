"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var productSchema = new Schema({
  username: {
    type: String,
    require: [true, "'Username' is required"]
  },
  password: {
    type: String,
    require: [true, "'Password' is required"]
  },
  created_at: {
    type: Date,
    require: [true, "'Created at' is required"],
    "default": Date.now
  },
  active: {
    type: Boolean,
    "default": true
  }
});
module.exports = mongoose.model("User", productSchema);