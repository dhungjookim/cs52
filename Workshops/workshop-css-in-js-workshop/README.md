# CS52 Workshops:  CSS in JavaScript

![](https://media.giphy.com/media/fs68M1NGzYwv0aQmhO/giphy.gif)

Why are we making the switch from CSS and inline?  Well, as we learned today, not all CSS features work with JavaScript event handlers. 
Darn! 
Soooo JS? YES! With JS you can use every media query and pseudo selector. Some libraries (like jss, styled-components) even add support for cooool, non-CSS-native features.

Gone are the days of long style sheets. Here to stay is CSS in JS :raised_hands:.

As we learned in class, some highlights of style-components are: 

**Automatic critical CSS:** styled-components keeps track of which components are rendered on a page and injects their styles and nothing else, fully automatically. **Easier deletion of CSS:** If the component is unused (which tooling can detect) and gets deleted, all its styles get deleted with it. **Simple dynamic styling:** adapting the styling of a component based on its props or a global theme is simple and intuitive without having to manually manage dozens of classes. **Painless maintenance:** you never have to hunt across different files to find the styling affecting your component, so maintenance is a piece of cake no matter how big your codebase is. **Automatic vendor prefixing:** write your CSS to the current standard and let styled-components handle the rest.



## Overview

At this point, we have all (hopefully :grimacing:) finished Short Assignment 4 and have some experience using React to build a video application.  For this workshop, we are going to restyle SA4 using CSS in JS to replace our style.scss sheet.  Once we have successfully transferred the baseline style, we'll see what else we can do with CSS in JS by adding a nav bar to the page and giving it some style!  We’ll walk you through this process step by step, but feel free to change the styles up as you go.

## Setup

Download your own copy of this repo so you have all of the necessary code on your computer. :computer:cd into the workshop-css-in-js-workshop folder (if you couldn’t tell, this is a workshop). You should have a README.md, img folder, package.json, src folder, webpack.config.js, and yarn.lock. Since we are using javascript styling instead of CSS now, most of the files we will be working with will be javascript files. 

Let's take care of a few more set-up steps before we begin (check again to make sure you are in the correct directory!).  

First, let's take care of some general steps.  Let's add in support for React and JSX in babel,
```
yarn add --dev @babel/preset-react @babel/plugin-proposal-class-properties
```
and take care of some of our dependencies.
```
yarn add lodash.debounce react react-dom react-router axios
```

Finally, let’s finish add the dependencies we will need to use style-components. 

```
yarn add styled-components
```

Nice!  Now everything should be set up and we can move on to the fun stuff :thumbsup:

## Step by Step

### Step 1: Add your own YouTube API Key

Before we begin styling, edit the `youtube-api.js` file (in the src folder) to include your API key.  You should use the same key you used for the short assignment.  This link - https://github.com/dartmouth-cs52-19S/sa4-yourname - should take you to your SA4 repository; your own API key should be found in your src/youtube-api.js.
```
const API_KEY = 'YOUR SAVED API KEY'; // add your own key here
```

Now start up your webpack-dev-server!  

```
yarn start
```
Open the localhost in your browser, and you should see the SA4 frontend webapp with some basic styling.



### Step 2: Let's get stylin' :sunglasses:

Now that we’ve made sure the webapp is functioning, let’s put our new CSS in JS skills to the test. For the short assignment, we used styles.scss to make our page look nice. For this workshop, we are going to use the styled-components library to style our page directly in our JavaScript files.

Let's get started with our search bar first. For every file that we use styled-components in, we will need to import the library. So, let's start by doing that at the top of our ```search_bar.js``` file (in ./src/components).
```javascript
import styled from 'styled-components';
```

Great, now that we've got that loaded in let's create our first styled component. Above the ```SearchBar``` class, paste this code to create a styled search component.
```
const Search = styled.div`
  margin-bottom: 20px;
`;
```

Check our ```style.scss``` file. Can you see which element we might be restyling?

Next, paste in this styling code below our newly added ```Search``` component.
```
const Input = styled.input`
  font-size: 1.5em;
  border-radius: .25em;
`;
```
This block might be a little more obvious as to which element we are mimicking, but feel free to check the style file again and compare.

Next, we need to update how our `SearchBar` renders by replacing the previous code with our newly created ```Input``` component. Our return statement should now look like:
```
<Search>
    <Input onChange={this.onInputChange} value={this.state.searchterm} />
</Search>
```
Now, we can take the `#search-bar` section out of our .scss and we should notice no difference! Which isn't that exciting but it does mean we successfully used `styled-components`!

Ok, let's pause for a second and understand what is going on. When we created a styled component, we specify its HTML tag using dot notation. Then, inside the special quotes, we can write CSS code as normal. We can then use these components in React just like we did in Short Assignment 4.

Moving down our `styles.scss` file, let's do `#video-detail` next. It's one line, but we're committed at this point. At the top of our `video_detail.js` file paste this code block:
```
import styled from 'styled-components';

const Detail = styled.div`
  width: 100%;
`;
```

And then let's edit our return statement in the `VideoDetail` constructor:
```
<Detail>
        <div className="embed-responsive embed-responsive-16by9">
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
          <iframe className="embed-responsive-item" src={url} />
        </div>
        <div className="details">
          <div>{video.snippet.title}</div>
          <div>{video.snippet.description}</div>
        </div>
 </Detail>
 ```
 
 We can now delete or comment out the `#video-detail` section from our `styles.scss`!
 Let's move to `video_list_item.js` next to style our list elements. Again, at the top of our file paste:
 ```
 import styled from 'styled-components';

const VideoItem = styled.li`
  list-style: none;
  cursor: pointer;
  display: flex;
  width: 25vw;
  padding: 10px;

  :hover {
    background-color: gray;
  }
`;
```
Again, update the return statement to accomodate the added CSS in JS.
```
<VideoItem onClick={() => props.onVideoSelect(props.video)}>
    <img src={imgUrl} alt="video" />
    <div>{props.video.snippet.title}</div>
</VideoItem>
```

Let's finish in our `index.js` file. Add the import statement, this time above our imports for the other components of our webpage. Then, before our `App` class, paste:
```
const VideoSection = styled.div`
  display: flex;
`;
```

Finally, update our `App` return to look like:
```
<div>
        <SearchBar onSearchChange={this.search} />

        <VideoSection>
          <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} />
          <VideoDetail video={this.state.selectedVideo} />
        </VideoSection>
</div>
```
Now, we can comment out or delete all of our `styles.scss` file except for the `body` section. And now our webpage is entirely styled by components!


### Step 3: Creating a Nav Bar
We're going to create a Navigation Bar from scratch and add some nice styled-components to it!
Create a new file in your /components folder called ```nav_bar.js```. We're going to start with the bare bones of a navigation bar and see how we'd style it. 
```
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <Bar>
        <Button>MyTube</Button>
        <List>
          <ListItem><a href="#">Home</a></ListItem>
          <ListItem><a href="#">About</a></ListItem>
          <ListItem><a href="#">FAQ</a></ListItem>
          <ListItem><a href="#">Contact</a></ListItem>
        </List>
      </Bar>
    );
  }
}

export default NavBar;

```
... Wait a second, what's ```<Bar>```? What's ```<Button>```? What's ```<List>``` and ```<ListItem>```? Great question! For styled-components, we will define a ```const Bar, Button, List,``` and ```ListItem``` that will be a styled div, button, ul, and li. Go ahead and add the following code above your class NavBar (just underneath "import React.." to create our styled-components:

```
import styled from 'styled-components';

const Bar = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
border: 2px solid #F05252;
box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
margin: 2em 0;
padding: 2em 2em;
border-radius: 3px;
`;
const Button = styled.button`
color: white;
padding: 0 2em;
margin: 0 1em;
background: #F05252;
border: 2px solid #F05252;
border-radius: 3px;
`;
const List = styled.ul`
display: flex;
flex-direction: row;
justfy-content: space-around;
list-style-type: none;
margin: 0em 2em;
`;
const ListItem = styled.li`
padding: 0 2em;
color: #F05252;
`;
```

Now let's import NavBar to your ```index.js``` file:

```
import NavBar from './components/nav_bar';
```

and add it above your ```<SearchBar/>``` in the render function:
```
<div><NavBar /></div>
```

Your navbar should look something like this:
<img width="1015" alt="Screen Shot 2019-04-16 at 11 31 40 AM" src="https://user-images.githubusercontent.com/38498065/56223603-13eb4200-603c-11e9-8b40-5ba93dcf0e80.png">

Quite often you might want to use a component, but change it slightly for a single case. For example, you might want to use our button for the navigation menu links, but you want them to look slightly different. You could pass in a function and then change them based on some props, but that's a lot of code and effort for a small change. 

What we're going to do is make a new component that inherits the styling of another. We'll wrap it in the styled() constructor and extend/replace some styling. 

To change the ListItem links, we're going to make a new component ListItem2:
```
const ListItem2 = styled(Button)`
color: #F05252;
background: white;
`;
```
Now replace our previous list of ListItem with the following code (you can go ahead and delete the ```const ListItem``` to avoid eslint errors:
```
<ListItem2 as="a" href="/">Home</ListItem2>
<ListItem2 as="a" href="/">About</ListItem2>
<ListItem2 as="a" href="/">FAQ</ListItem2>
<ListItem2 as="a" href="/">Contact</ListItem2>
```

What we've done here is use the "as" polymorphic prop to dynamically swap out the element that receives the styles for Button. Here, the element ```a``` pretends it's a button but ultimately gets rendered out as a hyperlink. Pretty cool, and very useful for more robust navigation bars you might make in the future. 

Here's what you should end up with:
<img width="1038" alt="Screen Shot 2019-04-16 at 11 32 10 AM" src="https://user-images.githubusercontent.com/38498065/56223601-13eb4200-603c-11e9-8adc-cd2af31bbb37.png">

What about selectors, like ```:hover``` or ```:active``` ? You can add that right into your styled component! Let's make the link buttons have the red (#F05252) background and white text on hover. Maybe add in a little ease-in-out transform to it for that smooooth user experience ;) Here's a code snippet to help you start out:

```
// const ListItem2 = styled(Button)`
// ...


&:hover {
  // your code here
}
`;


```

And there you have it! 

![](https://media.giphy.com/media/3otPoS81loriI9sO8o/giphy.gif)

## Summary / What you Learned

**What your site has:**
* [ ] A redesigned Short Assignment 4, but this time with styled-components
* [ ] A Navigation Bar that serves as the basis for future navigation bars

**What you learned:**
* [ ] The various ways in which you can incorporate CSS in JS
* [ ] The advantages and limitations of styled-components
* [ ] The basics of using styled-components
* [ ] Ways of extending styled-components to adapt one style to another

## Extra Credit
* Restyle all the components you built in SA4 and make it look beauuuutiful!
* Create a footer for your page
* Change the Navigation Bar so the links themselves are components rather than static hyperlinks

## Reflection Questions


* [ ] What exactly is CSS-in-javascript and how does it differ from CSS stylesheets and inline styling?
* [ ] Why wouldn’t we always want to use CSS-in-javascript?


## Resources

* https://blog.bitsrc.io/9-css-in-js-libraries-you-should-know-in-2018-25afb4025b9b
* https://medium.com/@himrc/why-i-love-css-in-js-aphrodite-vs-radium-b2c9bea9a182
* https://github.com/cssinjs/jss-isolate
* https://reactjs.org/docs/components-and-props.html
* https://www.styled-components.com/ 
* https://medium.freecodecamp.org/a-5-minute-intro-to-styled-components-41f40eb7cd55 
* https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc
* https://tylermcginnis.com/podcast/max-stoiber/

