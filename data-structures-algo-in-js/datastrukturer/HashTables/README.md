# Hash Tables


De är till för att lagra *key-value pairs*
De är som arrays, men keys är inte i ordning
Till skillnad från arrays är hash tables snabba för följande operationer:
hitta värden, addera nya värden och ta bort värden.

Tänk att du ska gå och handla

basket.grapes = 1000;

Du lägger 1000 vindruvor i din korg.

key = "grapes"
key blir då index för att hitta index i minnet.
Det är möjlig genom att använda en hash function.
Vi för in "grapes" i vår hash function som gör sin grej och ger oss en key till ett index där vårt värde finns, memory address. Denna adress lagrar både ket och value.

Vad är en hash function?

En funktion som genererar ett värde att fixed length för varje input.
One way traffic. Om vi tar output går det inte att få fram vad input var = idempotent.



```javascript
let user = {
  age: 54,
  name: 'Kilye',
  magic: true,
  scream: function() {
    console.log("Screaaaam!")
  }
}

user.age; // 0(1);
user.spell = 'abracadabra' // O(1);

```
Så varför använder vi inte alltid hash tables?

Ett stort problem med hash tables är collision



#### Implementing a hash table
```javascript
class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }
  set(key, value) {
    let address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = [];
    }
    this.data[address].push([key, value]);
    return this.data;
  }
  get(key) {
    let address = this._hash(key);
    const currentBucket = this.data[address];
    console.log(currentBucket);
    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          return currentBucket[i][1];
        }
      }
    }
    return undefined;
  }
  keys() {
    const keysArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        keysArray.push(this.data[i][0][0]);
      }
    }
    return keysArray;
  }
}

```
