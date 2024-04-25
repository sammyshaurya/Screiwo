import mongoose from "mongoose";

const { Schema } = mongoose;

const ProfileSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
