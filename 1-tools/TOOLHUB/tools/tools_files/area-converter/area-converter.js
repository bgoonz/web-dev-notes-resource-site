var property, unit, factor, tempIncrement;
property = new Array();
unit = new Array();
factor = new Array();

property[ 1 ] = "Area";
unit[ 1 ] = new Array( "Square meter (m^2)", "Acre (acre)", "Are", "Barn (barn)", "Hectare", "Rood", "Square centimeter", "Square kilometer", "Circular mil", "Square foot (ft^2)", "Square inch (in^2)", "Square mile (mi^2)", "Square yard (yd^2)" );
factor[ 1 ] = new Array( 1, 4046.856, 100, 1E-28, 10000, 1011.71413184285, .0001, 1000000, 5.067075E-10, 9.290304E-02, 6.4516E-04, 2589988, .8361274 );


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

  var prop = "Area";
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
