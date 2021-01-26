var cb_volume = [
  [ "binary", "2" ],
  [ "octal", "8" ],
  [ "decimal", "10" ],
  [ "hexadecimal", "16" ],
  [ "Base-2", "2" ],
  [ "Base-3", "3" ],
  [ "Base-4", "4" ],
  [ "Base-5", "5" ],
  [ "Base-6", "6" ],
  [ "Base-7", "7" ],
  [ "Base-8", "8" ],
  [ "Base-9", "9" ],
  [ "Base-10", "10" ],
  [ "Base-11", "11" ],
  [ "Base-12", "12" ],
  [ "Base-13", "13" ],
  [ "Base-14", "14" ],
  [ "Base-15", "15" ],
  [ "Base-16", "16" ],
  [ "Base-17", "17" ],
  [ "Base-18", "18" ],
  [ "Base-19", "19" ],
  [ "Base-20", "20" ],
  [ "Base-21", "21" ],
  [ "Base-22", "22" ],
  [ "Base-23", "23" ],
  [ "Base-24", "24" ],
  [ "Base-25", "25" ],
  [ "Base-26", "26" ],
  [ "Base-27", "27" ],
  [ "Base-28", "28" ],
  [ "Base-29", "29" ],
  [ "Base-30", "30" ],
  [ "Base-31", "31" ],
  [ "Base-32", "32" ],
  [ "Base-33", "33" ],
  [ "Base-34", "34" ],
  [ "Base-35", "35" ],
  [ "Base-36", "36" ]
];


function allNumbersConvter() {
  var i = $( "#inp" ).val(),
    n = $( "#select_from" ).val(),
    o = $( "#select_to" ).val();
  $( "#from_title" ).text( $( "#select_from option:selected" ).text() ), $( "#to_title" ).text( $( "#select_to option:selected" ).text() );
  var l = convertFromBaseToBase( i, n, o );
  $( "#amount_ans" ).val( l );
  record_activity( 'tool_used', t_n, ' Weight Converter From ' + n + ' ' + o + ' Executed' );


}

function convertFromBaseToBase( e, a, t ) {
  var r = parseInt( e, a );

  if ( "" != e.trim() ) {
    var i = r.toString( t );
    return "NaN" == i.toString() && ( i = "Invalid Input" ), i
  }
}

function createSelectMenu() {

  var html = "";
  cb_volume.map( ( a, b ) => {
    var s = ( b == '0' ) ? 'selected="selected"' : ''
    html += '<option ' + s + ' value="' + a[ 1 ] + '">' + a[ 0 ] + '</option>'
  } );
  $( '#select_from,#select_to' ).html( html );
}
$( document ).ready( function () {
  createSelectMenu();
  allNumbersConvter();
} )
