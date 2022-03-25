const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins')

const userRoleSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    lastUpdatedOn: {
        type: Date,
        default: Date.now
    },
    
},{

    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObjects: {
        virtuals: true

    }
})

// add plugin that converts mongoose to json
userRoleSchema.plugin(toJSON);
userRoleSchema.plugin(paginate);

/**
 * @typedef UserRole
 */
const UserRole = mongoose.model('UserRole', userRoleSchema);


// async function addUserRoleRealationDummy(){
//     const newUserRole = new UserRole({
//         roleId:"623499595a38d62dd873c90e",
//         userId:"622b5f1eb9364b593cb01911"
//     })
//     newUserRole.save()
// }
// addUserRoleRealationDummy()

module.exports = UserRole;