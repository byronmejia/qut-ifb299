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
}