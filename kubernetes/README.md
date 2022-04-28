## Kubernetes

Notes from the Udemy course **Kubernetes Hands-On - Deploy Microservices to the AWS Cloud**.

Sometimes interpreted in my own way 1.e. "Pods live fast, die young" is my own way of understanding Pods, not the words of the author.

Link: https://www.udemy.com/course/kubernetes-microservices/

#### Introducing Kubernetes



#### Pods

The most basic concept of K8s. A group of one or more containers, with shared storage/network, and a specifikation for how to run their containers.

In a *microservices architecture* it is very popular to have each service inside one running container. In Kubernetes, for every container we plan to deploy, we wrap it in a Pod. Think of it as a wrapper for a container.

K8s is managing the Pods;  making sure they're not using to much resources etc.

https://kubernetes.io/docs/concepts/workloads/pods/

###### Writing a Pod

**Hello World Pod**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: helloworld
spec:
  containers:
  - name: ubuntu
    image: ubuntu:alpine
    resources:
      limits:
        memory: "128Mi"
        cpu: "500m"
    command: ["echo"]
    args: ["Hello World"]
```



```
kubectl apply -f helloworld.yaml
```



```
kubectl logs helloworld
```



```
kubectl delete pod helloworld
```

**first-pod.yaml**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: firstpod
spec:
  containers:
  - name: nodeapp
    image: flachens/node-app
```

###### Running a Pod

Get info on everything defined in the cluster:

```bash
kubectl get all
```

Deploy a pod to the cluster:

```bash
kubectl apply -f pod.yaml
```

```
pod/firstpod created
```

We now have a pod name firstpod running in the cluster.

Let's take a look at the image we pulled.

```
image: flachens/node-app
```



```javascript
const app = require('express')()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(4000, () => {
  console.log(`Server listens on 4000`);
})
```

A simple application that runs on port 4000. How do we access it?

Pods are not visible outside the K8s cluster.

To visit a cluster from our broswer we need to know its IP address, in this case the Minikube Cluster IP Address.

```
minikube ip
```

Still can't be reached.

Pods are not intended to be visible from outside the cluster. They are designed that way.

So there is no way we can visit this pod right now from the browser.

###### Commands related to pods

```
kubectl describe pod firstpod
```



```
kubectl exec -it firstpod -- sh
```

###### Just for fun

```
wget http://localhost:4000
```



```
cat index.html
```

This proves the the pod has a webserver inside it, but we can't access it from outside.

#### Services in Kubernetes

Pods live fast, die young. Should be treated as catle, not like pets.

Because of this live fast, die young-kind-a-attitude K8s introduces another concept called **service**.

Pods come and go, but **services bleibt gleich**(remains the same).

https://www.youtube.com/watch?v=Fo3DAhiNKQo&t=1s&ab_channel=Apache207

###### Services

A service is a long-running object that will have a IP address and a stable, fixed, port.

What we can do is attach services to pods.

With a service in place we can connect to the cluster.

This introduces a pod concept we call **Pod Label**. In a pod, we setup a label in key-values pairs, and we can add one or more pairs.

```pseudocode
Pod
Labels
app: webapp
```



```pseudocode
SERVICE
Selector
app: webapp
```

This is how we connect services to pods.

Lets try and connect to the pod **firstapp**.

**service.yaml**

```
apiVersion: v1
kind: Service
metadata:
  name: firstpod-webapp
spec:
  selector:
      app: firstpod
  ports:
    - name: http
      port: 80
      targetPort: 4000
      nodePort: 30082
  type: NodePort
```



```
kubectl apply -f first-pod-service.yaml
```

###### NodePort and ClusterIP

There a few Service Types. 

If you make your service to be of type **ClusterIP** then we will be telling K8s that the service only will be accesable from inside the cluster, and not externally like the web browser.

Could be used like a private service, if you have a database microsercide for example.

But in the case with our app, we want it to be exposed to the outside world, and the reson for why we use **NodePort**. We expose a port through the Node. Node is refering to our cluster. Further down the road we will have multiple nodes in a cluster.

The cluster is what you see when you run

```
kubectl get all
```

When we use Service Type NodePort We as architectures decide what port to expose to the outside world.

```
nodePort: 30000< PORT <32000
```

!NodePort should only be used in development!

We usually use Ingress in production, but more on that later.

###### Pod Selection with Labels

The way Services work is via the Selector. By, in our case, specifying 

