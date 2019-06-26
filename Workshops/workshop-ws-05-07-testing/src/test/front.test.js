/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from '../components/search_bar';
import VideoDetail from '../components/video_detail';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchBar', () => {
  it('Check for proper class name', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.hasClass('searchBar'));
  });
  it('Check for amount of children equal to zero', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.children(SearchBar)).to.have.lengthOf(0);
  });

  it('Check for proper value "searchterm"', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.state('searchterm')).to.equal('');
  });
});

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
