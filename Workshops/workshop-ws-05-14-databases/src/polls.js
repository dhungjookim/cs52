import models from './models';

const createAuthorsWithPolls = async () => {
  await models.Author.create(
    {
      name: 'Tim Tregubov',
      polls: [
        {
          text: 'Should I give a quiz today?',
          imageURL: 'https://home.dartmouth.edu/faculty-directory/sites/dartmouth.edu.faculty-directory/files/styles/profile_image/public/profile_square.jpg?itok=RssVGUb5',
          upvotes: 1, // don't be this person
          downvotes: 1000,
        },
      ],
    },
    {
      include: [models.Poll],
    },
  );

  await models.Author.create(
    {
      name: 'Mr. Pangolin',
      polls: [
        {
          text: 'Pangolins are awesome.',
          imageURL: 'https://media.giphy.com/media/uscuTAPrWqmqI/giphy.gif',
          upvotes: 69,
          downvotes: 0,
        },
        {
          text: 'Need 7 for harbor',
          imageURL: 'https://media.giphy.com/media/xULW8hNotUdPTMaQBG/giphy.gif',
          upvotes: 6,
          downvotes: 0,
        },
      ],
    },
    {
      include: [models.Poll],
    },
  );

  await models.Author.create(
    {
      name: 'Whisperbot',
      polls: [
        {
          text: 'Who thinks Zac is handsome?',
          imageURL: 'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/53639368_2115234888569250_3121588415485706240_o.jpg?_nc_cat=111&_nc_ht=scontent.fzty2-1.fna&oh=e9d708fc68d5d313040d2215118bf232&oe=5D5984DA',
          upvotes: 1,
          downvotes: 100000, // HA HA
        },
        {
          text: 'Would you be friends with Ryoya?',
          imageURL: 'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/53639368_2115234888569250_3121588415485706240_o.jpg?_nc_cat=111&_nc_ht=scontent.fzty2-1.fna&oh=e9d708fc68d5d313040d2215118bf232&oe=5D5984DA',
          upvotes: 1,
          downvotes: 200000, // HA HA
        },
      ],
    },
    {
      include: [models.Poll],
    },
  );
};

export default createAuthorsWithPolls;
