## Testing

We're going to add some unit tests to the code from sa4. Go ahead and fork this repo and clone it locally. It should be the same as your sa4 code, but clone this one just to keep things consistent. Once you clone the repo, don't forget to start out with a `yarn install`.

## Mocha and Chai Testing

🚀 Next lets install the necessary good stuff:

`💻 yarn add mocha chai`

🚀 Let's add a line in our `package.json` file to make sure that we can easily
run the tests using Mocha. So go to `package.json` and add the line `"testit": "mocha --require @babel/register"` inside of the `"scripts"` section. Oh yeah, you're also
going to want to `yarn add @babel/register`.

🚀 Now, create the directory `src/test`, where we will be keeping our test files, and create file `src/test/Api.test.js` inside of that. We are going to be testing the
calls to the youtube-api to make sure that it working as expected.

NOTE: It can be a good practice in the development of your final projects,
for example, to write your tests before you write your functions. This is known
as Test Driven Development and makes sure that your code is high quality and
purpose driven.

🚀 Add this code to your new `src/test/Api.test.js` file.

```javascript
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { youtubeSearch } from '../youtube-api';
import 'babel-polyfill';

const { expect } = require('chai');

describe('Get video tests', () => {
  it('Get a list of videos', () => {
    return youtubeSearch('vines to watch in class')
      .then((response) => {
        // expect an object back
        expect(typeof response).to.equal('object');
        response.forEach((data) => {
          expect(data.kind).to.equal('youtube#searchResult');
        });
        expect(response.length).to.equal(5);
      });
  });
});
```

What are we doing here? We are describing a set of tests for mocha in the `describe('Get video tests', () => {...}` line. We will then write a whole bunch of things we expect this suite of tests to do.

Essentially, we specified that we should "get a list of videos", expected to be an object of length 5, in which each object has a kind, or type, that
equals "youtube#searchResult"!

🚀 HOLD UP! If you haven't already, add your YouTube API key you created in [Short Assignment 4](http://cs52.me/assignments/sa/react-videos/) to `src/youtube-api.js`. If you have lost it or it has expired, create a new one by following the instuctions in the YouTube API of the Short Assignment.

🚀 Let's see if our youtubeSearch function is working in the way we expect it by running our one test. Run

`💻 yarn testit src/test/Api.test.js`. What do you see?

![](README_imgs/getVideosSuccess.png)

What just happened? Mocha ran our test file at `src/test/Api.test.js` and told us
that everything works as we expect! Great!

<details>
<summary>😱 Oh no did it fail???</summary>
  If you received a 400 or 403 error, make sure you have a working API Key, it may have expired.
</details>

We have just one file under our test folder that tests one specific function. What
if we wanted to have a bunch of test files in our test folder? Would we have to run `💻 yarn testit` for each of those files to make sure our app is working correctly? Well, we could... but there's a better way! Let's tell `yarn testit` to run all the files in the test folder and tell us the results from all of them!

🚀 Go into your `package.json` file and change the `"testit": "mocha --require @babel/register"` line to `"testit": "mocha 'src/test/**/*.js' --require @babel/register"`. Great! Now mocha will run all of the files in the test folder so we should feel comfortable making separate files to test different components of our app!

Now, lets get some practice with Test Driven Development and implement a new feature in our app.
What this means is that we are going to write the test for our code *before* we write the actual function. Say we want
to build a toy function that returns the total view count of all the videos displayed on the video list. First, think
about exactly what we want this function's inputs and outputs to be, and then write the test in accordance to that; then, finally, you can write the function!

We want to create a function viewCountByVideo that takes one input: the ID of a video, and outputs a number. 

🚀 add this code below our previous test.
```javascript
  it('Get view count of video', () => {
    return viewCountByVideo('TqtLNpkerfo')
      .then((response) => {
        expect(response).to.be.a('Number');
      });
  });
```

Your `src/test/Api.test.js` should now look like this: 

