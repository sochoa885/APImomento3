const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    board: {
        type: String,
        require: [true, "'Board' is required"],
    
    },
    processor: {
        type: String,
        require: [true, "'Processor' is required"],
    },
    ram:{
        type: String,
        require: [true, "'RAM' is required"],   
    },
    
    powersupply:{
        type: String,
        require: [true, "'Power supply' is required"],   
    },
    diskhard:{
        type: String,
        require: [true, "'Disk hard' is required"],   
    },
    
    monitor: {
        type: Boolean,
        require: false,
        default:  false
    },
    created_at:{
        type: Date,
        require: [true, "'Created at' is required"],
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("computer", productSchema);