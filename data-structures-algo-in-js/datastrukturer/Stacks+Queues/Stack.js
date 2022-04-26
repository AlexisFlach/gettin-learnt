// Linked List Array implementation

var stack = [];

stack.unshift("create new file");
stack.unshift("Resize file");
stack.unshift("cloned out wrinkle");
stack.shift();

stack.push("create new file");
stack.push("Resize file");
stack.push("cloned out wrinkle");
stack.pop();

// Linked List Implementation

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class Stack {
//   constructor() {
//     this.first = null;
//     this.last = null;
//     this.size = 0;
//   }
//   push(val) {
//     var node = new Node(val);
//     if (this.size === 0) {
//       this.first = node;
//       this.last = node;
//     } else {
//       var temp = this.first;
//       this.first = node;
//       this.first.next = temp;
//     }
//     return ++this.size;
//   }

//   pop() {
//     if (this.size === 0) return null;
//     let temp = this.first;
//     if (this.size === 1) {
//       this.first = null;
//       this.last = null;
//     }
//     this.first = temp.next;
//     this.size--;
//     return temp.value;
//   }
// }

// var stack = new Stack();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.push(4);
// console.log(stack);

// Queue Array implementation

var q = [];

q.push("first");
q.push("second");
q.push("third");
q.shift();

q.unshift("a");
q.unshift("b");
q.unshift("c");
q.pop();

// Linked List Queue Implementation

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(val) {
    var node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.first) return null;

    var temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}

var queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log(queue);
