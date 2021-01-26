var property, unit, factor, tempIncrement;
property = new Array();
unit = new Array();
factor = new Array();

property[ 4 ] = "Energy";
unit[ 4 ] = new Array( "Joule (J)", "BTU (mean)", "BTU (thermochemical)", "Calorie (SI) (cal)", "Calorie (mean)(cal)", "Calorie (thermo)", "Electron volt (eV)", "Erg (erg)", "Foot-pound force", "Foot-poundal", "Horsepower-hour", "Kilocalorie (SI)(kcal)", "Kilocalorie (mean)(kcal)", "Kilowatt-hour (kW hr)", "Ton of TNT", "Volt-coulomb (V Cb)", "Watt-hour (W hr)", "Watt-second (W sec)" );
factor[ 4 ] = new Array( 1, 1055.87, 1054.35, 4.1868, 4.19002, 4.184, 1.6021E-19, .0000001, 1.355818, 4.214011E-02, 2684077.3, 4186.8, 4190.02, 3600000, 4.2E9, 1, 3600, 1 );



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

  var prop = "Energy";
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
