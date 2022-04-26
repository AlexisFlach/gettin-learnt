class Node {
  constructor(val) {
    this.val = val;
    this.next = null
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const node = new Node(val)
    if(!this.head) {
      this.head = node;
      this.tail = this.head
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }
  pop() {
    if(!this.head) return undefined;

    let current = this.head;
    let newTail = current;
    while(current.next) {
      newTail = current;
      current = current.next
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if(this.length === 0) {
      this.head = null;
      this.tail = null
    }
  }
  shift() {
    if(!this.head) return undefined;
    let currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if(this.length === 0 ) {
      this.tail = null
    }
    return currentHead;
  }
  unshift(val) {
    const node = new Node(val);
    if(!this.head) {
      this.head = node;
      this.tail = this.head
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }
  get(index) {
    if(index < 0 || index >= this.length) return null;
      let counter = 0;
      let current = this.head;
      while(counter !== index) {
        current = current.next;
        counter++
      }
      return current;
  }
  set(index, val) {
    var foundNode = this.get(index)
    if(foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }
  insert(index, val) {
    if(index < 0 || index > this.length) return false;
    if(index === this.length) return !!this.push(val);
    if(index === 0) return !!this.unshift(val)

    let node = new Node(val)
    let prev = this.get(index - 1);
    let temp = prev;
    prev.next = node;
    this.length++;
    return true
  }
  remove(index) {
    if(index < 0 || index >= this.length) return undefined;
    if(index === this.length - 1) return this.pop()
    if(index === 0) return this.shift()
    let prev = this.get(index - 1)
    let removed = prev.next
    this.length--;
    return removed
  }
  print() {
    let arr = []
    let current = this.head
    while(current) {
      arr.push(current.val)
      current = current.next;
    }
    console.log(arr);
  }

  reverse(){
    let node = this.head
    this.head = this.tail
    this.tail = node;
    let next;
    let prev = null;
    for(let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next
    }
    return this;
  }
}

const singly = new SinglyLinkedList()

console.log(singly);