import Post from '../models/post_model';

export const createPost = (req, res) => {
  console.log('THIS IS CREATEPOST');
  console.log(req.user.username);
  const post = new Post();
  post.title = req.body.title;
  post.cover_url = req.body.cover_url;
  post.content = req.body.content;
  post.tags = req.body.tags;
  post.author = req.user.username;

  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPosts = (req, res) => {
  Post.find()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPost = (req, res) => {
  Post.findById(req.params.id)
  // Post.findOne({ _id: req.params.id })
    .then((result) => {
      res.json(result);
      console.log(req.params.id);
      console.log(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id })
    .then((result) => {
      res.json({ message: 'Post deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const updatePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((result) => {
      result.title = req.body.title;
      result.cover_url = req.body.cover_url;
      result.content = req.body.content;
      result.tags = req.body.tags;

      result.save();
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
