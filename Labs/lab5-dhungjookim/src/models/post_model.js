import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  cover_url: String,
  content: String,
  tags: String,
  author: String,
  // author: { type: Schema.Types.ObjectId, ref: 'User' },
});


// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
