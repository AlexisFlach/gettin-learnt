## .NET microservices 

Study notes / repo for the course

https://www.youtube.com/watch?v=DgVjEo3OGBI&t=1s&ab_channel=LesJackson by Les Jackson.

#### Part 1: Introduction / Theory

###### Microservices

**The Single Responsibility Pattern** Gather together those things that change for the same reasone and separate thos things that change for different reasons. *Robert C. Martin*

So what are **Microservices**?

- Small(2 pizza team, 2 weeks to build)
- Responsible for doing 1 thing well
- Organisationally aligned
- Form part of the (distributed) whole
- Self-contained / Autonomous

**Benefits in contrast to Monoliths**

- Easier to change & deploy(small and decoupled)
- Can be built using different technologies
- Increased organisational ownership and alignment
- Resilient: 1 service can break, others will continue to run
- Scalable: You can scale out only the services you need to
- Built to be highly replaceable / swappable

#### Part 2: Building the first service

```
dotnet new webapi -n PlatformService
```

```
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

```
dotnet add package Microsoft.EntityFrameworkCore
```

```
dotnet add package Microsoft.EntityFrameworkCore.Design
```

```
dotnet add package Microsoft.EntityFrameworkCore.InMemory
```

```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

###### Models

Our internal representation of the data

```
    public class Platform
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Publisher { get; set; }
        [Required]
        public string Cost { get; set; }
    }
```

###### Dtos

Our external representation of the data.

We don't want to expose the internal representation of the models.

- Data privacy
- Contractual Coupling

###### Data Later / DB Context

Maps our models to data store (inmät for now, sqlserver later)

###### Repository

Interface / concrete repo pattern

###### Prepare database with data

###### Automapper

```
public class PlatformsProfile : Profile
    {
        public PlatformsProfile()
        {
            // Source -> Target
            CreateMap<Platform, PlatformReadDto>();
            CreateMap<PlatformCreateDto, Platform>();
        }
    }
```

###### Controllers

#### Part 3: Docker & Kubernetes

Docker: Create image and push to Docker Hub.

K8s:

2.56.32

**Declarative Model**

Define a desired "end state". Let K8s figure out how to get there.

```
kubectl apply -f platforms-depl.yaml 
```

```
kubectl get deployments
```

```
kubectl get pods
```

```
kubectl delete deployment platforms-depl
```

```
kubectl apply -f platforms-depl.yaml 
```

```
kubectl apply -f platforms-np-srv.yaml
```

```
kubectl get services
```

### Part 4: CommandsService

```
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

```
dotnet add package Microsoft.EntityFrameworkCore
```

```
dotnet add package Microsoft.EntityFrameworkCore.Design
```

```
dotnet add package Microsoft.EntityFrameworkCore.InMemory
```

###### Messagin

Synchronous and asynchronous messaging

Sync

- Request/Response
- Requester will wait for res



##### Nginx

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml
```

```
kubectl get namespace
```

```
kubectl get pods --namespace=ingress-nginx
```

```
kubectl apply -f ingress-srv.yaml
```

#### Part 5: SQL Server

```
kubectl get storageclass	
```

```
kubectl create secret generic mssql --from-literal=SA_PASSWORD='pa55w0rd!'
```

#### Part 7: MESSAGE BUS

```
dotnet add package RabbitMQ.Client
```













