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
}