```
selector:
      app: firstpod
```

We tell K8s to find every Pod in the Cluster that has the same key-value pair, as part of its set of labels.

**pod.yaml**

```
apiVersion: v1
kind: Pod
metadata:
  name: firstpod
spec:
  containers:
  - name: nodeapp
    image: flachens/node-app
```

Now this Pod doesn't yet have any label information, so let's add that!

```
apiVersion: v1
kind: Pod
metadata:
  name: firstpod
  labels:
    app: firstpod
spec:
  containers:
  - name: nodeapp
    image: flachens/node-app
```



```
kubectl apply -f first-pod.yaml
```



```
minikube service firstpod-webapp
```

###### New version of the app

```
flachens/node-app:v2
```

We can add this info to the Service 

```
Service
	Selector
		app: webapp AND
		release: v2
```

**pod.yaml**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: firstpod
  labels:
    app: firstpod
    release: original
spec:
  containers:
  - name: nodeapp
    image: flachens/node-app
---
apiVersion: v1
kind: Pod
metadata:
  name: firstpod-v2
  labels:
    app: firstpod
    release: v2
spec:
  containers:
  - name: nodeapp
    image: flachens/node-app:v2
```

**service.yaml**

```
apiVersion: v1
kind: Service
metadata:
  name: firstpod-webapp
spec:
  selector:
      app: firstpod
      release: v2
  ports:
    - name: http
      port: 80
      targetPort: 4000
      nodePort: 30082
  type: NodePort
```

###### apply and debugging techniques

```
kubectl apply -f first-pod.yaml
```



```
kubectl get pods
```



```
kubectl get pods --show-labels
```



```
kubectl get po --show-labels -l release=v2
```

#### ReplicaSets

With Pods and Services we have learnt the core elements of K8s. However, it is very rare that we work with Pods directly, as we have done so far.

In a real-world scenario it is far more likely that we will work with either **Deployments** or **ReplicaSets**.

As stated previous; Pods are very basic and disposable in K8s. It it is very likely that a pod will die:

Since everything in K8s is wrapped: if a Node fails, then all the Pod inside that node will die.

If a pod consumes to many resources, it will die.

When we create a Pod in a config-file and then execute

```
kubectl apply -f FILE.yaml
```

we are responsible for the life and death of that pod.

```
k describe svc firstpod-webapp
```

```
Selector: app=firstpod,release=v2
```

```
kubectl delete pod firstpod-v2
```

or

```
kubectl delete po firstpod-v2 --force
```

If this would have happend in production, no pod would restart and our application would go, and stay, down.

A replicaSet is bascically just another wrapper, another layer of configuration to K8s.

We specify how many instances of a pod do we want K8s to make sure is always up and running = **Desired State**.

```
ReplicaSet
	Replicas: 3
	selector
		app: webapp
```

###### Writing a ReplicaSet

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: webapp
spec:
  selector:
    matchLabels:
      app: webapp
  replicas: 1
  template: #template for the pods
    metadata:
      labels:
        app: webapp
    spec:  
      containers:
      - name: webapp
        image: flachens/node-app
```

###### Applying a ReplicaSet to Kubernetes

delete all pods

```
kubectl delete pod --all
```

```
kubectl apply -f pods.yaml
```

```
kubectl get all
```

```
NAME                     DESIRED   CURRENT   READY   AGE
replicaset.apps/webapp   1         1         1       3m11s
```

```
kubectl describe replicaset webapp
```

or

```
kubectl describe rs webapp
```

Deploy a new service

```
apiVersion: v1
kind: Service
metadata:
  name: appy-webapp
spec:
  selector:
      app: webapp
  ports:
    - name: http
      port: 80
      targetPort: 4000
      nodePort: 30082
  type: NodePort
```

```
kubectl apply -f services.yaml
```

```
minikube service appy-webapp
```

#### Deployments

A more sophisticated type of replicaSet as it has one additional feature: **automatic rolling updates with zero down time**.

Except for

```
kind: Deployments
```

the structure is exactly the same.

We are given the opprtunity to add some extra fields should we want to tune the updates.

Delete the old replicaset

```
kubectl delete rs webapp
```

```
kubectl get all
```

```
NAME               READY   STATUS        RESTARTS   AGE
pod/webapp-ltskq   1/1     Terminating   0
```

