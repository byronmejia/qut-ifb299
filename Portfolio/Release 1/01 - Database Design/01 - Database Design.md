# Database Design

The database design was completed by me before the first stories were released.
I originally draw up a very quick UML diagram by hand (which later was
converted to the proper diagrams as attached), during the first session 
of creating user stories.

The team originally wanted to go with a NoSQL persistance layer, but, this 
proved to cost many things including:

  - Lack of ACID compliance
  - Lack of In-Memory solutions for development (EG: SQLite, H2)
  - Too complex for newer developers in the team to configure
  - Too abstract: The lack of relations was hard to understand
  for some of the newer developers

So my end solution was to implement an SQL solution, which interfaced with 
PostgreSQL in the production server, and SQLite in the development environments.
This meant that the developers did not need to download additional databases while
in development, due to the simple nature of SQLite, and more heavy, production ready
database design could be complete by me.

This interfaces with NodeJS (The language we are using for the project
) with an ORM called 'Bookshelf.js' for mapping models, and 'knex.js' for the
SQL driver/query builder. This interface, in itself, is a new artifact, however,
as I feel learning how to interface with the current framework took too long,
or required further investigation.

Please see: 02 - ORM and Drivers for the artifact on the object-mapping system,
and please see 01.01 - Database Design Diagram.pdf for the database design.
