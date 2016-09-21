const postmark = require("postmark");
const client = new postmark.Client("d094b93e-5921-436e-b2a2-d26a69045681");
const emailHelpers = require('./helpers');

emailHelpers.welcome('Tylor', 'conculco.sd@gmail.com', 'trjstewart');
emailHelpers.eventRegistration('conculco.sd@gmail.com', 'Tylor', 'This Is a Nightmare!', 'Hell', '21/09/2016', '1PM', '2PM');

emailHelpers.eventReminder('conculco.sd@gmail.com', 'Tylor', 'This Is a Nightmare!', 7, 'Hell', '21/09/2016', '1PM', '2PM');
emailHelpers.eventCancelled('conculco.sd@gmail.com', 'Tylor', 'This Is a Nightmare!');

console.log('Woof Sent!');