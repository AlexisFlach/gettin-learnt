#### Objects And Design

- *Design basics*: What I mean by design and how object-oriented design differs from procedural code
- *Class scope*: How to decide what to include in a class
- *Encapsulation*: Hiding implementation and data behind a class’s interface
- *Polymorphism*: Using a common supertype to allow the transparent substitution of specialized subtypes at runtime
- *The UML*: Using diagrams to describe object-oriented architectures

###### Defining Code Design

Processen i att definiera participants(deltagare) i ett system och därefter bestämma deras relationer.

I OOP är deltagarna uppdelade i klasser. Klasser är delvis uppdelade i metoder; så när vi definierar våra klasser behöver vi även bestämma vilka metoder som passar ihop.

En del av designprocessen består i att bestämma när en operation ska tillhöra en type och när den ska tillhöra en annan klass och användas av en type.

###### Object-Orienterad och Procedural Programming

En viktig skillnad mellan OO och P är i hur responsibility hanteras.

###### Responsibility

###### Cohesion

###### Coupling

###### Orthogonality

#### Chosing your classes

How *should* you think about defining classes? The best approach is to think of a class as having a primary responsibility and to make that responsibility as singular and focused as possible. Put the responsibility into words. It has been said that you should be able to describe a class’s responsibility in 25 words or less, rarely using the words “and” or “or.” If your sentence gets too long or mired in clauses, it is probably time to consider defining new classes along the lines of some of the responsibilities you have described.

###### Polymorphism

Polymorphism is the maintenance of multiple implementations behind a common interface. This sounds complicated, but in fact it should be very familiar to you by now. The need for polymorphism is often signaled by the presence of extensive conditional statements in your code.

###### Encapsulation

Encapsulation simply means the hiding of data and functionality from a client. And once again, it is a key object-oriented concept.

## Four Signposts

###### Code Duplication

###### The Class Who Knew Too Much

###### The Jack of All Trades

###### Conditional Statements











