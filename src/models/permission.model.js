const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const permissionSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    slug:{
        
    },
    name:{

    }
});

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;