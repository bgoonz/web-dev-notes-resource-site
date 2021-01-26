var property, unit, factor, tempIncrement;
property = new Array();
unit = new Array();
factor = new Array();
property[ 15 ] = "Time";
unit[ 15 ] = new Array( "Second (sec)", "Day (mean solar)", "Day (sidereal)", "Hour (mean solar)", "Hour (sidereal)", "Minute (mean solar)", "Minute (sidereal)", "Month (mean calendar)", "Second (sidereal)", "Year (calendar)", "Year (tropical)", "Year (sidereal)" );
factor[ 15 ] = new Array( 1, 8.640E4, 86164.09, 3600, 3590.17, 60, 60, 2628000, .9972696, 31536000, 31556930, 31558150 );

function ConvertFromTo( propIndex, sourceIndex, sourceFactor, targetIndex, targetFactor, data ) {
  var result;
  result = data;
  if ( property[ propIndex ] == "Temperature" ) {
    result = result + tempIncrement[ sourceIndex ];
  }
  result = result * sourceFactor;
  result = result / targetFactor;
  if ( property[ propIndex ] == "Temperature" ) {
    result = result - tempIncrement[ targetIndex ];
  }
  return result;
}
$( document ).ready( function ( e ) {
  var prop = "Time";
  var unit_key = property.indexOf( prop );
  $( "#from" ).append( "<option value='' selected>Select from</option>" );
  $( unit[ unit_key ] ).each( function ( index, element ) {
    $( "#from" ).append( "<option value='" + element + "'>" + element + "</option>" );
  } );
  $( "#into" ).append( "<option value='' selected>Select to</option>" );
  $( unit[ unit_key ] ).each( function ( index, element ) {
    $( "#into" ).append( "<option value='" + element + "'>" + element + "</option>" );
  } );
  $( "#convert" ).click( function ( e ) {
    var data, from, to, propIndex, sourceIndex, sourceFactor, targetIndex, targetFactor, out;
    data = parseFloat( $.trim( $( "#inputNumber" ).val() ) );
    from = $.trim( $( "#from option:selected" ).val() );
    to = $.trim( $( "#into option:selected" ).val() );
    if ( $.trim( data ) == "" || $.trim( data ) == 0 || isNaN( data ) ) {
      $( "#inputNumber" ).focus().parents( "div.form-group" ).addClass( "has-error" );
      return false;
    } else {
      $( "#inputNumber" ).parents( "div.form-group" ).removeClass( "has-error" );
    }
    if ( $.trim( from ) == "" ) {
      $( "#from" ).focus().parents( "div.form-group" ).addClass( "has-error" );
      return false;
    } else {
      $( "#from" ).parents( "div.form-group" ).removeClass( "has-error" );
    }
    if ( $.trim( to ) == "" ) {
      $( "#into" ).focus().parents( "div.form-group" ).addClass( "has-error" );
      return false;
    } else {
      $( "#into" ).parents( "div.form-group" ).removeClass( "has-error" );
    }
    propIndex = unit_key;
    sourceIndex = ( $( '#from' ).prop( 'selectedIndex' ) - 1 );
    sourceFactor = factor[ propIndex ][ sourceIndex ];
    targetIndex = ( $( '#into' ).prop( 'selectedIndex' ) - 1 );
    targetFactor = factor[ propIndex ][ targetIndex ];
    out = ConvertFromTo( propIndex, sourceIndex, sourceFactor, targetIndex, targetFactor, data );
    $( "#outPut" ).prop( 'disabled', false );
    $( "#outPut" ).val( out );
    $( "#outPut" ).prop( 'disabled', true );
  } );
} );
