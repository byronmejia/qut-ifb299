const postmark = require("postmark");
const client = new postmark.Client("d094b93e-5921-436e-b2a2-d26a69045681");
const from = 'tylor@binaryorange.co';

module.exports = {
  welcome: (name, email, username) => {
    client.sendEmailWithTemplate({
      From: from,
      TemplateId: "942341",
      To: email,
      TemplateModel: {
        product_name: "Coterie Online",
        name: name,
        username: username,
        product_address_line1: "1 George St",
        product_address_line2: "Brisbane, QLD 4000"
      }
    }, function(error, success) {
      if(error) {
        console.error("Unable to send via postmark: " + error.message);
        return;
      }
      console.info("Sent to postmark for delivery: ", success);
    });
  },

  eventRegistration: (email, name, event, location, date, start, end) => {
    client.sendEmailWithTemplate({
      From: from,
      TemplateId: "942442",
      To: email,
      TemplateModel: {
        product_name: "Coterie Online",
        name: name,
        event_name: event,
        event_location: location,
        event_date: date,
        start_event_time: start,
        end_event_time: end,
        product_address_line1: "1 George St",
        product_address_line2: "Brisbane, QLD 4000"
      }
    }, function(error, success) {
      if(error) {
        console.error("Unable to send via postmark: " + error.message);
        return;
      }
      console.info("Sent to postmark for delivery: ", success);
    });
  },

  eventUpdated: (email, name, event) => {
    client.sendEmailWithTemplate({
      From: from,
      TemplateId: "942461",
      To: email,
      TemplateModel: {
        product_name: "Coterie Online",
        name: name,
        event_name: event,
        product_address_line1: "1 George St",
        product_address_line2: "Brisbane, QLD 4000"
      }
    }, function(error, success) {
      if(error) {
        console.error("Unable to send via postmark: " + error.message);
        return;
      }
      console.info("Sent to postmark for delivery: ", success);
    });
  },

  eventCancelled: (email, name, event) => {
    client.sendEmailWithTemplate({
      From: from,
      TemplateId: "942461",
      To: email,
      TemplateModel: {
        product_name: "Coterie Online",
        name: name,
        event_name: event,
        product_address_line1: "1 George St",
        product_address_line2: "Brisbane, QLD 4000"
      }
  }, function(error, success) {
      if(error) {
        console.error("Unable to send via postmark: " + error.message);
        return;
      }
      console.info("Sent to postmark for delivery: ", success);
    });
  },
};

console.log('Loaded Email Helpers!');