```javascript
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { youtubeSearch, viewCountByVideo } from '../youtube-api';
import 'babel-polyfill';

const { expect } = require('chai');

describe('Get video tests', () => {
  it('Get a list of videos', () => {
    return youtubeSearch('vines to watch in class')
      .then((response) => {
        // expect an object back
        expect(typeof response).to.equal('object');
        response.forEach((data) => {
          expect(data.kind).to.equal('youtube#searchResult');
        });
        expect(response.length).to.equal(5);
      });
  });
  it('Get view count of video', () => {
    return viewCountByVideo('TqtLNpkerfo')
      .then((response) => {
        expect(response).to.be.a('Number');
      });
  });
});

```

Great! So we're being good Test Driven developers. Now we can go ahead and write our function viewCountByVideo. 🚀 Go ahead into the `src/youtube-api.js` and add this function before `youtubeSearch`:

```javascript
export const viewCountByVideo = (videoId) => {
  const params = {
    key: API_KEY,
    id: videoId,
    part: 'statistics',
  };
  return new Promise((resolve, reject) => {
    axios.get(STATISTICS_API_URL, { params })
      .then((response) => {
        resolve(response.data.items[0].statistics.viewCount);
      })
      .catch((error) => {
        console.log(`youtube statistics api error: ${error}`);
        reject(error);
      });
  });
};
```

And dont forget to add `const STATISTICS_API_URL = 'https://www.googleapis.com/youtube/v3/videos';` to the top

Awesome! Now let's run our tests to make sure everything's working as we expect! `yarn testit`

WOAH! What happened? We failed?

![](README_imgs/testFailure.png)

Don't panic. This is actually giving us a lot of good information. So mocha is telling us that our latest "get view count of video" test is failing. Why? Because we expected the function we wrote to return a number, but it is actually returning a string. Oops! Good thing we wrote a test beforehand. Now all we need to do is go into the function `viewCountByVideo` function we just wrote in `src/youtube-api.js` and change the

```javascript
resolve(response.data.items[0].statistics.viewCount);
```
line to

```javascript
resolve(Number(response.data.items[0].statistics.viewCount));
```

Great. Run `yarn testit` and you should see that both of our tests are now passing!

Let's try to add some more functionality to our project. Say we want our youtubeSearch function to return total views of all of the videos of the search. We want it to return a json object containing all videos as well as the total views of all of those videos. Change our 'Get a list of videos' test to be:

```javascript
  it('Get a list of videos', () => {
    return youtubeSearch('vines to watch in class')
      .then((response) => {
        // expect an object back
        expect(response.all).to.be.a('Array');
        // expect a certain type of data back
        response.all.forEach((data) => {
          expect(data.kind).to.equal('youtube#searchResult');
        });
        // expect a certain length of array object back
        expect(response.all.length).to.equal(5);
        expect(response.totalViews).to.be.a("number");
      });
  });
```

We will now need to change the youtubeSearch function in `src/youtube-api.js` to reflect this new functionality. You might need to `yarn add async` and add `import { each } from 'async';` to the top of `youtube-api.js` in order for the new code to work. Your code should look like this:

```javascript
export const youtubeSearch = (term) => {
  const params = {
    key: API_KEY,
    q: term,
    type: 'video',
    part: 'snippet',
  };
  return new Promise((resolve, reject) => {
    axios.get(API_URL, { params })
      .then((response) => {
        let totalViewCounter = 0;
        each(response.data.items, (item, callback) => {
          viewCountByVideo(item.id.videoId).then((views) => {
            totalViewCounter += Number(views);
            callback();
          });
        },
        (err) => {
          resolve({
            all: response.data.items,
            totalViews: totalViewCounter,
          });
        });
      });
  });
};
```

Cool! Lets run `yarn testit` to check if we did it right.

Great! We're awesome coders 😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎.

Now in order for the whole thing to work you're going to need to go to `src/index.js` and change `App`'s `search` function to be:

```javascript
    search = (text) => {
      youtubeSearch(text).then((videos) => {
        this.setState({
          videos: videos.all,
          selectedVideo: videos.all[0],
        });
      });
    };
```


<details>
<summary>In case nothing is working...</summary>
<br>

Your `Api.test.js` should look like:

