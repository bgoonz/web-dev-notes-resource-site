function converter( e ) {
  if ( e.which == 13 || e.keyCode == 13 ) {
    calc();
  }
}

function clr() {
  document.calcform.reset();
  document.calcform.color.style.backgroundColor = "#FFFFFF";
}
function calc() {
  hex = document.calcform.hex.value;
  if ( hex == "" ) hex = "000000";
  if ( hex.charAt( 0 ) == "#" ) hex = hex.substring( 1, hex.length );
  if ( hex.length != 6 ) {
    alert( "Please enter 6 digits color code !" );
    return;
  }
  r = hex.substring( 0, 2 );
  g = hex.substring( 2, 4 );
  b = hex.substring( 4, 6 );
  r = parseInt( r, 16 );
  g = parseInt( g, 16 );
  b = parseInt( b, 16 );
  document.calcform.r.value = r;
  document.calcform.g.value = g;
  document.calcform.b.value = b;
  document.calcform.css.value = "rgb(" + r + "," + g + "," + b + ")";
  document.calcform.color.style.backgroundColor = '#' + hex;
}
