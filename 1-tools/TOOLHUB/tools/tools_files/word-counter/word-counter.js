var ev = true;
var ef = false;
function count_words( e ) {
  paragraphFlag = false;
  if ( null != e ) {
    paragraphFlag = e
    ef = e;
  }

  if ( ev ) {
    ev = false;
    record_activity( 'tool_used', t_n, 'Word Count Exec' );
  }


  $( '#park' ).val( $( '#input-text' ).val() );
  Countable.on( document.getElementById( "input-text" ), function ( e ) {

    if ( "all" in e ) {
      $( '#character_count_space' ).val( e.all );
    }
    if ( "characters" in e ) {
      $( '#character_count' ).val( e.characters );
    }
    if ( "paragraphs" in e ) {
      $( '#paragraph_count' ).val( e.paragraphs );
    }

    if ( "sentences" in e ) {
      $( '#sentence_count' ).val( e.sentences );
    }
    if ( "words" in e ) {
      $( '#word_count' ).val( e.words );
    }

    var a = $( "#input-text" ).val();
    var t = a.split( /[.?!](?=\s|\n)/ ).length;
    $( "#avg_sentence_length" ).val( Math.ceil( e.words / t ) );

  }, {
    hardReturns: paragraphFlag,
    stripTags: !1
  }, keywordDensity() );
}
window.setInterval( function () {
  ev = true;
}, 5000 );

function toProperCase( text ) {
  for ( var e = text.split( " " ), t = [], a = 0; a < e.length; a++ ) {
    var i = e[ a ].charAt( 0 ).toUpperCase();
    t.push( i + e[ a ].slice( 1 ) )
  }
  return t.join( " " )

};
$( document ).ready( function () {
      $( "#case_s" ).on( 'change', function () {
            let c_s = $( "#case_s" ).val();

    let park_value = $( "#park" ).val();

    if ( $.trim( park_value ) == '' ) {
      return false;
    }
    if ( c_s == '0' ) {
      $( '#input-text' ).val( park_value );
    } else if ( c_s == '1' ) {
      $( '#input-text' ).val( park_value.toLowerCase() );
    } else if ( c_s == '2' ) {
      $( '#input-text' ).val( park_value.toUpperCase() );
    } else if ( c_s == '3' ) {
      $( "#input-text" ).val( toProperCase( park_value ) );
    }

    let st = $( '#search' ).val();
    if ( $.trim( st ) != '' && null != st ) {
      var t = $( "#input-text" ).val();
      if ( null != t && 0 < t.trim().length ) {

        if ( c_s == '1' ) {

          t = t.toLowerCase(), st = st.toLowerCase();
        } else if ( c_s == '2' ) {

          t = t.toUpperCase(), st = st.toUpperCase();
        } else if ( c_s == '3' ) {

          t = toProperCase( t ), st = toProperCase( st );
        }
        highlightedText = t;
        $( "#input-text" ).highlightTextarea( "enable" );
        $( "#input-text" ).highlightTextarea( "setWords", st );


        var a = t.split( st );
        $( "#search_char" ).text( a.length - 1 + "/" + $( "#word_count" ).val() );

      }
    } else {

      $( "#wordSearchcount" ).text( "" );
      $( "#search_char" ).text( "" );
      $( "#input-text" ).highlightTextarea( "disable" )
    }
  } );
  $( "#input-text" ).keyup( function () {
    count_words( ef );
  } )
  $( '#search' ).keyup( function () {

    let st = $( '#search' ).val();
    if ( $.trim( st ) != '' && null != st ) {
      var t = $( "#input-text" ).val();
      if ( null != t && 0 < t.trim().length ) {
        let c_s = $( "#case_s" ).val();
        if ( c_s == '1' ) {

          t = t.toLowerCase(), st = st.toLowerCase();
        } else if ( c_s == '2' ) {

          t = t.toUpperCase(), st = st.toUpperCase();
        } else if ( c_s == '3' ) {

          t = toProperCase( t ), st = toProperCase( st );
        }


        highlightedText = t;
        $( "#input-text" ).highlightTextarea( "enable" );
        $( "#input-text" ).highlightTextarea( "setWords", st );
        t = t.toLowerCase(), st = st.toLowerCase();
        var a = t.split( st );
        $( "#search_char" ).text( a.length - 1 + "/" + $( "#word_count" ).val() );

      }
    } else {

      $( "#wordSearchcount" ).text( "" );
      $( "#search_char" ).text( "" );
      $( "#input-text" ).highlightTextarea( "disable" )
    }
  } );

} )

