const rp         = require('request-promise');
const cheerio    = require('cheerio');
const Promise    = require('bluebird');
const mongoose   = require('mongoose');
const chalk      = require('chalk');

mongoose.Promise = Promise;
const Startup    = require('./models/startup');
const url        = 'http://london.startups-list.com/';

mongoose.connect('mongodb://localhost/startup-web-scraper');

Startup.collection.drop();

cheerioUrlAsync(url)
  .then($ => {
    const cities = $('#cityDrop option');
    return cities.map((i, city) => {
      return {
        name: $(city).text().trim(),
        url: $(city).val().trim()
      };
    }).toArray();
  })
  .then(locations => {
    return Promise.map(locations, location => {
      if (!location.url || location.name === 'More...') return;
      console.log(chalk.blue(`Scraping ${location.url}...`));

      return cheerioUrlAsync(location.url)
        .then($ => {
          const startups = $('.startup');
          console.log(chalk.yellow(`${startups.length} found. Starting ${location.name}...`));

          return startups.map((i, startupHtmlString) => {
            const name        = $(startupHtmlString).data('name');
            const url         = $(startupHtmlString).data('href');
            let twitter       = $(startupHtmlString).find('.main_link span').attr('href');
            twitter           = twitter.split('/')[twitter.split('/').length-1];
            const description = $(startupHtmlString).find('.main_link p').text().replace(/\s{2,10}/g, ' ').trim();

            const company = {
              name,
              url,
              twitter,
              description,
              location: location.name
            };
            console.log(chalk.green(`Saving ${company.name}`));
            return Startup.create(company);
          }).toArray();
        });
    });
  })
  .then(startups => {
    console.log(`${startups.length} were saved!`);
    return process.exit();
  })
  .catch(err => {
    return console.log(chalk.red(err));
  });


function cheerioUrlAsync(url) {
  console.log(chalk.green(`Preparing ${url}...`));
  return new Promise((resolve, reject) => {
    return rp(url)
      .then(htmlString => {
        const $ = cheerio.load(htmlString);
        return resolve($);
      }).catch(reject);
  });
}
