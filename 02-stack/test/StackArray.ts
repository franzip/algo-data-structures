import 'mocha';
import { expect } from 'chai';
import StackArray from '../src/StackArray';

describe('StackArray', () => {
  let stack;

  beforeEach(() => {
    stack = new StackArray<number>();
  });

  describe('#push', () => {
    it('adds an element at the top of the stack', () => {
      expect(() => stack.peek()).to.throw();
      expect(stack.count).to.equal(0);
      stack.push(1);
      expect(stack.peek()).to.equal(1);
      expect(stack.count).to.equal(1);
      stack.push(2);
      expect(stack.peek()).to.equal(2);
      expect(stack.count).to.equal(2);
    });
  });

  describe('#pop', () => {
    it('removes an element at at the bottom of the stack and returns it', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.count).to.equal(3);
      expect(stack.pop()).to.equal(3);
      expect(stack.count).to.equal(2);
      expect(stack.pop()).to.equal(2);
      expect(stack.count).to.equal(1);
      expect(stack.pop()).to.equal(1);
      expect(stack.count).to.equal(0);
      expect(() => stack.pop()).to.throw();
    });
  });

  describe('#peek', () => {
    it('returns the topmost element of the stack', () => {
      stack.push(1);
      expect(stack.count).to.equal(1);
      expect(stack.peek()).to.equal(1);
      expect(stack.count).to.equal(1);
    });
  });

  describe('#iterator', () => {
    it('enumerates the content of the stack', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect([...stack]).to.eql([1, 2, 3]);
    });
  });
});