jQuery.wordStats = {
  unsortedWords: null,
  sortedWords: null,
  topWords: null,
  topWeights: null,
  _computed: !1,
  addWords: function ( t, o ) {
      if ( t && 1 < t.length )
        for ( var s = this.splitWords( t.toLowerCase() ), r = 0, e = s.length; r < e; r++ ) word = s[ r ], 1 < word.length && !this.stopWords[ word ] && ( this.unsortedWords[ word ] ? this.unsortedWords[ word ] += o : this.unsortedWords[ word ] = o )
  },
  addWordsFromTextNodes: function ( t, o ) {
      for ( var s = t.childNodes, r = 0, e = s.length; r < e; r++ ) 3 == s[ r ].nodeType && this.addWords( s[ r ].nodeValue, o )
  },
  testChar: function ( t ) {
    return 97 <= t && t <= 122 || 128 <= t && t <= 151 || 160 <= t && t <= 164 || 48 <= t && t <= 57 || 224 <= t && t <= 246 || 249 <= t && t <= 255
  },
  splitWords: function ( t ) {
      for ( var o = new Array, s = "", r = 0, e = t.length; r < e; r++ ) c = t.charCodeAt( r ), this.testChar( c ) ? s += t.substring( r, r + 1 ) : ( o.push( s ), s = "" );
      return 0 < s.length && o.push( s ), o
  },
  computeWords: function ( t ) {
      t || ( t = window.document ), this.unsortedWords = new Array, t.is( "textarea" ) ? this.addWords( t.val(), 1 ) : ( this.addWords( $( "title", t ).text(), 20 ), wordstats = this, $( "h1", t ).each( function () {
        wordstats.addWordsFromTextNodes( $( this ).get( 0 ), 15 )
      } ), $( "h2", t ).each( function () {
        wordstats.addWordsFromTextNodes( $( this ).get( 0 ), 10 )
      } ), $( "h3, h4, h5, h6", t ).each( function () {
        wordstats.addWordsFromTextNodes( $( this ).get( 0 ), 5 )
      } ), $( "strong, b, em, i", t ).each( function () {
        wordstats.addWordsFromTextNodes( $( this ).get( 0 ), 3 )
      } ), $( "p, div, th, td, li, a, span", t ).each( function () {
        wordstats.addWordsFromTextNodes( $( this ).get( 0 ), 2 )
      } ), $( "img", t ).each( function () {
        wordstats.addWords( $( this ).attr( "alt" ), 1 ), wordstats.addWords( $( this ).attr( "title" ), 1 )
      } ), this._computed = !0 )
  },
  computeTopWords: function ( t, o ) {
      for ( word in this._computed || this.computeWords( o ), this.topWords = new Array, this.topWeights = new Array, this.topWeights.push( 0 ), this.unsortedWords )
        for ( var s = 0; s < t; s++ )
          if ( this.unsortedWords[ word ] > this.topWeights[ s ] ) {
            this.topWeights.splice( s, 0, this.unsortedWords[ word ] ), this.topWords.splice( s, 0, word );
          break
        }
  },
  sortWords: function () {
      for ( word in this.sortedWords = new Array, i = 0, this.unsortedWords ) this.sortedWords[ i ] = word, i++;
      this.sortedWords.sort( function ( t, o ) {
        return wordstats.unsortedWords[ o ] - wordstats.unsortedWords[ t ]
      } )
  },
  clear: function () {
    this.unsortedWords = this.sortedWords = this.topWords = this.topWeights = null, this._computed = !1
  }
}, jQuery.wordStats.stopWords = {
  about: !0,
  after: !0,
  ago: !0,
  all: !0,
  also: !0,
  an: !0,
  am: !0,
  and: !0,
  any: !0,
  are: !0,
  as: !0,
  at: !0,
  be: !0,
  been: !0,
  before: !0,
  both: !0,
  but: !0,
  by: !0,
  can: !0,
  did: !0,
  do: !0,
  does: !0,
  done: !0,
  edit: !0,
  even: !0,
  every: !0,
  for: !0,
  from: !0,
  had: !0,
  has: !0,
  have: !0,
  he: !0,
  here: !0,
  him: !0,
  his: !0,
  however: !0,
  if: !0,
  in: !0,
  into: !0,
  is: !0,
  it: !0,
  its: !0,
  less: !0,
  many: !0,
  may: !0,
  more: !0,
  most: !0,
  much: !0,
  my: !0,
  no: !0,
  not: !0,
  often: !0,
  quote: !0,
  of: !0,
  on: !0,
  one: !0,
  only: !0,
  or: !0,
  other: !0,
  our: !0,
  out: !0,
  re: !0,
  says: !0,
  she: !0,
  so: !0,
  some: !0,
  soon: !0,
  such: !0,
  than: !0,
  that: !0,
  the: !0,
  their: !0,
  them: !0,
  then: !0,
  there: !0,
  these: !0,
  they: !0,
  this: !0,
  those: !0,
  though: !0,
  through: !0,
  to: !0,
  under: !0,
  use: !0,
  using: !0,
  ve: !0,
  was: !0,
  we: !0,
  were: !0,
  what: !0,
  where: !0,
  when: !0,
  whether: !0,
  which: !0,
  while: !0,
  who: !0,
  whom: !0,
  with: !0,
  within: !0,
  you: !0,
  your: !0
};

