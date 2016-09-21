const notification = require('./notifications');

notification.welcome('Tylor', 'conculco.sd@gmail.com', 'trjstewart');
notification.eventRegistration('conculco.sd@gmail.com', 'Tylor', 'This Is a Nightmare!', 'Hell', '21/09/2016', '1PM', '2PM');
notification.eventUpdated('conculco.sd@gmail.com', 'Tylor', 'This Is a Nightmare!');
notification.eventCancelled('conculco.sd@gmail.com', 'Tylor', 'This Is a Nightmare!');

console.log('Woof Sent!');