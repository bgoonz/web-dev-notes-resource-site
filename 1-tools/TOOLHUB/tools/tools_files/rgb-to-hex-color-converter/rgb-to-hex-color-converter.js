$( function () {
      function hexFromRGB( r, g, b ) {
    var hex = [
      r.toString( 16 ),
      g.toString( 16 ),
      b.toString( 16 )
    ];
    $.each( hex, function ( nr, val ) {
      if ( val.length === 1 ) {
        hex[ nr ] = "0" + val;
      }
    } );
    return hex.join( "" ).toUpperCase();
  }
  function refreshSwatch() {
    var red = $( "#red" ).slider( "value" ),
      green = $( "#green" ).slider( "value" ),
      blue = $( "#blue" ).slider( "value" ),
      hex = hexFromRGB( red, green, blue );
    $( "#swatch" ).css( "background-color", "#" + hex );
    $( "#r" ).val( red );
    $( "#g" ).val( green );
    $( "#b" ).val( blue );
  }

  $( "#red, #green, #blue" ).slider( {
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 127,
    slide: refreshSwatch,
    change: refreshSwatch
  } );
  //$( "#red" ).slider( "value", 255 );
  //$( "#green" ).slider( "value", 140 );
  //$( "#blue" ).slider( "value", 60 );
  clr();
} );
function onnumber( obj, n ) {
  var r = $( "#r" ).val();
  var g = $( "#g" ).val();
  var b = $( "#b" ).val();
  if ( n == 1 )
    $( "#red" ).slider( "value", r );
  else if ( n == 2 )
    $( "#green" ).slider( "value", g );
  else
    $( "#blue" ).slider( "value", b );
  //refreshSwatch();
  //calc();
}
function clr() {
  $( "#red" ).slider( "value", 0 );
  $( "#green" ).slider( "value", 0 );
  $( "#blue" ).slider( "value", 0 );
  $( "#swatch" ).css( "background-color", "white" );
  document.calcform.reset();
}
function calc() {
  r = document.calcform.r.value;
  g = document.calcform.g.value;
  b = document.calcform.b.value;
  if ( r == "" ) r = 0;
  if ( g == "" ) g = 0;
  if ( b == "" ) b = 0;
  r = parseInt( r );
  g = parseInt( g );
  b = parseInt( b );
  if ( r < 0 ) r = 0;
  if ( g < 0 ) g = 0;
  if ( b < 0 ) b = 0;
  if ( r > 255 ) r = 255;
  if ( g > 255 ) g = 255;
  if ( b > 255 ) b = 255;
  hex = r * 65536 + g * 256 + b;
  hex = hex.toString( 16, 6 );
  len = hex.length;
  if ( len < 6 )
    for ( i = 0; i < 6 - len; i++ )
      hex = '0' + hex;
  document.calcform.hex.value = '#' + hex.toUpperCase();
  document.calcform.rgb.value = 'rgb(' + r + ',' + g + ',' + b + ')';
  var h, s, l;
  r /= 255;
  g /= 255;
  b /= 255;
  var M = Math.max( r, g, b );
  var m = Math.min( r, g, b );
  var d = M - m;
  if ( d == 0 ) h = 0;
  else if ( M == r ) h = ( ( g - b ) / d ) % 6;
  else if ( M == g ) h = ( b - r ) / d + 2;
  else h = ( r - g ) / d + 4;
  h *= 60;
  if ( h < 0 ) h += 360;
  l = ( M + m ) / 2;
  if ( d == 0 )
    s = 0;
  else
    s = d / ( 1 - Math.abs( 2 * l - 1 ) );
    s *= 100;
    l *= 100;
    s = Math.round( s );
    l = Math.round( l );
    h = h.toFixed( 0 );
    s = s.toFixed( 0 );
    l = l.toFixed( 0 );
    document.calcform.hsl.value = 'hsl(' + h + ',' + s + ',' + l + ')';
}
