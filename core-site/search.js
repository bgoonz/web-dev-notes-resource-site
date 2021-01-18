

const lunr = require( 'lunr' );
var searchIndex = lunr( function () {
  this.ref( "id" );
  this.field( "title", {
    boost: 10
  } );
  this.field( "content" );
  for ( var key in window.pages ) {
    this.add( {
      "id": key,
      "title": pages[ key ].title,
      "content": pages[ key ].content
    } );
  }
} );
function getQueryVariable( variable ) {
  var query = window.location.search.substring( 1 );
  var vars = query.split( "&" );
  for ( var i = 0; i < vars.length; i++ ) {
    var pair = vars[ i ].split( "=" );
    if ( pair[ 0 ] === variable ) {
      return decodeURIComponent( pair[ 1 ].replace( /\+/g, "%20" ) );
    }
  }
}

var searchTerm = getQueryVariable( "q" );
// creation of searchIndex from earlier example
var results = searchIndex.search( searchTerm );
var resultPages = results.map( function ( match ) {
  return pages[ match.ref ];
} );
// resultPages from previous example
resultsString = "";
resultPages.forEach( function ( r ) {
  resultsString += "<li>";
  resultsString += "<a class='result' href='" + r.url + "?q=" + searchTerm + "'><h3>" + r.title + "</h3></a>";
  resultsString += "<div class='snippet'>" + r.content.substring( 0, 200 ) + "</div>";
  resultsString += "</li>"
} );
document.querySelector( "#search-results" ).innerHTML = resultsString;
