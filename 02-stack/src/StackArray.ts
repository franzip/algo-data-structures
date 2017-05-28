interface IStackArray<T> {
  push(value: T): void;
  pop(): T;
  peek(): T;
  clear(): void;
}

class StackArray<T> implements IStackArray<T> {
  private _array: T[];
  private _size: number;

  constructor() {
    this._size = 0;
    // tslint:disable-next-line
    this._array = new Array(this._size);
  }

  get count(): number {
    return this._size;
  }

  push(value: T): void {
    this._array.push(value);
    this._size += 1;
  }

  pop(): T {
    if (this._size === 0) {
      throw new Error('The stack is empty');
    }

    this._size -= 1;

    return this._array.pop();
  }

  peek(): T {
    if (this._size === 0) {
      throw new Error('The stack is empty');
    }

    return this._array[this._size - 1];
  }

  // tslint:disable-next-line
  [Symbol.iterator]() {
    return this._array[Symbol.iterator]();
  }

  clear(): void {
    this._size = 0;
    // tslint:disable-next-line
    this._array = new Array(this._size);
  }
}

export default StackArray;
