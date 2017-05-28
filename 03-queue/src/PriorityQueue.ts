import LinkedList from '../../01-linked-list/src/LinkedList';

interface IPriorityQueue<T> {
  enqueue(value: T): void;
  dequeue(): T;
  peek(): T;
  clear(): void;
}

class PriorityQueue<T> implements IPriorityQueue<T> {
  private _list: LinkedList<T>;

  constructor() {
    this._list = new LinkedList<T>();
  }

  get count(): number {
    return this._list.count;
  }

  enqueue(value: T): void {
    let current = this._list.head;

    while (current !== null && current.value > value) {
      current = current.next;
    }

    if (current === null) {
      this._list.addLast(value);
    } else {
      this._list.addBefore(current, value);
    }
  }

  dequeue(): T {
    if (this.count === 0) {
      throw new Error('The queue is empty');
    }

    const first = this._list.head.value;

    this._list.removeFirst();

    return first;
  }

  peek(): T {
    if (this.count === 0) {
      throw new Error('The queue is empty');
    }

    return this._list.head.value;
  }

  // tslint:disable-next-line
  [Symbol.iterator]() {
    return this._list[Symbol.iterator]();
  }

  clear(): void {
    this._list.clear();
  }
}

export default PriorityQueue;
