function gen_pass() {
  for ( var e = $( "#pass_len" ).val(), a = "abcdefghijklmnopqrstuvwxyz", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", r = "0123456789", i = "!@#$%^&*()_+~`|}{[]:;?><,./-=", n = "", o = n; n.length < e; ) entity1 = Math.ceil( a.length * Math.random() * Math.random() ), entity2 = Math.ceil( r.length * Math.random() * Math.random() ), entity3 = Math.ceil( i.length * Math.random() * Math.random() ), entity4 = Math.ceil( t.length * Math.random() * Math.random() ), $( "#alphabets" ).is( ":checked" ) && n.length < e && ( n += a.charAt( entity1 ) ), $( "#caps" ).is( ":checked" ) && n.length < e && ( n += t.charAt( entity4 ) ), $( "#dig" ).is( ":checked" ) && n.length < e && ( n += r.charAt( entity2 ) ), $( "#special_chars" ).is( ":checked" ) && n.length < e && ( n += i.charAt( entity3 ) ), o == n && ( rand = Math.floor( 4 * Math.random() ) + 1, 1 == rand ? n += a.charAt( entity1 ) : 2 == rand ? n += t.charAt( entity4 ) : 3 == rand ? n += r.charAt( entity2 ) : 4 == rand && ( n += i.charAt( entity3 ) ), o = n );
  $( "#pass_res" ).html( "Your Generated Password is  <b id='pass_g'>" + n + "</b>" )
}
function copy_item_with_id( BoxID ) {
  if ( $( "#" + BoxID ) ) {
    var copy_html = $( "#" + BoxID ).text().trim()
    setClipboard( copy_html );
  }
}
function setClipboard( value ) {
  var tempInput = document.createElement( "input" );
  tempInput.style = "position: absolute; left: -1000px; top: -1000px";
  tempInput.value = value;
  document.body.appendChild( tempInput );
  tempInput.select();
  document.execCommand( "copy" );
  document.body.removeChild( tempInput );
}
