function RemoveLineBreaks() {
  var e = $( "#input-text" ).val();
  0 != e.trim().length && $( "#input-text" ).val( e.replace( /(?:\r\n|\r|\n)/g, '' ) )
}
