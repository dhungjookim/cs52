import Poll from '../models/poll';


export const getPolls = () => {
  // should return a promise that returns a list of polls
  return Poll.find({});
};

export const createPoll = (poll) => {
  const p = new Poll();
  p.text = poll.text;
  p.imageURL = poll.imageURL;
  return p.save();
};

export const vote = (pollID, upvote) => {
  return Poll.findOne({ _id: pollID }).then((poll) => {
    console.log(`updating vote: ${poll} ${upvote}`);
    if (upvote) {
      poll.upvotes += 1;
    } else {
      poll.downvotes += 1;
    }
    return poll.save();
  });
};
