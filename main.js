require('dotenv').config();
const slackNode = require('slack-node');
const request = require('request');
const fs = require('fs');

apiToken = process.env.SLACK_API_TOKEN;
slack = new slackNode(apiToken);

slack.api('emoji.list', function (err, response) {
  for (key in response.emoji) {
    url = response.emoji[key];
    if (url.match(/alias/)) {
      continue;
    }

    extention = url.match(/\.[^\.]+$/);

    request
      .get(url)
      .on('response', function (res) {})
      .pipe(fs.createWriteStream('image/' + key + extention));
  }
});
