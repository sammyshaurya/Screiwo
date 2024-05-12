import mongoose from "mongoose";
import { type } from "os";

const { Schema } = mongoose;

const ProfileSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Followers: {
        type: Number,
        default: 0
    },
    Followings: {
        type: Number,
        default: 0
    },
    Posts: {
        type: Number,
        default: 0
    },
    Bio: {
        type: String,
        default: "I am using Screiwo"
    },
    dob: {
        type: String,
        required: true
    },
    profileType: {
        type: String,
        required: true
    },
    postCount: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;
