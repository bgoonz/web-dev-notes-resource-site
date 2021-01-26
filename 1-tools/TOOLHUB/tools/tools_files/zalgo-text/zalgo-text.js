var settings = {
  'above': {
    'min': 5,
    'max': 10
  },
  'below': {
    'min': 5,
    'max': 10
  },
  'overlay': {
    'min': 0,
    'max': 1
  }
};

function getRandIntBetween( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

function generateRandomZalgo( originalTxt, marksTable, generateSettings, generateHtmlTF ) {
  var convertedTxt = "";
  var convertedHtml = "";
  for ( var c = 0; c < originalTxt.length; c++ ) {
    convertedTxt += originalTxt.charAt( c );
    if ( generateHtmlTF ) {
      convertedHtml += originalTxt.charAt( c );
    }
    if ( originalTxt.charAt( c ) != " " ) {
      for ( var gSettingsType in generateSettings ) {
        var randWithinSettings = getRandIntBetween( generateSettings[ gSettingsType ][ 'min' ], generateSettings[ gSettingsType ][ 'max' ] );
        var markTypeLength = zalgoMarks[ gSettingsType ].length;
        for ( var c2 = 0; c2 < randWithinSettings; c2++ ) {
          var markToInclude = marksTable[ gSettingsType ][ getRandIntBetween( 0, markTypeLength - 1 ) ];
          convertedTxt += markToInclude;
          if ( generateHtmlTF ) {
            convertedHtml += zalgoMarksHtml[ markToInclude ];
          }
        }
      }
    }
  }
  return new Array( convertedTxt, convertedHtml );
}

function setZalgo() {
  var zalgoConverted;
  zalgoConverted = generateRandomZalgo( $( "#input-text" ).val(), zalgoMarks, settings, true );
  $( "#result" ).val( zalgoConverted[ 0 ] );
  $( "#result" ).css( "line-height", "5em" );
}
$( document ).ready( function () {
  $( "#convertToZalgo" ).click( function () {
    setZalgo();
  } );
} );
