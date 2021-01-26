var cMeditor1, jsHintInit;
$( document ).ready( function () {


  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    value: "function myScript(){return 100;}\n",
    mode: "javascript",
    lineNumbers: true,
    tabSize: 2,
    indentUnit: 2,
    lineNumbers: !0,
    indentWithTabs: !1
  } );

  var t = null;
  cMeditor1.on( "change", function ( e ) {
    t && clearTimeout( t ), t = setTimeout( function () {
      t = null, validateJs( null );
    }, 200 );
  } );
  jsHintInit = {
    opts: {
      forin: !0,
      noarg: !0,
      bitwise: !0,
      nonew: !0,
      strict: !1,
      browser: !0,
      devel: !0,
      node: !1,
      jquery: !1,
      esnext: !1,
      moz: !1,
      es3: !1,
      couch: !1,

    },
    rev: {
      eqnull: !0,
      debug: !0,
      boss: !0,
      evil: !0,
      loopfunc: !0,
      laxbreak: !0
    }
  }

  var optionsSample = [ "opts", "rev" ];

  $( optionsSample ).each( function ( k, v ) {
        if ( $.inArray( v, optionsSample ) > -1 ) {

      $( 'input[name ="' + v + '"]' ).each( function () {
            if ( $.inArray( this.value, jsHintInit[ v ] ) ) {
              if ( typeof jsHintInit[ v ][ this.value ] !== "undefined" && jsHintInit[ v ][ this.value ] == true ) {
                $( this ).attr( 'checked', true );
          }
        }
      } );
    }
  } );
  $( ".plus-minus" ).click( function () {
        var ch = $( this ).children();
        if ( $( ch ).find( "i" ).length > 0 ) {
          var p = $( ch ).find( "i" );
          if ( p.hasClass( "icon-plus" ) ) {
            $( p ).removeClass( "icon-plus" );
            $( p ).addClass( "icon-minus" );
          } else {
            $( p ).addClass( "icon-plus" );
            $( p ).removeClass( "icon-minus" );
      }
    }
  } );
  if ( window.FileReader ) {

    if ( $( '#filesJs' ).length > 0 ) {
      document.getElementById( 'filesJs' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'html', 'txt', 'js' ];

        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
          if ( isSuccess ) {
            for ( var i = 0, f; f = files[ i ]; i++ ) {
              var reader = new FileReader();
              reader.onload = function ( event ) {
                var contents = event.target.result;
                cMeditor1.setValue( contents );
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
}, cMeditor1, jsHintInit );

function highlight( highLightEvent ) {

  e = highLightEvent.dataset.line;
  cMeditor1.setSelection( {
    line: e - 1,
    ch: 0
  }, {
    line: e - 1,
    ch: 1 / 0
  } );
  $( highLightEvent ).on( "mouseout", function () {
        cMeditor1.setCursor( {
      line: e - 1,
      ch: 0
    } )
    } );
};
function showUndef( e ) {
  if ( typeof e == "undefined" ) {
    $( "#undef" ).addClass( "d-none" );
    return false;
  } else {
    if ( $( "#undef" ).hasClass( "d-none" ) ) {
      $( "#undef" ).removeClass( "d-none" );
    }
  }
  var udfCount = e.length;
  var udfHeading = 'One undefined variable';
  if ( udfCount > 1 ) {
    udfHeading = udfCount + ' undefined variables';
  };
  $( "#undefHeading" ).html( udfHeading );
  var udfhtml = '';
  var udfLoopCount = 1;
  $( e ).each( function ( i, v ) {
    udfhtml += "<div class='col-lg-12' data-line='" + v.line + "' onmouseover='highlight(this)'>" + udfLoopCount + ") " + v.name + "</div>";
    udfLoopCount++;
  } );
  $( "#udefContainer" ).html( udfhtml );
}

function showUnused( e ) {

  if ( typeof e == "undefined" ) {
    $( "#unused" ).addClass( "d-none" );
    return false;
  } else {
    if ( $( "#unused" ).hasClass( "d-none" ) ) {
      $( "#unused" ).removeClass( "d-none" );
    }
  }
  var unusedCount = e.length;
  var unusedHeading = 'ONE unused variable';
  if ( unusedCount > 1 ) {
    unusedHeading = unusedCount + ' unused variables';
  };
  $( "#unusedHeading" ).html( unusedHeading );
  var udfhtml = '';
  var udfLoopCount = 1;
  $( e ).each( function ( i, v ) {
    udfhtml += "<div class='col-lg-12' data-line='" + v.line + "' onmouseover='highlight(this)'>" + udfLoopCount + ") " + v.name + "</div>";
    udfLoopCount++;
  } );
  $( "#unusedContainer" ).html( udfhtml );
}
function show_result( e ) {
  $( "#result" ).removeClass( "d-none" );
  showUndef( e.implieds );
  showUnused( e.unused );
  showErrors( e.errors );
}
function showErrors( e ) {
  if ( typeof e == "undefined" ) {
    $( "#errors" ).addClass( "d-none" );
    return false;
  } else {
    if ( $( "#errors" ).hasClass( "d-none" ) ) {
      $( "#errors" ).removeClass( "d-none" );
    }
  }
  var eCount = e.length;
  var erHeading = 'One warning';
  if ( eCount > 1 ) {
    erHeading = eCount + ' warning';
  };
  $( "#erHeading" ).html( erHeading );
  var erhtml = '';
  var eLoopCount = 1;
  $( e ).each( function ( i, v ) {
        erhtml += "<div class='col-lg-12' data-line='" + v.line + "' onmouseover='highlight(this)'>" + eLoopCount + ") " + v.reason + "</div>";
    eLoopCount++;
  } );
  $( "#eRContainer" ).html( erhtml );
}
function validateJs( options ) {
  var e = cMeditor1.getValue();
  prefs = jsHintInit;

  var e = cMeditor1.getValue();
  var source = e;
  JSHINT( source, prefs.opts, prefs.rev );

  show_result( JSHINT.data() );
}
function update() {
  var optionsSample = [ "rev", "opts" ];

  $( optionsSample ).each( function ( k, v ) {
        if ( $.inArray( v, optionsSample ) > -1 ) {

      $( 'input[name ="' + v + '"]' ).each( function () {
            if ( this.checked ) {
              if ( $.inArray( this.value, jsHintInit[ v ] ) ) {
                jsHintInit[ v ][ this.value ] = true;
          }
        } else {
          jsHintInit[ v ][ this.value ] = false;
        }

      } );
    }
  } );
  var g = $.trim( $( '#globals' ).val() );
  gA = g.split( "," );
  if ( gA.length > 0 ) {
    $( gA ).each( function ( i, v ) {
          if ( $.trim( v ) != '' ) {
            jsHintInit[ "rev" ][ v ] = true;
      }
    } );
  }

  validateJs();
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
              cMeditor1.setValue( e );
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
