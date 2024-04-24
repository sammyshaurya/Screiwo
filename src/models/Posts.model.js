import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  userid : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
  },
  commentscount: {
    type: Number,
    default: 0
  },
  saves : {
    type: Number,
    default: 0
  },
  createdat : {
    type: Date,
    default: Date.now
  }
});

const Posts = mongoose.model('Posts', PostSchema);
export default Posts