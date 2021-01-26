var property, unit, factor, tempIncrement;
property = new Array();
unit = new Array();
factor = new Array();

property[ 11 ] = "Density & Mass capacity";
unit[ 11 ] = new Array( "Kilogram/cub.meter", "Grain/galon", "Grams/cm^3 (gr/cc)", "Pound mass/cubic foot", "Pound mass/cubic-inch", "Ounces/gallon (UK,liq)", "Ounces/gallon (US,liq)", "Ounces (mass)/inch", "Pound mass/gal (UK,liq)", "Pound mass/gal (US,liq)", "Slug/cubic foot", "Tons (long,mass)/cub.yard" );
factor[ 11 ] = new Array( 1, .01711806, 1000, 16.01846, 27679.91, 6.236027, 7.489152, 1729.994, 99.77644, 119.8264, 515.379, 1328.939 );



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

  var prop = "Density & Mass capacity";
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
