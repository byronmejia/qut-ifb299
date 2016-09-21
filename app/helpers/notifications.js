const postmark = require("postmark");
const client = new postmark.Client("d094b93e-5921-436e-b2a2-d26a69045681");

const path = require('path');
const Profile = require(path.join(__dirname, '..', 'models', 'Profile'));

const emailConfig = {
  from: 'tylor@binaryorange.co',
  company: {
    name: 'Coterie Online',
    address: '1 George St, Brisbane, QLD 4000'
  }
};

const getUserProfile = (user) => {
  return Profile.where({ id: user }).fetch().then((profile) => {
    return (!profile) ? null : profile.attributes;
  });
};

const email = {
  send: (emailAddress, template, data) => {
    client.sendEmailWithTemplate({
      From: emailConfig.from,
      TemplateId: template,
      To: emailAddress,
      TemplateModel: data
    }, (error, response) => (error) ? email.failure(error) : email.success(response))
  },
  success: (response) => console.info("Sent to postmark for delivery:", response),
  failure: (error) => console.error("Unable to send via postmark:", error.message)
};

module.exports = {
  welcome: (user) => {
    getUserProfile(user).then((profile) => {
      if (profile.notifications === 'email') {
        email.send(profile.email, 942341, {
          companyName: emailConfig.company.name,
          name: profile.firstName,
          username: 'username',
          companyAddress: emailConfig.company.address
        });
      }

      else if (profile.notifications === 'sms') {
        console.log('Oops! Notifications is set to SMS and we ain\'t done it yet!');
      }
    });
  },

  eventRegistration: (user, event) => {
    getUserProfile(user).then((profile) => {
      if (profile.notifications === 'email') {
        email.send(profile.email, 942442, {
          eventTitle: 'eventTitle',
          companyName: emailConfig.company.name,
          name: profile.firstName,
          eventLocation: 'eventLocation',
          eventDate: 'eventDate',
          eventStart: 'eventStart',
          eventFinish: 'eventFinish',
          companyAddress: emailConfig.company.address
        });
      }

      else if (profile.notifications === 'sms') {
        console.log('Oops! Notifications is set to SMS and we ain\'t done it yet!');
      }
    });
  },

  eventUpdated: (user, event) => {
    getUserProfile(user).then((profile) => {
      if (profile.notifications === 'email') {
        email.send(profile.email, 942443, {
          eventName: 'eventName',
          companyName: emailConfig.company.name,
          name: profile.firstName,
          eventLocation: 'eventLocation',
          eventDate: 'eventDate',
          eventStart: 'eventStart',
          eventFinish: 'eventFinish',
          companyAddress: emailConfig.company.address
        });
      }

      else if (profile.notifications === 'sms') {
        console.log('Oops! Notifications is set to SMS and we ain\'t done it yet!');
      }
    });
  },

  eventCancelled: (user, event) => {
    getUserProfile(user).then((profile) => {
      if (profile.notifications === 'email') {
        email.send(profile.email, 942461, {
          eventTitle: 'eventTitle',
          companyName: emailConfig.company.name,
          name: profile.firstName,
          companyAddress: emailConfig.company.address
        });
      }

      else if (profile.notifications === 'sms') {
        console.log('Oops! Notifications is set to SMS and we ain\'t done it yet!');
      }
    });
  },
};

console.log('Loaded Email Helpers!');