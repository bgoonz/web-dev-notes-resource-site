function remove_extra_spaces() {
  var e = $( "#input-text" ).val();
  0 != e.trim().length && $( "#input-text" ).val( e.replace( /\s+/g, " " ).trim() )
}
