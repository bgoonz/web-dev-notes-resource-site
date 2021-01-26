var unit, factor;

unit = new Array(
  "1/second",
  "cycle/second",
  "degree/hour",
  "degree/minute",
  "degree/second",
  "gigahertz",
  "hertz",
  "kilohertz",
  "megahertz",
  "millihertz",
  "radian/hour",
  "radian/minute",
  "radian/second",
  "revolution/hour",
  "revolution/minute",
  "revolution/second",
  "RPM",
  "terrahertz"
);

factor = new Array( 1,
  1,
  1 / 1296e3,
  1 / 21600,
  1 / 360,
  1e9,
  1,
  1e3,
  1e6,
  0.001,
  1 / 22619.467,
  1 / 376.99112,
  1 / 6.2831853,
  1 / 3600,
  1 / 60,
  1,
  1 / 60,
  1e12
);
function isNumeric( e ) {
  for ( var t = 0; t < e.length; t++ )
    if ( -1 == "0123456789.".indexOf( e.charAt( t ) ) ) return !1;
  return !0
}



function ConvertFromTo( sourceIndex, sourceFactor, targetIndex, targetFactor, data ) {
  var value;

  value = data;

  if ( isNumeric( sourceFactor ) ) {
    value *= sourceFactor;
  } else {
    value = eval( sourceFactor );
  }
  if ( isNumeric( targetFactor ) ) {
    value /= targetFactor;
  } else {
    value = eval( targetFactor );
  }

  value = Math.round( value * Math.pow( 10, 10 ) ) / Math.pow( 10, 10 );

  return value;
}

$( document ).ready( function ( e ) {

  $( "#from" ).append( "<option value='' selected>Select from</option>" );

  $( unit ).each( function ( index, element ) {
    $( "#from" ).append( "<option value='" + element + "'>" + element + "</option>" );
  } );

  $( "#into" ).append( "<option value='' selected>Select to</option>" );
  $( unit ).each( function ( index, element ) {
    $( "#into" ).append( "<option value='" + element + "'>" + element + "</option>" );
  } );
  $( '#outPut' ).val( '' );



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

    sourceIndex = ( $( '#from' ).prop( 'selectedIndex' ) - 1 );
    sourceFactor = factor[ sourceIndex ];
    targetIndex = ( $( '#into' ).prop( 'selectedIndex' ) - 1 );
    targetFactor = factor[ targetIndex ];

    out = ConvertFromTo( sourceIndex, sourceFactor, targetIndex, targetFactor, data );
    $( "#outPut" ).prop( 'disabled', false );
    $( "#outPut" ).val( out );
    $( "#outPut" ).prop( 'disabled', true );

  } );
  } );
