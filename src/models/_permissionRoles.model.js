const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const permissionRoleSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  permission_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
  },
});

// add plugin that converts mongoose to json
permissionRoleSchema.plugin(toJSON);
permissionRoleSchema.plugin(paginate);

/**
 * @typedef PermissionRole
 */

const PermissionRole = mongoose.model('PermissionRole', permissionRoleSchema);

module.exports = PermissionRole;