###### First version of our deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
spec:
  selector:
    matchLabels:
      app: webapp
  replicas: 2
  template: #template for the pods
    metadata:
      labels:
        app: webapp
    spec:  
      containers:
      - name: webapp
        image: flachens/node-app
```

```
kubectl apply -f pods.yaml
```

```
kubectl get all
```

```
NAME                          READY   STATUS    RESTARTS   AGE
pod/webapp-69b56cd977-4ddkd   1/1     Running   0          18s
pod/webapp-69b56cd977-d4qpm   1/1     Running   0          18s

NAME                  TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/appy-webapp   NodePort    10.106.146.37   <none>        80:30082/TCP   11m
service/kubernetes    ClusterIP   10.96.0.1       <none>        443/TCP        2d6h

NAME                     READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/webapp   2/2     2            2           18s

NAME                                DESIRED   CURRENT   READY   AGE
replicaset.apps/webapp-69b56cd977   2         2         2       19s
```

Notice, besides the corresponding pods, that K8s also created a new replicaset.

So how do we do a rolling update, without the labeling styled approach we did before?

A new ReplicaSet is created. When it is in place and the containers inside the Pods runs, the the "Replicas count" inside first ReplicaSet goes down to zero, but it is still there. This means that if we need to roll back, we can still use the old one and reset its count to two.

This is all working on the container image. That is what needs to be changed in order for something to trigger. We usually do this by using tags.

Make this change in **deployments/pods.yaml**

```
spec:
  minReadySeconds: 30
...
spec:  
 	...
  	image: flachens/node-app:v2
```

```
kubectl apply -f pods.yaml
```

```
deployment.apps/webapp configured
```

```
NAME                                DESIRED   CURRENT   READY   AGE
replicaset.apps/webapp-58647cc89f   2         2         2       45s
replicaset.apps/webapp-69b56cd977   1         1         1       10m
```

###### Managing rollouts

```
kubectl rollout status deploy webapp
```

```
deployment "webapp" successfully rolled out
```

Change back to the original image without a tag.

```
image: flachens/node-app
```

```
kubectl apply -f pods.yaml
```

```
kubectl rollout status deploy webapp
```

There is a built-in rollback feature that is very useful.

```
kubectl rollout history deploy webapp
```

```
REVISION  CHANGE-CAUSE
2         <none>
3         <none> -> Current live
```

```
kubectl rollout undo deploy webapp 
```

or

```
kubectl rollout undo deploy webapp --to-revision=2
```

These features are only to be used in an emergency. The main problem is that the live site sometimes doesnt is in line with our yaml-file, based on revision.

#### Networking and Service Discovery

In this section we will try and connect a Container with an MySQL image and a Container with a web application.

Would we have both containers in the same Pod it would be very easy since they "share" localhost.

So why not? It would be much more complicated to manage. If the Pod fails then we would not know which container caused the failure.

```
Service - webapp  							Service - database
Pod															Pod                                 		   	Container												Container 
```

In our application, in order for us to connect with the database, we would need to reference the IP address. 

K8s maintaince its own private DNS service.

```
SERVICE - kube-dns
Pod
DNS Container
webapp   10.9.3.12
database 10.9.3.14
```

The application can therefor refer to "database" as the Database IP adress and, via the Service kibe-dns, Kuberneter will know where to forward the trafic.

Why have we not seen the kube-dns service before with all our "kubectl get all"-commands?

```
kubectl get all
```

The reason for this is namespace.

###### Namespacing

Namespacing is a way of partitioning your resources into seperate areas.

We have previosly been in the "default" namespace.

```
kubectl get ns
```

```
NAME              STATUS   AGE
default           Active   2d7h
ingress-nginx     Active   2d7h
kube-node-lease   Active   2d7h
kube-public       Active   2d7h
kube-system       Active   2d7h
```

```
kubectl get all -n kube-system
```

```
kubectl describe svc kube-dns -n kube-system
```

###### Accessing MySQL from a Pod

Access a database container in a different pod.

We should do a "lookup", using the DNS Service, for "database". 

We will reuse our current node-app, and create a new Database Service.

**./networking**

**mysql.yaml**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  labels:
    app: mysql
spec:
  containers:
   - name: mysql
     image: mysql:5
     env:
      # Use secret in real life
      - name: MYSQL_ROOT_PASSWORD
        value: password
      - name: MYSQL_DATABASE
        value: fleetman
---
kind: Service
apiVersion: v1
metadata:
  name: database
spec:
  selector:
    app: mysql
  ports:
  - port: 3306
  type: ClusterIP
```

