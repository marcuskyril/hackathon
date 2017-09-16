'use strict';
const Builder = require('botbuilder');
const yelp = require('yelp-fusion');
var moment = require('moment');

// yelp credentials
var yelpCredentials = {
	username: 'AE_ilfRelfNccYk-8NFvhQ',
	password: 'qEzFs8nB5rP4Nzs0136tVlmkjiofU0howSFq3CPVAwoHrmS7tZpVGH33f2krSWGi'
};

const { Logger, Messages } = require('../shared/const');

class SearchDialog {
    constructor() { Logger.info('Created Instance of SearchDialog'); }
    getName() { return 'SearchDialog'; } // Needs to be unique otherwise an error occurs during registration

    askUserForLocation(session, args) {
      console.log('searching for locations');
      Builder.Prompts.text(session, Messages.AskForLocation);
    }

    retrieveRecommendations(session, result, next) {
      let timestamp = moment(session.message.timestamp).get('hour');

      session.send(Messages.Recommendations);
      // session.send(Messages.PersonalGreeting.replace('%s', result.response)).endDialog();

      return new Promise (function(resolve, reject) {
    		yelp.accessToken(yelpCredentials.username, yelpCredentials.password).then(response => {
    			var token = response.jsonBody.access_token;

    			const yelpClient = yelp.client(token);

    			var results = Messages.Recommendations;

          var msg = new Builder.Message(session);
      		msg.attachmentLayout(Builder.AttachmentLayout.carousel);
          var attachments = [];

    			yelpClient.search({
    			  term: 'food',
    			  location: result.response
    			}).then(response => {
    				if(response) {
              // send(response.jsonBody.businesses);

              var recs = response.jsonBody.businesses;

              let tmpCard = null;

              recs.forEach((rec) => {

                // var openingHours = rec.hours.open; // array of timestamps
                tmpCard = [
        					new Builder.HeroCard(session)
        						.title(rec.name)
        						.subtitle(`Rating: ${rec.rating}, Price: ${rec.price}`)
        						.text(rec.address1)
        						.images([Builder.CardImage.create(session, rec.image_url)])
        						.buttons([
        							Builder.CardAction.openUrl(session, rec.url, 'Check this out'),
        							Builder.CardAction.openUrl(session, `https://www.google.com.sg/maps/dir/49.487248, 8.468453/${rec.coordinates.latitude},${rec.coordinates.longitude}`, 'Directions')
        						])
        				];
                attachments.push(...tmpCard);
                
              });

              msg.attachments(attachments);
        			session.send(msg);
              next(session);

    					resolve(response.jsonBody.businesses)
    				} else {
    					reject();
    				}

    			}).catch(e => {
    			  console.log(e);
    			});

    		}).catch(e => {
    			console.log(e);
    		})
    	})
    }

    validateRecommendations(session, result) {
      console.log('fyeah');
      session.delay(5000);
      Builder.Prompts.text(session, Messages.AskForValidation);
      session.send('We\'ve saved your response to give you better recommendations in the future!')
    }
}

module.exports = new SearchDialog();
