$( document ).ready( function () {
      var wrapper = $( "#wrapper" );
      var browseButton = $( "#browse" );
      $( document ).on( "drag dragstart dragend dragover dragenter dragleave drop", function ( e ) {
      e.preventDefault();
      e.stopPropagation();
      $( wrapper ).removeClass( "d-none" );
      $( browseButton ).addClass( "d-none" );
      } )
      .on( "dragover dragenter", function () {
          $( wrapper ).removeClass( "d-none" );
          $( browseButton ).addClass( "d-none" );
        } )
        .on( "dragleave dragend drop", function () {
      //$form.removeClass('is-dragover');
    } )
    .on( "drop", function ( e ) {
      handleFileSelect( e );
    } );


  /**********************/

  if ( window.FileReader ) {

    if ( $( "#r_images" ).length > 0 ) {
      document.getElementById( "r_images" ).addEventListener( "change", function ( e ) {
        handleFileSelect( e );
      }, true );
    }


  } else {
    //the browser doesn't support the FileReader Object, so do this
    //record_activity('tool_used', t_n ,'window.FileReader support not available');

    alert( "file support not available" );
    //alert('file reader not supported in this browser');
  }
} )

function handleFileSelect( evt ) {
  var dropArea = $( "#drop-area" );
  var files = "";
  if ( $.trim( evt.target.files ) != "" ) {
    files = evt.target.files; // FileList object
  } else if ( $.trim( evt.originalEvent.dataTransfer.files ) != "" ) {
    files = evt.originalEvent.dataTransfer.files;
  }
  if ( $.trim( files ) == "" ) {
    return false;
  }
  var accept_fileTypes = [ "jpeg", "jpg" ],
    convert_to = "png";


  if ( files && files[ 0 ] ) {
    var extension = files[ 0 ].name.split( "." ).pop().toLowerCase(), //file extension from input file
      isSuccess = accept_fileTypes.indexOf( extension ) > -1; //is extension acceptable only types

    var t = files[ 0 ],
      a = t.name.indexOf( extension ) - 1;
    if ( -1 != a ) {
      var o = t.name.substring( 0, a ) + "." + convert_to;
    } else {
      o = t.name + "." + convert_to;
    }
    if ( isSuccess ) {
      for ( var i = 0, f; f = files[ i ]; i++ ) {
        var r = new FileReader();
        r.onload = function ( event ) {
          var contents = event.target.result;
          $( "#preview" ).attr( "src", contents );

          var a = new Image;
          a.onload = function () {
              var e = $( "<canvas>" )[ 0 ];
            e.width = a.width;
            e.height = a.height;
            e.getContext( "2d" ).drawImage( a, 0, 0 );
            e.toBlob( function ( e ) {
                  saveAs( e, o )
              },
              'image/png' );


          };
          a.src = r.result;
          if ( !$( "#drop-area" ).hasClass( "d-none" ) ) {
            $( "#drop-area" ).addClass( "d-none" );
          }




        };
        r.readAsDataURL( t );
      }
      record_activity( "tool_used", t_n, "Browse Button Clicked" );
      }
      else {
        alert( "File Type Not Supported" );
    }
  }
  return false;
}
