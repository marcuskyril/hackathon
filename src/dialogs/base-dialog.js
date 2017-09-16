'use strict';
const Builder = require('botbuilder');

const { Logger, Messages } = require('../shared/const');

var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyCK96jEQUwFKUHNCn3CzS0ZpPB_RAM639o",
  authDomain: "hackathon-e2bf0.firebaseapp.com",
  databaseURL: "https://hackathon-e2bf0.firebaseio.com",
  storageBucket: "hackathon-e2bf0.appspot.com",
};

firebase.initializeApp(config);

function writeData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

class HelloWorldDialog {
    constructor() { Logger.info('Created Instance of HelloWorldDialog'); }
    getName() { return 'UserInputDialog'; } // Needs to be unique otherwise an error occurs during registration

    greet(session, args, next) {
        session.send(Messages.Greeting);
        next(session);
    }

    askForName(session, args) {
        //TODO: Session contain context information based on the channel and the user
        Builder.Prompts.text(session, Messages.AskForName); // The result of this input will be forwarded to the next step
    }

    askForPreference_0(session, result) {
        session.userData.name = result.response;
        session.send(Messages.ProceedToPreferences.replace('%s', result.response));
        Builder.Prompts.choice(session, 'Italian?', "Love it!|Decent|Okay|Not so much", { listStyle: Builder.ListStyle.button });
        console.log(session.userData.name);
    }

    askForPreference_1(session, result) {
        Builder.Prompts.choice(session, 'Asian?', "Love it!|Decent|Okay|Not so much", { listStyle: Builder.ListStyle.button });
    }

    askForPreference_2(session, result) {
        Builder.Prompts.choice(session, 'American?', "Love it!|Decent|Okay|Not so much", { listStyle: Builder.ListStyle.button })
        var name = result.response;
        session.send(Messages.proceedToPreferences.replace('%s', name));
        Builder.Prompts.choice(session, 'Italian?', "Not so much|Okay|I like it|I love it!", { listStyle: Builder.ListStyle.button });
    }

    askForPreference_1(session, result) {
        Builder.Prompts.choice(session, 'Asian?', "Not so much|Okay|I like it|I love it!", { listStyle: Builder.ListStyle.button });
    }

    askForPreference_2(session, result) {
        Builder.Prompts.choice(session, 'American?', "Not so much|Okay|I like it|I love it!", { listStyle: Builder.ListStyle.button });
    }

    askForPricePreference(session, result) {
        Builder.Prompts.choice(session, "Great! Now, what is the price range you're looking for?", "€|€€|€€€|€€€€", { listStyle: Builder.ListStyle.button });
    }
}

module.exports = new HelloWorldDialog();
