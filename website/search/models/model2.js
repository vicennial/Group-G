var mongoose = require('mongoose');
var schema=mongoose.Schema;


// Creating machine details schema and model
//username is unique

var machine_details= new schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    property_1:{
        type: String,
        required:true
    },
    property_2:{
        type: String,
        required:true
    },
    property_3:{
        type: String,
        required:true
    },
    property_4:{
        type: String,
        required:true
    }
});
// Creating collection machine_details
var machineDetails2=mongoose.model('detail',machine_details);
module.exports=machineDetails2;