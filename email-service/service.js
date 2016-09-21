const postmark = require("postmark");
const client = new postmark.Client("d094b93e-5921-436e-b2a2-d26a69045681");
const emailHelpers = require('./helpers');

emailHelpers.welcome('Tylor', 'conculco.sd@gmail.com', 'trjstewart');
emailHelpers.eventRegistration('conculco.sd@gmail.com', 'Tylor', 'This Is a Nightmare!', 'Hell', '21/09/2016', '1PM', '2PM');
emailHelpers.eventReminder('conculco.sd@gmail.com', 'Tylor', 'This Is a Nightmare!', 7, 'Hell', '21/09/2016', '1PM', '2PM');
emailHelpers.eventCancelled('conculco.sd@gmail.com', 'Tylor', 'This Is a Nightmare!');

// client.sendEmail({
//   "From": "tylor@binaryorange.co",
//   "To": "trjstewart@gmail.com",
//   "Subject": "Test",
//   "TextBody": "Test Message",
// }, function(error, success) {
//   if(error) {
//     console.error("Unable to send via postmark: " + error.message);
//     return;
//   }
//   console.info("Sent to postmark for delivery", success);
// });

// WORKS!
// client.sendEmail({
//   "From": "tylor@binaryorange.co",
//   "To": "trjstewart@gmail.com",
//   "Subject": "Test",
//   "TextBody": "Hello from Postmark!"
// });

// client.sendEmailWithTemplate({
//   "From": "tylor@binaryorange.co",
//   "TemplateId": "942341",
//   "To": "trjstewart@gmail.com",
//   "TemplateModel": {
//     "product_name": "Coterie Online",
//     "name": "name",
//     "username": "username",
//     "product_address_line1": "1 George St",
//     "product_address_line2": "Birsbane, QLD 4000"
//   }
// }, function(error, success) {
//   if(error) {
//     console.error("Unable to send via postmark: " + error.message);
//     return;
//   }
//   console.info("Sent to postmark for delivery", success);
// });

console.log('Woof Sent!');