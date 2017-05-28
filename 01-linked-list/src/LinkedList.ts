import LinkedListNode from './LinkedListNode';

interface ILinkedList<T> {
  count: number;
  isReadOnly: boolean;
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
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

class LinkedList<T> implements ILinkedList<T> {
  private _count: number;
  private _head: LinkedListNode<T>;
  private _tail: LinkedListNode<T>;

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

  get head(): LinkedListNode<T> {
    return this._head;
  }

  get tail(): LinkedListNode<T> {
    return this._tail;
  }

  add(value: T): void {
    return this.addFirst(value);
  }

  addBefore(node: LinkedListNode<T>, value: T): void {
    if (!this.contains(node.value)) return;

    let current = this._head;
    let previous = null;

    while (current !== null && current.value !== node.value) {
      previous = current;
      current = current.next;
    }

    const newNode = new LinkedListNode(value);

    newNode.next = current;

    if (previous === null) {
      this._head = newNode;
    } else {
      previous.next = newNode;
    }

    this._count += 1;
  }

  addFirst(value: T): void {
    const head = this._head;
    const node = new LinkedListNode(value);

    this._head = node;
    this._head.next = head;

    this._count += 1;

    if (this._count === 1) {
      this._tail = this._head;
    }
  }

  addLast(value: T): void {
    const tail = this._tail;
    const node = new LinkedListNode(value);

    if (tail != null) {
      tail.next = node;
    }

    this._tail = node;

    this._count += 1;

    if (this._count === 1) {
      this._head = this._tail;
    }
  }

  remove(value: T): boolean {
    if (this.count !== 0) {
      let current = this._head;
      let previous = null;

      if (current.value === value) {
        this.removeFirst();
        return true;
      }

      while (current.next !== null) {
        previous = current;
        current = current.next;

        if (current.value === value) {
          if (current.next === null) {
            this._tail = previous;
          }

          previous.next = current.next;

          this._count -= 1;
          return true;
        }
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

      this._count -= 1;

      if (this.count === 0) {
        this._tail = null;
      }
    }
  }

  removeLast(): void {
    if (this.count !== 0) {
      let current = this._head;
      let previous = null;

      while (current.next !== null) {
        previous = current;
        current = current.next;
      }

      this._count -= 1;

      if (this.count !== 0) {
        previous.next = null;
        this._tail = previous;
      } else {
        this._head = null;
        this._tail = null;
      }
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

export default LinkedList;
