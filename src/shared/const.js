'use strict';
const Winston = require('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();
const Logger = new Winston.Logger({
    exitOnError: false,
    transports: [
        new Winston.transports.Console({ colorize: true, timestamp: tsFormat, level: 'debug' }),
        new Winston.transports.File({
            name: 'info-file',
            filename: 'info.log',
            level: 'info'
        }),
        new Winston.transports.File({
            name: 'error-file',
            filename: 'error.log',
            level: 'error'
        }),
    ]
});

Logger.handleExceptions(new Winston.transports.File({
    filename: 'exception.log',
    handleExceptions: true,
    humanReadableUnhandledException: true
}));

// Responses sent by your bot
const Messages = {
    Greeting: "Welcome to the restaurant recommendation bot! \
              We'll give you suggestions in your area based on your preferences. First, tell us about yourself.",
    AskForName: 'What is your name?',
    ProceedToPreferences: "Hello %s! How much do you like the following cuisines?",
    NextAction: "You're all set! What do you want to do next?",
    AskForLocation: 'Where are you?',
    Recommendations: 'Great, here are some recommendations:\n',
    AskForValidation: 'Had a great meal? Which venue did you visit?'
};

// TODO: Extend the Intents based on LUIS if you use it
const Intents = {
    SAMPLE: 'String.You.Insert.As.Intent.On.Luis'
}

module.exports = {
    Logger: Logger,
    Messages: Messages,
    Endpoint: '/api/messages',
    Intents: Intents
}
