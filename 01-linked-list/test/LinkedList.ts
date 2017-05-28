import 'mocha';
import { expect } from 'chai';
import LinkedList from '../src/LinkedList';

describe('LinkedList', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList<number>();
    for (let i = 0; i < 3; i += 1) list.add(i);
    expect(list.count).to.equal(3);
    expect(list.head.value).to.equal(2);
    expect(list.tail.value).to.equal(0);
  });

  describe('#addFirst', () => {
    it('adds an element at the top of the list', () => {
      expect(list.count).to.equal(3);
      list.addFirst(3);
      expect(list.head.value).to.equal(3);
      expect(list.tail.value).to.equal(0);
      expect(list.count).to.equal(4);
      list.addFirst(5);
      expect(list.head.value).to.equal(5);
      expect(list.tail.value).to.equal(0);
      expect(list.count).to.equal(5);
      list.addFirst(7);
      expect(list.head.value).to.equal(7);
      expect(list.count).to.equal(6);
    });
  });

  describe('#addLast', () => {
    it('adds an element at the end of the list', () => {
      expect(list.count).to.equal(3);
      list.addLast(1);
      expect(list.head.value).to.equal(2);
      expect(list.tail.value).to.equal(1);
      expect(list.count).to.equal(4);
      list.addLast(3);
      expect(list.head.value).to.equal(2);
      expect(list.tail.value).to.equal(3);
      expect(list.count).to.equal(5);
      list.addLast(5);
      expect(list.tail.value).to.equal(5);
      expect(list.count).to.equal(6);
    });
  });

  describe('#remove', () => {
    it('removes an arbitrary element from the list', () => {
      expect(list.remove(6)).to.be.false;
      expect(list.remove(4)).to.be.false;
      expect(list.remove(2)).to.be.true;
      expect(list.head.value).to.equal(1);
      expect(list.tail.value).to.equal(0);
      expect(list.count).to.equal(2);
      expect(list.remove(0)).to.be.true;
      expect(list.head.value).to.equal(1);
      expect(list.tail.value).to.equal(1);
      expect(list.count).to.equal(1);
      expect(list.remove(1)).to.be.true;
      expect(list.head).to.be.null;
      expect(list.tail).to.be.null;
      expect(list.count).to.equal(0);
    });
  });

  describe('#removeFirst', () => {
    it('removes an element from the beginning of the list', () => {
      list.removeFirst();
      expect(list.head.value).to.equal(1);
      expect(list.tail.value).to.equal(0);
      expect(list.count).to.equal(2);
      list.removeFirst();
      expect(list.head.value).to.equal(0);
      expect(list.tail.value).to.equal(0);
      expect(list.count).to.equal(1);
      list.removeFirst();
      expect(list.head).to.be.null;
      expect(list.tail).to.be.null;
      expect(list.count).to.equal(0);
    });
  });

  describe('#removeLast', () => {
    it('removes an element from the end of the list', () => {
      list.removeLast();
      expect(list.count).to.equal(2);
      expect(list.head.value).to.equal(2);
      expect(list.tail.value).to.equal(1);
      list.removeLast();
      expect(list.count).to.equal(1);
      expect(list.head.value).to.equal(2);
      expect(list.tail.value).to.equal(2);
      list.removeLast();
      expect(list.count).to.equal(0);
      expect(list.head).to.be.null;
      expect(list.tail).to.be.null;
    });
  });

  describe('#contains', () => {
    it('check if element exists in the list', () => {
      expect(list.contains(3)).to.be.false;
      list.add(5);
      list.add(3);
      expect(list.contains(5)).to.be.true;
      expect(list.contains(3)).to.be.true;
      expect(list.contains(6)).to.be.false;
    });
  });

  describe('#copyTo', () => {
    it('copy the list content to an array', () => {
      let arr = [];
      expect(() => list.copyTo(arr, -1)).to.throw();
      list.copyTo(arr, 0);
      expect(arr).to.eql([2, 1, 0]);
      arr = [10];
      list.copyTo(arr, 1);
      expect(arr).to.eql([10, 2, 1, 0]);
    });
  });

  describe('#iterator', () => {
    it('enumerates the content of the list', () => {
      expect([...list]).to.eql([2, 1, 0]);
    });
  });
});
