# 04 - Seed Files
An essential part of development is having test data to play with.
For this project, I created a folder called 'Seed Files' which 
would immediately populate the database with some mock data. 

This seed generator, however, was not working in production, due to 
the difference in how SQLite and PostgreSQL behave and treat 
TimeStamps. (One uses time from epoch, other uses TimeStamps type).

This generator was a majority my work, but I did have help come from
mostly Jessica, and little by Tylor (Admittedly, I ended up refactoring his
contribution to try and fix some of the SQL bugs that occurred... But this
was not completed by the end of Release 2, ending in catastrophic disaster).

Please see:
  - https://github.com/byronmejia/qut-ifb299/blob/develop/seeds/development.js
