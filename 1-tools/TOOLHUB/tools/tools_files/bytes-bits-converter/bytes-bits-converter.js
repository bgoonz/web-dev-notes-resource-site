var unit, factor;

unit = new Array( "bits", "bytes", "kilobits [Kb]", "kilobytes [KB]", "megabits [Mb]", "megabytes [MB]", "gigabits [Gb]", "gigabytes [GB]", "terabits [Tb]", "terabytes [TB]", "petabits [Pb]", "petabytes [PB]", "exabits [Eb]", "exabytes [EB]" );
factor = new Array( .125, 1, 128, 1024, 131072, 1048576, 134217728, 1073741824, 137438953472, 1099511627776, 0x800000000000, 0x4000000000000, 0x200000000000000, 0x1000000000000000 );



function ConvertFromTo( sourceIndex, sourceFactor, targetIndex, targetFactor, data ) {
  var result;
  result = data;
  result = result * sourceFactor;
  result = result / targetFactor;
  return result;
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
