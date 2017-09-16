'use strict';
const Builder = require('botbuilder');
<<<<<<< HEAD
const { Logger, Messages, Endpoint, Intents} = require('./shared/const');
=======
const { Logger, Messages, Endpoint, Intents } = require('./shared/const');
>>>>>>> 7db171162604e568a53ee639bb98c0f2ee42bf42
//const JsonStorage = require('./data/BotJsonStore');


const BaseDialog = require('./dialogs/base-dialog');
<<<<<<< HEAD
=======
const SearchDialog = require('./dialogs/search-dialog');
>>>>>>> 7db171162604e568a53ee639bb98c0f2ee42bf42



class YourBotBuilder {
    constructor() {
        this.appId = process.env.APP_ID || ''; // Can be emtpy, but remember to insert them in the emulator also
        this.appPw = process.env.APP_PW || ''; // Can be emtpy, but remember to insert them in the emulator also
        this.luis = process.env.LUIS_URL || 'TODO-INSERT-LUIS-URK';
        this.connector = null;
        this.recognizer = [];
    }

    withConnector(server, appId, appPw) {
        this.appId = this.appId || appId;
        this.appPw = this.appPw || appPw;
        this.connector = new Builder.ChatConnector({ appId: this.appId, appPassword: this.appPw });
        server.post(Endpoint, this.connector.listen()); // Server will reeive messages on this endpoint
        return this;
    }

    withRecognizer(recognizer) {
        if (recognizer) {
            this.recognizer.push(recognizer); //TODO: For an own Recognizer look @ https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-messages
        } else {
            //Default Recognizer is Luis
            this.recognizer.push(new Builder.LuisRecognizer(this.luis));
        }
        return this;
    }

    build() {
        let bot = new YourBot(this.connector, this.recognizer);
        this.recognizer.forEach(recognizer => { bot.core.recognizer(recognizer); }); //TODO: Pay attention so you dont add multiple Luis Recognizer
        return bot;
    }
}


class YourBot {
    constructor(connector, recognizer) {
        this.core = new Builder.UniversalBot(connector, (session, args) => {
            //TODO: Default Handler that will be called if no dialog or other handler triggers
<<<<<<< HEAD
            //session.send(Messages.Greeting);
        });

        //this.core.recognizer(recognizer);
=======
            session.send(Messages.Greeting);
        });

        // this.core.recognizer(recognizer);
>>>>>>> 7db171162604e568a53ee639bb98c0f2ee42bf42
        //this.core.set('storage', new JsonStorage()); //TODO: Remove this line to use memory storage (State will be lost after shutdown)
        this.init();
    }


    init() {
        //TODO: Add your dialogs to the bot
<<<<<<< HEAD
        this.core.dialog(BaseDialog.getName(), [
          BaseDialog.greet,
          BaseDialog.askForName,
          BaseDialog.askForPreference_0,
          BaseDialog.askForPreference_1,
          BaseDialog.askForPreference_2,
          BaseDialog.askForPricePreference
        ])
        .triggerAction({ matches: /^(hello)/i })
        .cancelAction('CancelPlaceAdding', 'Okay', { matches: /^(cancel|nevermind|abort)/i });
    }


=======
        this.core.dialog(BaseDialog.getName(), [BaseDialog.askUserForName, BaseDialog.greetUser])
            .triggerAction({ matches: /^(hello)/i })
            .cancelAction('CancelPlaceAdding', 'Okay', { matches: /^(cancel|nevermind|abort)/i });

        this.core.dialog(SearchDialog.getName(), [SearchDialog.askUserForLocation, SearchDialog.retrieveRecommendations, SearchDialog.validateRecommendations])
            .triggerAction({ matches: /^(search)/i })
    }
>>>>>>> 7db171162604e568a53ee639bb98c0f2ee42bf42
}

module.exports = {
    Builder: YourBotBuilder
}
