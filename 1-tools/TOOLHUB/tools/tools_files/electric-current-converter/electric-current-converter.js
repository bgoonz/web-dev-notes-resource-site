var property, unit, factor, tempIncrement;
property = new Array();
unit = new Array();
factor = new Array();

var cb_current = [
  [ "abampere [abA]", 10 ],
  [ "ampere [A]", 1 ],
  [ "biot [Bi]", 10 ],
  [ "centiampere", .01 ],
  [ "coulomb/second", 1 ],
  [ "EMU of current", 10 ],
  [ "ESU of current", 3.335641e-10 ],
  [ "franklin/second", 3.335641e-10 ],
  [ "gaussian electric current", 3.335641e-10 ],
  [ "gigaampere", 1e9 ],
  [ "gilbert [Gi]", .79577472 ],
  [ "kiloampere [kA]", 1e3 ],
  [ "megaampere", 1e6 ],
  [ "microampere", 1e-6 ],
  [ "milliampere [mA]", .001 ],
  [ "milliamp", .001 ],
  [ "nanoampere", 1e-9 ],
  [ "picoampere", 1e-12 ],
  [ "siemens volt", 1 ],
  [ "statampere [stA]", 3.335641e-10 ],
  [ "teraampere", 1e12 ],
  [ "volt/ohm", 1 ],
  [ "watt/volt", 1 ],
  [ "weber/henry", 1 ]
];


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

      function stripBad( e ) {
        for ( var t = 0, a = ""; t < e.length; t++ ) - 1 != "eE-0123456789.".indexOf( e.charAt( t ) ) && ( a += e.charAt( t ) );
        return a
      }

  function isNumeric( e ) {
    for ( var t = 0; t < e.length; t++ )
      if ( -1 == "0123456789.".indexOf( e.charAt( t ) ) ) return !1;
    return !0
  }
  var prop = "Acceleration";
  //var unit_key = property.indexOf(prop);
  $( "#from" ).append( "<option value='' selected>Select from</option>" );
  $( cb_current ).each( function ( index, element ) {
    $( "#from" ).append( "<option value='" + index + "'>" + element + "</option>" );
  } );
  $( "#into" ).append( "<option value='' selected>Select to</option>" );
  $( cb_current ).each( function ( ind, element ) {
    $( "#into" ).append( "<option value='" + ind + "'>" + element + "</option>" );
  } );



  $( "#convert" ).click( function ( e ) {

    var FromVal, ToVal, value;
    value = $( "#inputNumber" ).val(), value = stripBad( value ), value = parseFloat( value ), isNaN( value ) && ( value = 0 ), $( "#inputNumber" ).val( value ), FromVal = $( "#from" ).val(), ToVal = $( "#into" ).val();
    var lUnitFrom = cb_current[ FromVal ],
      lUnitTo = cb_current[ ToVal ];

    isNumeric( lUnitFrom[ 1 ] ) ? value *= lUnitFrom[ 1 ] : value = eval( lUnitFrom[ 1 ] ), isNumeric( lUnitTo[ 1 ] ) ? value /= lUnitTo[ 1 ] : value = eval( lUnitTo[ 2 ] ), value = Math.round( value * Math.pow( 10, 10 ) ) / Math.pow( 10, 10 ), $( "#outPut" ).val( value )

  } );
  } );
