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
