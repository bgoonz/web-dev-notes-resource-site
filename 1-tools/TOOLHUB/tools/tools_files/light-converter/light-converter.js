var property, unit, factor, tempIncrement;
property = new Array();
unit = new Array();
factor = new Array();

property[ 8 ] = "Light";
unit[ 8 ] = new Array( "Lumen/sq.meter (Lu/m^2)", "Lumen/sq.centimeter", "Lumen/sq.foot", "Foot-candle (ft-cdl)", "Foot-lambert", "Candela/sq.meter", "Candela/sq.centimeter", "Lux (lux)", "Phot" );
factor[ 8 ] = new Array( 1, 10000, 10.76391, 10.76391, 10.76391, 3.14159250538575, 31415.9250538576, 1, 10000 );




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

  var prop = "Light";
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
      $( "#inputNumber" ).focus().addClass( "is-invalid" );
      return false;
    } else {
      $( "#inputNumber" ).removeClass( "is-invalid" );
    }


    if ( $.trim( from ) == "" ) {
      $( "#from" ).focus().addClass( "is-invalid" );
      return false;
    } else {
      $( "#from" ).removeClass( "is-invalid" );
    }


    if ( $.trim( to ) == "" ) {
      $( "#into" ).focus().addClass( "has-error" );
      return false;
    } else {
      $( "#into" ).removeClass( "has-error" );
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
