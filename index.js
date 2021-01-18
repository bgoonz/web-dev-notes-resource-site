const HCCrawler = require( 'headless-chrome-crawler' );

( async () => {
  const crawler = await HCCrawler.launch( {
    // Function to be evaluated in browsers
    evaluatePage: ( () => ( {
      title: $( 'title' ).text(),
    } ) ),
    // Function to be called with evaluated results from browsers
    onSuccess: ( result => {
      console.log( result );
    } ),
  } );
  // Queue a request
  await crawler.queue( 'https://goofy-euclid-1cd736.netlify.app/' );
  // Queue multiple requests
  await crawler.queue( [ 'https://goofy-euclid-1cd736.netlify.app/', 'https://goofy-euclid-1cd736.netlify.app/' ] );
  // Queue a request with custom options
  await crawler.queue( {
    url: 'https://goofy-euclid-1cd736.netlify.app/',
    // Emulate a tablet device
    device: 'Nexus 7',
    // Enable screenshot by passing options
    screenshot: {
      path: './tmp/example-com.png'
    },
  } );
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler
} )();