**pods.yaml**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
spec:
  selector:
    matchLabels:
      app: webapp
  replicas: 2
  template: # template for the pods
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: flachens/node-app
        resources:
          limit:
```

**services.yaml**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: net-example
spec:
  selector:
      app: webapp
      release: v2
  ports:
    - name: http
      port: 80
      targetPort: 4000
      nodePort: 30082
  type: NodePort
```

**terminal**

```
kubectl apply -f services.yaml
```

```
kubectl apply -f pods.yaml
```

```
kubectl apply -f mysql.yaml
```

```
kubectl exec -it webapp-WHATWEHAVEHERE -- sh 
```

```
cat /etc/resolv.conf
```

```
nameserver 10.96.0.10
```

This is means that the pod will go and look for a service located at this IP address, actually the same as the kube-dns Service.

```
nslookup 10.96.0.10
```

```
nslookup database
```

**Install MySQL and make some Service Discover**

```
apk update
```

```
apk add mysql-client
```

```
mysql -uroot -ppassword fleetman
```

```
Can't connect to local MySQL server through socket
```

```
mysql -uroot -ppassword -h database fleetman
```

**for fun**

```
CREATE TABLE testtable(name VARCHAR(255));
```

```
INSERT INTO testtable(name) VALUES('myname...');
```

```
SHOW TABLES;
```

```
SELECT name FROM testtable;
```

```
exit
```

```
exit
```

We can find the IP Address of any service that we like just by its name. This is called **Service Discovery**.

###### Fully Qualified Domain Names

```
nslookup database
```

The service is not registered under the name database. It is registered under its **fully qualified domain name(fqdn)**.

```
database.default.svc.cluster.local
```

Initially K8s wont be able to find "database", because it doesnt match the above string.

```
cat /etc/resolv.conf
```

```
nameserver 10.96.0.10
search default.svc.cluster.local svc.cluster.local cluster.local
options ndots:5
```

If the name can't be fined, it appends the values in "search".

```
Address 1: 10.97.157.100 database.default.svc.cluster.local
```

default refers to the namespace it is in.

So if we are to lookup something in another namespace then we would need to change its fully qualified domain name:

```
database.anothernamespace
```



#### Microservices Architecture

###### Small config before we start

```
I recommend before starting this section that you set up minikube with plenty of RAM. To do this:

Stop minikube with "minikube stop"

Delete your existing minikube with "minikube delete"

Remove any config files with "rm -rf ~/.kube" and "rm -rf ~/.minikube". Or, delete these folders using your file explorer. The folders are stored in your home directory, which under windows will be "c:\Users\<your username>"

Now restart minikube with "minikube start --memory 4096".

This will allocate 4Gb of RAM to minikube (I'm assuming you have enough host ram to support this) and should give a much more comfortable experience in the next few sections.
```

**on Mac**

```
minikube stop
```

```
minikube delete
```

```
rm -rf ~/.kube && rm -rf ~/.minikube
```

```
  minikube start --memory 4096
```



###### Introduction to Microservices

The easiest way to understand Microservices is to contrast it to a traditional architecture; **monoliths**.

In a monolith, an entire system is deployed as a unit.

It would probably fulfil many **business needs/requirements**.

**E-shop business  needs example**

```
- CART
- ITEM
- PRODUCT
- INVENTORY
- USER
- AUTHENTICATION
- CATEGORY
...
```

In addition, there will also be a global database in this application. All of the business areas would, usually, read and write to that db schema.

Many times this db is shared with other monoliths, the term for this is **Integration Database**.

The problem with the monolith is that eventually it will become to big to manage. It will be a tough task to make changes to one business area without breaking another business area.

In general harder to work with. If we have a team devoted to work on the Inventory area then they might need to conuslt with the team working on the Item area to not(try to) break or impact stuff.

To coordinate a release of another monolith is also a non-smooth task. A change in Inventory might need a change in another section, which needs a update in another and so on. We therefor would need a big build process where the build is coordinated. This is, of course, not well suited for CI/CD and agility.

The solution is microservices, an extreme form of modularity. We build the system as a set of **contained components **, microservices. These microservices can function on their own, be deployed on their own, developed on their own, and communicate with eachother through well defined interfaces. 

The microservices are usually being deployed to their own containers.













































