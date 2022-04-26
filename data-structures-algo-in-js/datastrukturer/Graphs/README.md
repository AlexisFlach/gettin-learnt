### Graphs

Ett av de vanligase och mest använda data strukturna när det kommer till modellera "real life".

Mål
Förstå vad en graf är
Jämföra mot andra typer av grafs och förstå dess användingsområden.
Implementering av en graf
Traversera grafs genom BFS och DFS
Jämför dessa

Vad är en graph?

Nodes + connections

Användingsområden

Social Networks
Location / Mapping
Överallt!

Typer av grafer

Teminologi

vertex - en node
edge - en connection mellan noder.





Add Vertex intro

Vi kommer att använda oss av en adjacensy list och bygga en undirected graph.

Add vertex pseudokod
1. Skriv en metod addVerted som tar in ett namn på verted.
2. Den ska lägga till en key till adjacency list med namn på vertex och sätta värdet till en tom array.
   g.addVertext('Tokyo') så ser vår ajacensy list ut { "Tokyo": []}
  

class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
}

Add an Edge

Add edge pseudokod

1. Funktionen ska acceptera två vertices(vertex1, vertex2).
2. I adjacency list ska funktionen hitta keys för vertex1 och pusha vertex2 till arrayen.
3. Samma sak med vertex2.

Remove edge

pseudokod
1. Funktionen ska acceptera två vertices; vertex1, vertex2
2. Funktion ska re-assign key av vertex1 att vara en array som ej innehåller vertex2;
3. Samma sak vertex 2

Remove a vertex

Pseudokod
1. Funktionen ska acceptera en vertex att ta bort
2. Den ska loopa så länga det finns andra vertices i adjacency listan för den vertexen.
3. Inne i loopen, call removeEdge med vertexen vi ska ta bort och alla dess värden.
4. Radera dess key


### Graph traversal

Depth first

Vi fokuserar på att children innan siblings, "we deepen the traversal, before we widen it"


DFR Pseudokod

1. Skriv en funktion som ska acceptera en start node
2. Skapa en lista som ska lagra end result, att bli returnad på slutet.
3. Skapa en helper funktion som accepterar en vertex
   1. Den ska return early om vertex är tom
   2. Den ska placerar vertexten den accepterar i visited objektet och pusha den till result arrayen
   3. Loopa över alla värden i the adjavencyList för den vertexten.
   4. Om något av dessa värden ej har blivit besökt, invoka the helper fuction recursively
 

Depth First Traversal Iterative

Pseudo kod
1. Funktionen ska acceptera en start nod.
2. Skapa en stack för att hålla koll vertices (använd en list/array)
3. Skapa en lista för att lagra end result, att bli returned på slutet
4. Skapa ett objekt för att lagra visited vertices.
5. Lägg till starting vertex till the stack, markera som visited.
6. while stacken har något i sig
   1. Pop nästa vertex från stacken
   2. Om den vertexen eje har blivit visited
      1. Markera som visited
      2. Lägg till den på result list
      3. push alla dess neighbours till till stacken
7. Return result

Breadth First

Pseudo
1. Funktionen ska acceptera en start vertex
2. Skapa en queue (vi kan använda en array) och placera start vertex i den.
3. Skapa en array för att lagra besökta nodar.
4. Skapa ett objekt för att lagra besökta nodar
5. Loopa så länge det finns något i queuen
6. Ta bort sista vertex från queuen och pusha den till arrayen som lagrar besökta nodar.
7. Loopa över varje vertex i the ajancency list för vertexen vi besöker.


