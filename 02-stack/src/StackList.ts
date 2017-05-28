import LinkedList from '../../01-linked-list/src/LinkedList';

interface IStackList<T> {
  push(value: T): void;
  pop(): T;
  peek(): T;
  clear(): void;
}

class StackList<T> implements IStackList<T> {
  private _list: LinkedList<T>;

  constructor() {
    this._list = new LinkedList<T>();
  }

  get count(): number {
    return this._list.count;
  }

  push(value: T): void {
    this._list.addLast(value);
  }

  pop(): T {
    if (this._list.count === 0) {
      throw new Error('The stack is empty');
    }

    const value = this._list.tail.value;

    this._list.removeLast();

    return value;
  }

  peek(): T {
    if (this._list.count === 0) {
      throw new Error('The stack is empty');
    }

    return this._list.tail.value;
  }

  // tslint:disable-next-line
  [Symbol.iterator]() {
    return this._list[Symbol.iterator]();
  }

  clear(): void {
    this._list.clear();
  }
}

export default StackList;