```javascript
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { youtubeSearch, viewCountByVideo } from '../youtube-api';
import 'babel-polyfill';

const { expect } = require('chai');

describe('Get video tests', () => {
  it('Get a list of videos', () => {
    return youtubeSearch('vines to watch in class')
      .then((response) => {
        // expect an object back
        expect(response.all).to.be.a('Array');
        // expect a certain type of data back
        response.all.forEach((data) => {
          expect(data.kind).to.equal('youtube#searchResult');
        });
        // expect a certain length of array object back
        expect(response.all.length).to.equal(5);
        expect(response.totalViews).to.be.a('number');
      });
  });

  it('Get view count of video', () => {
    return viewCountByVideo('TqtLNpkerfo')
      .then((response) => {
        expect(response).to.be.a('Number');
      });
  });
});
```

Your `youtube-api.js` should look like:

```javascript
import axios from 'axios';
import { each } from 'async';

const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyB3IiRyfDl2UxQzIAnFi7-MN0DAMw9yZMc';

// eslint-disable-next-line no-unused-vars
const STATISTICS_API_URL = 'https://www.googleapis.com/youtube/v3/videos';

export const viewCountByVideo = (videoId) => {
  const params = {
    key: API_KEY,
    id: videoId,
    part: 'statistics',
  };
  return new Promise((resolve, reject) => {
    axios.get(STATISTICS_API_URL, { params })
      .then((response) => {
        resolve(Number(response.data.items[0].statistics.viewCount));
      })
      .catch((error) => {
        console.log(`youtube statistics api error: ${error}`);
        reject(error);
      });
  });
};

export const youtubeSearch = (term) => {
  const params = {
    key: API_KEY,
    q: term,
    type: 'video',
    part: 'snippet',
  };
  return new Promise((resolve, reject) => {
    axios.get(API_URL, { params })
      .then((response) => {
        let totalViewCounter = 0;
        each(response.data.items, (item, callback) => {
          viewCountByVideo(item.id.videoId).then((views) => {
            totalViewCounter += Number(views);
            callback();
          });
        },
        (err) => {
          resolve({
            all: response.data.items,
            totalViews: totalViewCounter,
          });
        });
      });
  });
};
export default youtubeSearch;
```

</details>


## Front-end testing with Enzyme
`💻 yarn add enzyme enzyme enzyme-adapter-react-16`

This will add the Enzyme library, as well as the adapter for the library which will be tested. Here, we are testing
React 16, so we add the proper adapter.

Let's create a file that will be used to write all our front-end tests. 💻 Inside the `test` directory we used for the API tests, lets touch a file called `front.test.js` and populate it like so:

```javascript
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from '../components/search_bar';
import VideoDetail from '../components/video_detail';

Enzyme.configure({ adapter: new Adapter() });
```

Here we are importing the Enzyme library, the components that will be tested, the adapter, and initializing the adapter. Let's write our first test.

💻 Add this code to the file:

```javascript
describe('SearchBar', () => {
  it('Check for proper class name', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.hasClass('searchBar'));
  });
 });
```

Here we are specifying that the upcoming tests pertain to SearchBar. We do this with `describe`. Then we say what the specific test does with `it`. In this case we check for the proper class name, and the actual checking is done with `expect(wrapper.hasClass('searchBar'));` Save this file and run `yarn testit` just like above. If all was succesful you should see an extra test passed for SearchBar.

Let's add a few more cases. 💻 Add the following code underneath the first `it`, but within the same `describe` scope.

```javascript
it('Check for amount of children equal to zero', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.children(SearchBar)).to.have.lengthOf(1);
  });

  it('Check for proper value "searchterm"', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.state('searchterm')).to.equal('');
  });
```

These two tests check that the SearchBar has one child, and that it has a state field with key `searchterm` and value `''`. If you take a look at `search_bar.js` you will see why we are checking for this state field. Exit the file and run your tests.

Seems like one of our tests failed. It turns out the SearchBar has no children, and so our second test has failed. Change `expect(wrapper.children(SearchBar)).to.have.lengthOf(1);` to `expect(wrapper.children(SearchBar)).to.have.lengthOf(0);` and run `yarn testit` again.

