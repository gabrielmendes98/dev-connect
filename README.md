# DevConnect

This project was created to practice some concepts and skills, like:

- Solution refinement and architecture
- Using SQL and NoSQL databases
- Docker
- REST API
- GraphQL API
- Authentication (JWT + Google OAuth)
- Error Handling
- Event Emitters / Event Driven Architecture
- Clean Architecture
- Domain Driven Design (DDD)
- Testing
- Data validation
  - Added an adapted version of Notification pattern

In the future, maybe I will include some more things, like:

- WebSockets
- Message Queue
- Caching

## TODO

- Resolve all TODOs
- Improve graphql error handler
- Implement GraphQL DataLoader for Discussion.tags resolver
- Add Winstonlogger and remove console.log
- Add more tests
- Refactor architecture drawing to add new presentation layer and reflect domain changes

## TODO Deploy

- Config AWS structure with terraform
- Create and config Jenkins Pipelines
- Config automated deploys when push to master

## The domain

**"DevConnect - A Connection Platform for Developers"**

The idea is to create a social network/platform focused on developers, where they can showcase their projects, look for mentors, offer mentoring and participate in technical discussions.

More details in the [business-rules.md](./business-rules.md) file.

### Breaking down the problem

![](./architecture/problem-breakdown.excalidraw.png)

### Code Architecture Overview

![](./architecture/code-architecture-overview.excalidraw.png)

### Solution Architecture

1. At the beginning lets create a simple monolith
2. Separate and scale
3. Deep dive into actions, implementation details and storage strategies

#### Monolith Solution

![](./architecture/monolith-solution.excalidraw.png)

#### Scalable Solution

![](./architecture/scalable-solution.excalidraw.png)

#### Deep dive and examples

TODO: Improve this.

![](./architecture/deep-dive.excalidraw.png)
