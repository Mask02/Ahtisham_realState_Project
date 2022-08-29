import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUri: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    rooms: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    }
})

export default mongoose.model('properties', propertySchema);