Now it all works! Let's test a second component. 💻 Add the following to your code:

```javascript
describe('VideoDetail', () => {
  it('Check for proper class name', () => {
    const wrapper = shallow(<VideoDetail />);
    expect(wrapper.hasClass('details'));
  });

  it('Check for proper ID', () => {
    const wrapper = shallow(<VideoDetail />);
    expect(wrapper.is('video-detail'));
  });

  it('Check for "Loading" message on no passed video prop', () => {
    const wrapper = shallow(<VideoDetail />);
    expect(wrapper.props().children).to.equal('Loading...');
  });
});
```

These tests are now on the `VideoDetail` component. What do they do? One checks for a proper class name, another for a proper ID, and the last for the correct prop. Notice that the `VideoDetail` component simply renders `Loading...` if it receives no passed prop of name `video`. Here we check for this because the component is being shallow rendered. Do you remember the difference between shallow rendering and full rendering?

💻 Run `yarn testit` one last time. All your tests pass now. Congrats!

## Code Coverage

At this point you've added some unit tests to your code; how do you know if you've tested all of your code? You could go through your source code and test cases by hand to determine how much of your coded is covered by tests, but that's too much work. Instead we'll have istanbul generate a code coverage report.

To get started, add the dependency with `yarn add nyc`. This gives you access to istanbul's command line tool nyc.

Next, were going to add two scripts to your package.json. These scripts are simply the same command used to run the mocha tests, prefixed with a call to the code coverage tool (i.e. "nyc --options mocha --options").

```
"coverage": "nyc --reporter=text mocha 'src/test' --require @babel/register --timeout=3000",
"coverageHTML": "nyc --reporter=html mocha 'src/test' --require @babel/register --timeout=3000"
```

Both commands produce coverage reports, one script writes a text report to stdout while the other script generates an html page.

Now, go to terminal and run the text coverage script with `yarn coverage`. This should run all of the tests in `src/test/` directory producing any output the tests might generate, followed by a coverage summary produced by istanbul. The summary should look something like:

```
----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |    81.82 |      100 |       75 |    81.82 |                   |
 youtube-api.js |    81.82 |      100 |       75 |    81.82 |             21,22 |
----------------|----------|----------|----------|----------|-------------------|
```

If you're looking for an even more detailed view, run the html coverage script with `yarn coverageHTML`. This produces an interactive html page. Navigate into the resulting directory `coverage/` in terminal and start a python server with `python -m SimpleHTTPServer 9000` for python2 or `python -m http.server 9000` for python3. In your browser go to `localhost:9000` to view the coverage report.

These scripts both produce output files. It is up to you on whether or not to save these files in your git project. On one hand they maintain a history of test coverage over time, on the other they are not part of the source code of the project. To exclude the files, add `.nyc_output` and `coverage` to your `.gitignore` file.

## What have We Learned?

* [ ] How to implement Mocha and Chai!
* [ ] The basics of Test Driven Development (TDD)
* [ ] A few of the many reasons it is important to maintain good testing practices
* [ ] A new way to display our code coverage so we can track the effectiveness of our testing in a visual way!

## Reflection

* [ ] What are the benefits of employing Test Driven Development strategies and robust testing in general?
* [ ] Why might one want to use Jest over Mocha and vice versa?

Please review the [slides](https://docs.google.com/presentation/d/12tgDnjBk6Xmp61MxjtM9FsQW-c83R5ViF607AXvx74I/edit?usp=sharing) for testing inspiration in the future 😊

## Resources

* https://jestjs.io/
* https://medium.com/@dschmidt1992/jest-snapshot-testing-3ef9fa1222bb
* https://instea.sk/2016/08/testing-react-applications-with-karma-jest-or-mocha/
* https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2019-264e19514d0a
* https://istanbul.js.org/docs/tutorials/mocha/
* https://istanbul.js.org/docs/tutorials/mocha/
* https://www.sitepoint.com/unit-test-javascript-mocha-chai/
* https://www.npmtrends.com/
* https://www.chaijs.com/
