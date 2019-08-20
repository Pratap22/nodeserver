const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  is_completed: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model(`tbl_todo`, TodoSchema);
