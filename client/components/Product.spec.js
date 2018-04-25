/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Product from './Product';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Product component:', () => {
  let newProduct;

  beforeEach(() => {
    const product = {
      id: 6,
      imgUrl: 'http://images.com/someImg.png',
      name: 'Frosted Flakes',
      price: 5
    };
    newProduct = shallow(<Product product={product} />);
  });

  it('renders the title and price in a <div> tag', () => {
    const divItems = newProduct.find('div');
    expect(divItems).to.have.length(2);
    expect(divItems.at(0).text()).to.be.equal('Title: Frosted Flakes');
    expect(divItems.at(1).text()).to.be.equal(`Price: $${5}`);
  });
}); //end of ('Product component:');
