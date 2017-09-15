'use strict';
const Builder = require('botbuilder');

const { Logger, Messages } = require('../shared/const');

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
        console.log(result.response);
        session.send(Messages.proceedToPreferences.replace('%s', result.response));
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
