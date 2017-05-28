import 'mocha';
import { expect } from 'chai';
import QueueArray from '../src/QueueArray';

describe('QueueArray', () => {
  let queue;

  beforeEach(() => {
    queue = new QueueArray<number>();
  });

  describe('#enqueue', () => {
    it('enqueues an element ', () => {
      expect(queue.count).to.equal(0);
      queue.enqueue(1);
      expect(queue.count).to.equal(1);
      queue.enqueue(2);
      expect(queue.count).to.equal(2);
      queue.enqueue(3);
      expect(queue.count).to.equal(3);
      expect(queue.peek()).to.equal(1);
    });
  });

  describe('#dequeue', () => {
    it('dequeues the queue', () => {
      for (let i = 0; i < 5; i += 1) queue.enqueue(i);
      expect(queue.count).to.equal(5);
      expect(queue.peek()).to.equal(0);

      expect(queue.dequeue()).to.equal(0);
      expect(queue.peek()).to.equal(1);
      expect(queue.count).to.equal(4);

      expect(queue.dequeue()).to.equal(1);
      expect(queue.peek()).to.equal(2);
      expect(queue.count).to.equal(3);

      expect(queue.dequeue()).to.equal(2);
      expect(queue.peek()).to.equal(3);
      expect(queue.count).to.equal(2);

      queue.enqueue(10);
      queue.enqueue(20);
      queue.enqueue(30);

      expect(queue.dequeue()).to.equal(3);
      expect(queue.peek()).to.equal(4);
      expect(queue.count).to.equal(4);

      expect(queue.dequeue()).to.equal(4);
      expect(queue.count).to.equal(3);

      expect(queue.dequeue()).to.equal(10);
      expect(queue.count).to.equal(2);

      expect(queue.dequeue()).to.equal(20);
      expect(queue.count).to.equal(1);

      expect(queue.dequeue()).to.equal(30);
      expect(queue.count).to.equal(0);

      expect(() => queue.peek()).to.throw();
      expect(() => queue.dequeue()).to.throw();
    });
  });

  describe('#peek', () => {
    it('returns the first element of the queue', () => {
      expect(() => queue.peek()).to.throw();
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.peek()).to.equal(1);
    });
  });

  describe('#iterator', () => {
    it('enumerates the content of the queue', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect([...queue]).to.eql([1, 2, 3]);
    });
  });
});
