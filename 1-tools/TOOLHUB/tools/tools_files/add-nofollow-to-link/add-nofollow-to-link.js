var _links_array = new Array();
$( document ).delegate( 'input[name="links_trace"]', "click", function () {
  if ( _links_array.indexOf( this.value ) == -1 ) {
    _links_array.push( this.value );
  } else {
    _links_array.splice( _links_array.indexOf( this.value ), 1 );
  }
} )

function check_input_val() {
  var input_html = $( '#input-text' ).val();
  if ( $.trim( input_html ) == '' ) {
    alert( 'Input Value is Empty' );
    return false;
  } else {
    return input_html;
  }
}

function conv( str ) {
  var s = str;
  var temp = document.createElement( 'html' );
  temp.innerHTML = s;
  return temp;
}

function add_no_follow_to_all() {
  var input_html = check_input_val();
  if ( !input_html ) {
    return input_html;
  }
  var a = conv( input_html );
  a.querySelectorAll( 'a' ).forEach( function ( el ) {
    el.setAttribute( 'rel', 'nofollow' );
  } )
  $( '#result' ).val( a.outerHTML );
}

function toUnicode( str ) {
  return str.split( "" ).map( function ( value, index, array ) {
    var temp = value.charCodeAt( 0 ).toString( 16 ).padStart( 4, "0" );
    if ( temp.length > 2 ) {
      return "&#x" + temp + ";";
    }
    return value;
  } ).join( "" );
}

function add_nofollow_to_these() {
  var input_html = check_input_val();
  if ( !input_html ) {
    return input_html;
  }
  var a = conv( input_html );
  _links_array.forEach( function ( k, n ) {
    a.querySelectorAll( 'a' )[ k ].setAttribute( 'rel', 'nofollow' );
  }, a )
  $( '#result' ).val( a.outerHTML );
  $( '#a_link_list' ).modal( "hide" );
}

function add_no_follow_to_some() {
  var input_html = check_input_val();
  if ( !input_html ) {
    return input_html;
  }
  var a = conv( input_html );
  var total_tags = 0;
  var _links_html = "";
  a.querySelectorAll( 'a' ).forEach( function ( el ) {
    var _el_link = el
    _el_link.setAttribute( 'target', '_blank' )
    _links_html += "<tr>" +
      "<td>" +
      "<div class='form-check'> " +
      "  <label class='form-check-label'> &nbsp;  " +
      "<input type='checkbox' name='links_trace' class='form-check-input' value='" + total_tags + "' >" +
      "  </label>" +
      "</div>" +
      "</td>" +
      "<td>" +
      toUnicode( el.outerHTML ) +
      "</td>" +
      "<td>" + _el_link.outerHTML + "</td>" +
      "</tr>";
    total_tags++;
    if ( total_tags > 10 ) {
      $( '#total_links_body' ).css( {
        "max-height": "400px",
        "overflow": "scroll"
      } );
    }
  }, total_tags );
  $( '#links_data' ).html( _links_html );
  $( '#available_links' ).html( 'Total ' + total_tags + ' Link/s ' );
  $( '#a_link_list' ).modal( "show" );
}
