interface IQueueArray<T> {
  enqueue(value: T): void;
  dequeue(): T;
  peek(): T;
  clear(): void;
}

class QueueArray<T> implements IQueueArray<T> {
  private _array: T[];
  private _size: number;
  private _head: number;
  private _tail: number;

  constructor() {
    this._size = 0;
    this._head = 0;
    this._tail = -1;
    // tslint:disable-next-line
    this._array = new Array(this._size);
  }

  get count(): number {
    return this._size;
  }

  enqueue(value: T): void {
    if (this._size === this._array.length) {
      const newSize = this._size === 0 ? 4 : this._size * 2;
      // tslint:disable-next-line
      const newArray = new Array(newSize);

      if (this._size > 0) {
        let index = 0;

        if (this._tail < this._head) {
          for (let i = this._head; i < this._array.length; i += 1) {
            newArray[index] = this._array[i];
            index += 1;
          }

          for (let i = 0; i <= this._tail; i += 1) {
            newArray[index] = this._array[i];
            index += 1;
          }
        } else {
          for (let i = 0; i < this._array.length; i += 1) {
            newArray[index] = this._array[i];
            index += 1;
          }
        }

        this._head = 0;
        this._tail = index - 1;
      } else {
        this._head = 0;
        this._tail = -1;
      }

      this._array = newArray;
    }

    if (this._tail === this._array.length - 1) {
      this._tail = 0;
    } else {
      this._tail += 1;
    }

    this._array[this._tail] = value;
    this._size += 1;
  }

  dequeue(): T {
    if (this.count === 0) {
      throw new Error('The queue is empty');
    }

    const value = this._array[this._head];

    if (this._head === this._array.length - 1) {
      this._head = 0;
    } else {
      this._head += 1;
    }

    this._size -= 1;

    return value;
  }

  peek(): T {
    if (this.count === 0) {
      throw new Error('The queue is empty');
    }

    return this._array[this._head];
  }

  // tslint:disable-next-line
  [Symbol.iterator]() {
    const size = this._size;
    const array = this._array;
    let ptr = 0;

    return {
      next() {
        if (ptr === size) {
          return {
            done: true,
            value: null
          };
        } else {
          return {
            done: false,
            // tslint:disable-next-line
            value: array[ptr++]
          };
        }
      }
    };
  }

  clear() {
    this._size = 0;
    this._head = 0;
    this._tail = -1;
    // tslint:disable-next-line
    this._array = new Array(this._size);
  }
}

export default QueueArray;
