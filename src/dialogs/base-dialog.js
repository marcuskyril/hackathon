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
        session.send(Messages.ProceedToPreferences.replace('%s', result.response));
        Builder.Prompts.choice(session, 'Italian?', "Love it|Decent|Okay|Not so much", { listStyle: Builder.ListStyle.button });
    }

    askForPreference_1(session, result) {
        Builder.Prompts.choice(session, 'Turkish?', "Love it|Decent|Okay|Not so much", { listStyle: Builder.ListStyle.button });
    }

    askForPreference_2(session, result) {
        Builder.Prompts.choice(session, 'American?', "Love it|Decent|Okay|Not so much", { listStyle: Builder.ListStyle.button })
    }

    askForPricePreference(session, result) {
        Builder.Prompts.choice(session, "Great! Now, what is the price range you're looking for?", "€|€€|€€€|€€€€", { listStyle: Builder.ListStyle.button });
    }

    askForNextAction(session) {
      session.send(Messages.NextAction)
    }
}

module.exports = new HelloWorldDialog();
