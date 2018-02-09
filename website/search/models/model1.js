var mongoose = require('mongoose');
var schema=mongoose.Schema;


// Creating machine type schema and model
//username is unique

var machineType= new schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    type:{
        type: String,
        required:true
    }
});
// Creating collection machineTypes
var machineDetails1=mongoose.model('machine_type',machineType);
module.exports=machineDetails1;