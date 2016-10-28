# 02 - ORM and Drivers

Following the database design in SQL, and mapping the relations between
every entity, the next stage was to research into different SQL query builders
and ORMs for allowing simple CRUD methods. 

After doing some research and asking members of industry how to approach the 
database drivers and ORM, these solutions were suggested:

  - BookshelfJS ORM and Knex SQL Query builders
  - Sequelize ORM and Query Builder (all in one tool)
  - Move to NoSQL as the support behind relational databases within the NodeJS
  community is shocking at best

After much deliberation and asking the other developers in the team what they have
used before, I decided to go ahead and setup Bookshelf ORM and Knex SQL Builder. 

For this, we had to add the packages to the project. These were run behind the
project. After completing *Artifact 03 - Setting Up Hello World*, I added
the packages by running:

  - `npm install --save bookshelf`
  - `npm install --save knex`
  - `npm install --save pg` (For Postgres Support)
  -  `npm install --save sqlite3` (For sqlite3 Support)

Afterwards, it was necessary to start writing some migration files to automate
the building and tearing down of the majority of the database. These migrations
for the rest of the project were all developed by me, except for one, which 
I had to fix before release 2 anyways, as the other developer wrote a bad migration,
leading to the whole database beginning to truncate all tables upon rollback.

So, with that, an example of all the migration files are attached inside this folder
that I have written, as well as one Bookshelf ORM example file. I wrote most
Bookshelf Models.

Artifacts can be seen here (please ensure you are logged into
github first, and have the appropriate permission to view.)

To see example artifacts of creating models, see:
  - https://github.com/byronmejia/qut-ifb299/tree/develop/app/server/models

To see examples of migration artifacts, please see:
  - https://github.com/byronmejia/qut-ifb299/tree/develop/migrations

**Note: This artifact is shared between Jessica, Byron and Tylor. Tylor's 
contribution to the artifact is very little, however... Jessica's is more 
significant***

(If you follow the link, it will show you the contributors. Many of the models
have been build by only me, as no other student had the concept of MVC pattern
before).
