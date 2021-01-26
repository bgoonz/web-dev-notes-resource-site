var property, unit, factor, tempIncrement;
property = new Array();
unit = new Array();
factor = new Array();

var cb_current = [
    [ "astronomical unit [1996]", 149597870691 ],
    [ "kilometer", 1e3 ],
    [ "light second", 299792458 ],
    [ "light minute", 17987547480 ],
    [ "light hour", 0xfb487b90a0 ],
    [ "light day", 25902068371200 ],
    [ "light year [Julian]", 9460730472580800 ],
    [ "light year [tropical]", 9460528404879358 ],
    [ "light year [traditional]", 9454254955488e3 ],
    [ "parsec", 0x6da012c18c2810 ],
    [ "meter", 1 ],
    [ "mile", 1609.344 ]
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
