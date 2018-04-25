/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchCart, addProductToCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('get cart', () => {
    it('eventually dispatches the GET CART action', () => {
      const fakeCart = { 3: 5, 7: 1, 6: 2 }
      mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
      return store.dispatch(fetchCart())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_CART')
          expect(actions[0].cart).to.be.deep.equal(fakeCart)
        })
    })
  })

  describe('add to cart', () => {
    it('dispatches the ADD TO CART action', () => {
      const fakeCart = { 6: 3 }
      mockAxios.onPut('/api/cart/add', {productId: 6}).replyOnce(200, { 6: fakeCart[6] + 1 })
      return store.dispatch(addProductToCart({productId: 6}))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('ADD_TO_CART')
          expect(actions[0].product).to.be.deep.equal({6: 4})
        })
    })
  })
})
