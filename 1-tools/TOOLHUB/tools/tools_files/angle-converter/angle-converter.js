var property, unit, factor, tempIncrement;
property = new Array();
unit = new Array();
factor = new Array();

var cb_current = [
  [ "arcminute", "value/(360*60)", "value * (360*60)" ],
  [ "arcsecond", "value/(360*3600)", "value * (360*3600)" ],
  [ "circle", 1 ],
  [ "degree", "value/360", "value*360" ],
  [ "gon", "value/400", "value*400" ],
  [ "grad", "value/400", "value*400" ],
  [ "mil (Nato)", "value/6400", "value*6400" ],
  [ "mil (Soviet Union)", "value/6000", "value*6000" ],
  [ "mil (Sweden)", "value/6300", "value*6300" ],
  [ "octant", .125 ],
  [ "quadrant", .25 ],
  [ "radian", "value / (2 * Math.PI)", "value * 2 * Math.PI" ],
  [ "revolution", 1 ],
  [ "sextant", "value/6", "value * 6" ],
  [ "sign", "value/12", "value * 12" ],
  [ "turn", 1 ]
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
    $( "#from" ).append( "<option value='" + index + "'>" + element[ 0 ] + "</option>" );
  } );
  $( "#into" ).append( "<option value='' selected>Select to</option>" );
  $( cb_current ).each( function ( ind, element ) {
    $( "#into" ).append( "<option value='" + ind + "'>" + element[ 0 ] + "</option>" );
  } );



  $( "#convert" ).click( function ( e ) {

    var FromVal, ToVal, value;
    value = $( "#inputNumber" ).val(), value = stripBad( value ), value = parseFloat( value ), isNaN( value ) && ( value = 0 ), $( "#inputNumber" ).val( value ), FromVal = $( "#from" ).val(), ToVal = $( "#into" ).val();
    var lUnitFrom = cb_current[ FromVal ],
      lUnitTo = cb_current[ ToVal ];

    isNumeric( lUnitFrom[ 1 ] ) ? value *= lUnitFrom[ 1 ] : value = eval( lUnitFrom[ 1 ] ), isNumeric( lUnitTo[ 1 ] ) ? value /= lUnitTo[ 1 ] : value = eval( lUnitTo[ 2 ] ), value = Math.round( value * Math.pow( 10, 10 ) ) / Math.pow( 10, 10 ), $( "#outPut" ).val( value )

  } );
  } );
