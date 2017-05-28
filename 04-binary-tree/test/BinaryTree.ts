import 'mocha';
import { expect } from 'chai';
import BinaryTree from '../src/BinaryTree';

const populateTree = (tree) => {
  tree.add(4);
  tree.add(5);
  tree.add(2);
  tree.add(7);
  tree.add(3);
  tree.add(6);
  tree.add(1);
  tree.add(8);
};

const getNodeValue = node => node && node.value;
const getLeftNodeValue = node => node && node.left && node.left.value;
const getRightNodeValue = node => node && node.right && node.right.value;

describe('BinaryTree', () => {
  let tree;

  beforeEach(() => {
    tree = new BinaryTree<number>();
    populateTree(tree);
  });

  describe('#add', () => {
    it('adds elements to the tree with the right ordering', () => {
      expect(tree.count).to.equal(8);
      expect(getNodeValue(tree.head)).to.equal(4);
      expect(getLeftNodeValue(tree.head)).to.equal(2);
      expect(getRightNodeValue(tree.head)).to.equal(5);
      expect(getLeftNodeValue(tree.head.left)).to.equal(1);
      expect(getRightNodeValue(tree.head.left)).to.equal(3);
      expect(getRightNodeValue(tree.head.right)).to.equal(7);
    });
  });

  describe('#contains', () => {
    it('check if element exists in the tree', () => {
      expect(tree.contains(10)).to.be.false;
      expect(tree.contains(8)).to.be.true;
      expect(tree.contains(11)).to.be.false;
      expect(tree.contains(1)).to.be.true;
    });
  });

  describe('#remove', () => {
    it('correctly removes nodes with no right child', () => {
      tree.remove(8);
      expect(tree.count).to.equal(7);
      expect(getRightNodeValue(tree.head.right)).to.equal(7);
      expect(getRightNodeValue(tree.head.right.right)).to.equal(null);
    });

    it('correctly removes nodes whose right child has no left child', () => {
      tree.remove(7);
      expect(tree.count).to.equal(7);
      expect(getRightNodeValue(tree.head.right)).to.equal(8);
      expect(getLeftNodeValue(tree.head.right.right)).to.equal(6);
      expect(getRightNodeValue(tree.head.right.right)).to.equal(null);
    });

    it('correctly removes nodes whose right child has a left child', () => {
      tree.remove(5);
      expect(tree.count).to.equal(7);
      expect(getRightNodeValue(tree.head)).to.equal(6);
      expect(getRightNodeValue(tree.head.right)).to.equal(7);
      expect(getRightNodeValue(tree.head.right.right)).to.equal(8);
    });
  });

  describe('Tree traversal', () => {
    describe('#preOrderTraversal', () => {
      it('enumerates tree elements in pre order', () => {
        expect(tree.preOrderTraversal(x => x)).to.deep.equal([4, 2, 1, 3, 5, 7, 6, 8]);
      });
    });

    describe('#inOrderTraversal', () => {
      it('enumerates tree elements in order', () => {
        expect(tree.inOrderTraversal(x => x)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8]);
      });
    });

    describe('#postOrderTraversal', () => {
      it('enumerates tree elements in post order', () => {
        expect(tree.postOrderTraversal(x => x)).to.deep.equal([1, 3, 2, 6, 8, 7, 5, 4]);
      });
    });
  });
});
