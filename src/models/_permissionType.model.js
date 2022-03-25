const mongoose = require('mongoose');

const permissionTypeSchema = new  mongoose.Schema({
  role_Module:
    [  'user','role'
      // {
      //   name: 'user',
      //   type: String,
      //   read: { type: Boolean, default: false, required: true },
      //   write: { type: Boolean, default: false, required: true },
      //   delete: { type: Boolean, default: false, required: true },
      //   update: { type: Boolean, default: false, required: true }
      // },
      // {
      //   name: role,
      //   type: String,
      //   read: { type: Boolean, default: false, required: true },
      //   write: { type: Boolean, default: false, required: false },
      //   delete: { type: Boolean, default: false, required: false },
      //   update: { type: Boolean, default: false, required: true }
      // }
    ],
  slug:
  {
    type: String,
    required: false
  },
  permissions:
  {
    type: Array,
    required: false
  }


});

const PermissionType = mongoose.model('permissionType', permissionTypeSchema);
module.exports = PermissionType;