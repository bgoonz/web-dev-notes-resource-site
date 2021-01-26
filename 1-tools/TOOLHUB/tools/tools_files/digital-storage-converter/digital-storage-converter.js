var property, unit, factor, tempIncrement;
property = new Array();
unit = new Array();
factor = new Array();

property[ 20 ] = "Digital Storage";
unit[ 20 ] = new Array( "bits", "bytes", "kilobits [Kb]", "kilobytes [KB]", "megabits [Mb]", "megabytes [MB]", "gigabits [Gb]", "gigabytes [GB]", "terabits [Tb]", "terabytes [TB]", "petabits [Pb]", "petabytes [PB]", "exabits [Eb]", "exabytes [EB]" );
factor[ 20 ] = new Array( 0.125, 1, 128, 1024, 131072, 1048576, 134217728, 1073741824, 137438953472, 1099511627776, 140737488355328, 1125899906842624, 144115188075855872, 1152921504606846976 );


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

  var prop = "Digital Storage";
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
