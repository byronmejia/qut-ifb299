const path = require('path');
const postmark = require('postmark');

const Profile = require(path.join(__dirname, '..', 'models', 'Profile'));
const client = new postmark.Client('d094b93e-5921-436e-b2a2-d26a69045681');

const emailConfig = {
  from: 'tylor@binaryorange.co',
  company: {
    name: 'Coterie Online',
    address: '1 George St, Brisbane, QLD 4000',
  },
};

const getUserProfile = (user) => Profile.where({ id: user }).fetch().then((profile) => {
  if (!profile) {
    return null;
  }
  return profile.attributes;
});

const email = {
  send: (emailAddress, template, data) => {
    client.sendEmailWithTemplate({
      From: emailConfig.from,
      TemplateId: template,
      To: emailAddress,
      TemplateModel: data,
    }, (error, response) => (error) ? email.failure(error) : email.success(response));
  },
  success: (response) => response, // TODO: Add Success Logging.
  failure: (error) => error, // TODO: Add Failure Logging.
};

// TODO: Add functionality to retrieve event data and append it to the email data.

module.exports = {
  welcome: (user) => {
    getUserProfile(user).then((profile) => {
      if (profile.notifications === 'email') {
        email.send(profile.email, 942341, {
          companyName: emailConfig.company.name,
          name: profile.firstName,
          username: 'username',
          companyAddress: emailConfig.company.address,
        });
      }

      // TODO: Add SMS Functionality.
      // else if (profile.notifications === 'sms') {}
    });
  },

  eventRegistration: (user) => {
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
          companyAddress: emailConfig.company.address,
        });
      }

      // TODO: Add SMS Functionality.
      // else if (profile.notifications === 'sms') {}
    });
  },

  eventUpdated: (user) => {
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
          companyAddress: emailConfig.company.address,
        });
      }

      // TODO: Add SMS Functionality.
      // else if (profile.notifications === 'sms') {}
    });
  },

  eventCancelled: (user) => {
    getUserProfile(user).then((profile) => {
      if (profile.notifications === 'email') {
        email.send(profile.email, 942461, {
          eventTitle: 'eventTitle',
          companyName: emailConfig.company.name,
          name: profile.firstName,
          companyAddress: emailConfig.company.address,
        });
      }

      // TODO: Add SMS Functionality.
      // else if (profile.notifications === 'sms') {}
    });
  },
};
