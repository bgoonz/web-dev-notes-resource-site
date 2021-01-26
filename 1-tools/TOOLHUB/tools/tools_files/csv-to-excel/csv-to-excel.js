function convertToExcel() {
  let o, n, s;
  o = $( '#input-text' ).val(),
    n = null,
    s = null;

  if ( $.trim( o ) == '' ) return false;
  for ( var r = ( n = o ).split( /\r\n|\n/ ), i = r[ 0 ].split( "," ), a = [], c = 1; c < r.length; c++ )
    if ( ( o = r[ c ].split( "," ) ).length == i.length ) {
      for ( var f = {}, v = 0; v < i.length; v++ ) f[ i[ v ] ] = o[ v ];
      [].push( f ), a.push( f );
    }
  n = csvToExcel( a, i, !0, "excel" );


}

function csvToExcel( e, t, o, i ) {
  var fn, dl, wb, elt, arr = [],
    flag = !0,
    a, n;

  a = t.toString().replace( /,/g, "\t" ), n = "<table id='dTable'><tbody>";



  if ( $.each( e, function ( e, t ) {
        var o, t;
      n += '<tr>';
      for ( o in t ) n += '<td>' + t[ o ] + '</td>';
      n += '</tr>';
    } ), null != o && o );
    n += '</tbody></table>';
    $( '#hiddenTable' ).html( n );

  elt = document.getElementById( 'dTable' );
  wb = XLSX.utils.table_to_book( elt, {
    sheet: "Sheet JS"
  } );
  XLSX.writeFile( wb, fn || ( 'test.' + ( 'xls' || 'xlsx' ) ) );

}

function loadJsData() {

  if ( typeof ajax_uri === undefined ) {
    return false;
  }

  var url = $( '#url' ).val();
  var btn = $( '#loadJsUrl' );

  var ajax_url = ajax_uri;
  if ( $.trim( url ) != '' ) {

    $.ajax( {
          url: ajax_url,
      type: "POST",
      data: {
        'link': url
      },
      beforeSend: function () {
          $( btn ).removeAttr( 'onclick' );
          $( btn ).html( '<span class="icon icon-cog icon-spin"></span> Loading ' );
          $( btn ).attr( 'disabled', true );
          $( btn ).addClass( 'btn-disabled' );
      },

      success: function ( data, textStatus, xhr ) {
          if ( $.trim( data ) != '' ) {
            var loadurl = $( '#url' ).val();
          var obj = '';
          try {
            obj = $.parseJSON( data );
            if ( "success" in obj ) {

              $( '#loadFromUrl' ).modal( "hide" );
              var e = obj.success;

              $( '#input-text' ).val( e );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
              }
              else if ( "danger" in obj ) {
                alert( 'Unable To Read Url' );
                var loadurl = $( '#url' ).val();
                record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsData()' );
            $( btn ).html( 'Load From Url' );
            }
            catch ( error ) {
              record_activity( 'tool_used', t_n, 'Error : Unable to decode response of url ' + loadurl );

          }
        }
      },
      complete: function ( xhr, textStatus ) {
          if ( '' != $.trim( xhr.status ) ) {
            record_activity( 'tool_used', t_n, 'Ajax request response ' + xhr.status );
        }

      }
    } );
  }
}



$( document ).ready( function () {
      if ( window.FileReader ) {

        if ( $( '#filesJs' ).length > 0 ) {
          document.getElementById( 'filesJs' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object
        var ignore_fileTypes = [ 'csv' ];
        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
          if ( isSuccess ) {
            for ( var i = 0, f; f = files[ i ]; i++ ) {
              var reader = new FileReader();
              reader.onload = function ( event ) {
                var contents = event.target.result;
                $( '#input-text' ).val( contents );
              };
              reader.readAsText( f );
            }
            record_activity( 'tool_used', t_n, 'Browse Button Clicked' )
            }
            else {
              alert( 'File Type Not Supported' );
          }
        }
        return false;
      }
    }
  } else {
    record_activity( 'tool_used', t_n, 'window.FileReader support not available' );
    alert( 'file support not available' );

  }

} );
