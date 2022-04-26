# Heaps

### Vad är en Binary Heap?
Väldigt lik Binary Search Tree, men med vissa olikheter.
I **MaxBinaryHeap** är förälder noderna alltid **större** än sina barn noder.
I **MinBinareHeap** är förälder noderna alltid **mindre** än sina barn noder.


##### Vad definierar ett Max Binary Heap?

- Varje förälder har som mest 2 barn, vilket är var det binära kommer in.
- Värdet av varje förälder-nod är alltid högre än dess barn-noder.
- I en max Binary Heap är förälderns värde alltid högre än sina sina, men det finns ingen garantier mellan syskonen. På ett ställe kan vänsterbarnet vara större och på ett annat större.
- En Binary Heap är så kompakt som möjligt. Alla barn av varje node är så fyllda som de kan bli och vänsterbarnet fylls på först.



Binary Heaps används för att implementera **Priority Queues**,
vilket är en väldigt vanlig datastruktur.

De används också ihop med **Graph Traversal**.

### Lagring av Heaps

##### Representering av en heap:

För varje index av en array *n*...
Vänsterbarnet är lagrat på 2n + 1
Högerbarnet är lagrat på 2n + n

```javascript
let leftChildIndex = 2 * idx + 1;
let rightChildIndex = 2 * idx + 2;
```


Implementing Max Binary Heap
1. class MaxBinaryHeap
2. Insert
3. Remove

1. class MaxBinaryHeap 

```javascript
class MaxBinaryHeap {
  constructor() {
    this.properties = [];
  }
}
```

2. Insert

En stor skillnad när vi för in element till ett Max Binary Heap gentemot Binary Search tree är att vi inte behöver använda oss av noder, och traversare trädet för att hitta korrekt plats. Detta eftersom att vi har våra formler för att hitta korrekt plats i ett Max Binary. Så vi lagrar värden i fält och bestämmer därefter plats i trädet.

Därmed inte sagt att det är enklare att utföra.

Vi börjar med att sätta in det längst ner i trädet och sen bubblar vi upp för att hitta korrekt plats.



  **pseudokod**

- [ ] Push value till properties
- [ ] Bubble up
    -  Skapa en variabel som heter index vilken är längden av properties - 1.
    -  Skapa en variabel som heter parentIndex vilken är floor av (index-1) / 2
    -  Loopa sålänge values elements på parentIndex är mindre än values av barnelement.
       - Swap the value of the values element at the parentIndex with the value of the element property at the child index.
       - Sätt index att vara parentIndex, starta om!

```javascript
insert(element) {
    this.values.push(element);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    let element = this.values[idx];
    let parentIdx;
    let parent;

    while (idx > 0) {
      parentIdx = Math.floor((idx - 1) / 2);
      parent = this.values[parentIdx];
      if (element < parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  ```

1. Remove
   
    - Ta bort från Root
    - Byt ut den mot senast tillagda
    - justera (sink down)

    Extract Max.

    Sink Down

    Proceduren för att radera en root från högen(heap) (Effektivt extrahera max-värdet från max-heap eller min från min heap).
    och därefter återställ värdena korrekt.


Removing (extractMax) Pseudokod

1. byt(swap) första värdet i values mot senast tillagda.
2. Pop från values, så att vi kan return det värdet i slutet.
3. Börja The sink Down
   1. Vår parent index börjar på 0 (root)
   2. Hitta index för left child( 2 * index + 1) (se till att det är genomförbart)
   3. Hitta index för right child( 2 * index + 1) (se till att det är genomförbart)
   4. Om left eller right child är större än element...swap! Om både left och right child är större än element, by mot största child.
   5. Child index som vi nyss bytte blir nu nyParentIndex
   6. Fortsätt att loppa tills att inget child är större än element
   7. return gammel root.

extractMax(elem) {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
    }
    this.values[0] = end;
    this.sinkDown();
    return max;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIndex = 2 * idx + 1;
      let rightChildIndex = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > element) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  # Priority Queue

    vad är en priority queue?

    En data struktur där varje element ha en prioritet. Element med högre prioritet serveras förre element med lägre prio.

    **pseudokod**

    - [ ] om det ej finns nodes, return null
- [ ] skapa en tillfällig variabel för att lagra first
- [ ] om det endast finns en node sätt first och last att vara null
- [ ] om det finns fler, sätt first på next att vara nuvarande first
- [ ] minska med size med 1
- [ ] return värdet av borttagna node


    1. Skapa en min Binary Heap - lägre nummer = högre prio
    2. Varje node har ett värde och ett prio. Använd prio till bygga heapen
    3. Enqueue metoden accepterar ett värde och prioritet, skapar en ny node, och sätter den på korrekt plats baserat på prio.
    4. dequeue tar bort root element, returns det, och omarrangerar heap baserat på priority.

  Se PriorityQueue.js



  > ta bort data främst i kön.

   **pseudokod**

- [ ] om det ej finns nodes, return null
- [ ] skapa en tillfällig variabel för att lagra first
- [ ] om det endast finns en node sätt first och last att vara null
- [ ] om det finns fler, sätt first på next att vara nuvarande first
- [ ] minska med size med 1
- [ ] return värdet av borttagna node

```javascript

```