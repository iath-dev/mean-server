import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:   true
    },
    password: {
        type: String,
        required: true
    }
})

export default model('User', UserSchema);