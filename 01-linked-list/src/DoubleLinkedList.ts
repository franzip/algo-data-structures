import DoubleLinkedListNode from './DoubleLinkedListNode';

interface ILinkedList<T> {
  count: number;
  isReadOnly: boolean;
  head: DoubleLinkedListNode<T> | null;
  tail: DoubleLinkedListNode<T> | null;
  add(value: T): void;
  addFirst(value: T): void;
  addLast(value: T): void;
  remove(value: T): boolean;
  removeFirst(): void;
  removeLast(): void;
  contains(value: T): boolean;
  copyTo(array: T[], index: number): void;
  clear(): void;
}

class DoubleLinkedList<T> implements ILinkedList<T> {
  private _count: number;
  private _head: DoubleLinkedListNode<T>;
  private _tail: DoubleLinkedListNode<T>;

  constructor() {
    this._count = 0;
    this._head = null;
    this._tail = null;
  }

  get count(): number {
    return this._count;
  }

  get isReadOnly(): boolean {
    return false;
  }

  get head(): DoubleLinkedListNode<T> {
    return this._head;
  }

  get tail(): DoubleLinkedListNode<T> {
    return this._tail;
  }

  add(value: T): void {
    return this.addFirst(value);
  }

  addFirst(value: T): void {
    const node = new DoubleLinkedListNode(value);
    const head = this._head;

    node.next = head;

    this._head = node;

    if (this.count === 0) {
      this._tail = node;
    } else {
      head.prev = node;
    }

    this._count += 1;
  }

  addLast(value: T): void {
    const node = new DoubleLinkedListNode(value);
    const tail = this._tail;

    node.prev = tail;

    this._tail = node;

    if (this.count === 0) {
      this._head = node;
    } else {
      tail.next = node;
    }

    this._count += 1;
  }

  remove(value: T): boolean {
    if (this._count !== 0) {
      let current = this._head;

      if (current.value === value) {
        this.removeFirst();
        return true;
      }

      while (current.next !== null) {
        if (current.value === value) {
          current.prev.next = current.next;
          this._count -= 1;
          return true;
        }

        current = current.next;
      }

      if (current.value === value) {
        this.removeLast();
        return true;
      }
    }

    return false;
  }

  removeFirst(): void {
    if (this.count !== 0) {
      const head = this._head;

      this._head = head.next;

      if (this._head !== null) {
        this._head.prev = null;
      }


      if (this.count === 1) {
        this._tail = this._head;
      }

      this._count -= 1;
    }
  }

  removeLast(): void {
    if (this.count !== 0) {
      const tail = this._tail;

      this._tail = tail.prev;

      if (this._tail !== null) {
        this._tail.next = null;
      }

      if (this.count === 1) {
        this._head = this._tail;
      }

      this._count -= 1;
    }
  }

  contains(value: T): boolean {
    if (this.count === 0) return false;

    let current = this._head;

    while (current !== null) {
      if (current.value === value) return true;
      current = current.next;
    }

    return false;
  }

  copyTo(array: T[], index: number): void {
    if (index < 0) throw new Error('Invalid array index');

    let current = this._head;
    let idx = index;

    while (current !== null) {
      array[idx] = current.value;
      idx += 1;
      current = current.next;
    }
  }
  // tslint:disable-next-line
  [Symbol.iterator]() {
    let ptr = this._head;
    let current;

    return {
      next() {
        if (ptr === null) {
          return {
            done: true,
            value: null
          };
        } else {
          current = ptr;
          ptr = ptr.next;
          return {
            done: false,
            value: current.value
          };
        }
      }
    };
  }

  clear(): void {
    this._count = 0;
    this._head = null;
    this._tail = null;
  }
}

export default DoubleLinkedList;
