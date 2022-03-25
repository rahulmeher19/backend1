const mongoose = require('mongoose');

const permissionRoleSchema = new mongoose.Schema({
  roles: {
    type: String,
    required: false,
  },

  permissions: {
    type: Array,
    required: false,
  },
});

const permissionRole = mongoose.model('permissionRole', permissionRoleSchema);
module.exports = permissionRole;