function keywordDensity() {
  if ( 0 < $( "#input-text" ).val().trim().length ) {
    var e = "";
    $.wordStats.computeTopWords( 1e5, $( "#input-text" ) ), totalWeights = getTotalWeights( $.wordStats.topWeights );
    var t, a = "";
    e = "<table cellPadding='5'>";
    for ( i = 0; i < $.wordStats.topWords.length; i++ ) {
      t = ( $.wordStats.topWeights[ i ] / totalWeights * 100 ).toFixed( 0 )
      if ( i < 10 ) {
        a +=
          "<button class='btn btn-dark m-2'>" +
          "<span>" +
          $.wordStats.topWords[ i ] +
            "</span> " +
            $.wordStats.topWeights[ i ] + " (" + t + "%)" +
            "</button>";

      }
      e += "<tr><td><a title='Search " + $.wordStats.topWords[ i ] + "' onclick=searchSelectedTextFromdialog('" + $.wordStats.topWords[ i ] + "')>" + $.wordStats.topWords[ i ] + "</a></td> <td> " + $.wordStats.topWeights[ i ] + "</td> <td> (" + t + "%)</td></tr>";
    }

    if ( 10 < $.wordStats.topWords.length ) {
      a += "<button class='btn btn-danger btn-block' data-toggle='modal' data-target='#myModal'>More</button>";

    }
    a += "", e += "</table>", $.wordStats.clear(), $( "#keyword" ).html( "" ), $( "#tempDiv" ).html( "" ), $( "#keyword" ).append( a ), $( "#tempDiv" ).append( e )
  }
}
function getTotalWeights( e ) {
  var t = 0;
  return $.each( e, function () {
    t += this
  } ), t
}
