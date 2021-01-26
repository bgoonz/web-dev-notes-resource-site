let forDomains = '';
let forUrls = '';
$( document ).ready( function () {
      forDomains = CodeMirror.fromTextArea( document.getElementById( "forDomains" ), {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
  } );
  forDomains.setSize( null, 500 );
  forUrls = CodeMirror.fromTextArea( document.getElementById( "forUrls" ), {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
  } );
  forUrls.setSize( null, 500 );
  if ( window.FileReader ) {
    if ( $( '#load_domains' ).length > 0 ) {
      document.getElementById( 'load_domains' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'txt' ];

        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
          if ( isSuccess ) {
            for ( var i = 0, f; f = files[ i ]; i++ ) {
              var reader = new FileReader();
              reader.onload = function ( event ) {
                let collect_domains = '';
                let allDomains = event.target.result;
                if ( allDomains.trim() != '' ) {
                  let allDomains_array = allDomains.replace( /\r/g, '' ).split( '\n' );
                  allDomains_array.forEach( element => {
                        if ( element.trim() != '' ) {
                      let user_domain = element.trim();
                      if ( user_domain.indexOf( 'domain:' ) >= 0 ) {
                        if ( collect_domains != '' ) collect_domains += '\n';
                        collect_domains += user_domain.replace( 'domain:', '' );
                      }
                      if ( user_domain.indexOf( '#' ) >= 0 ) {
                        if ( collect_domains != '' ) collect_domains += '\n';
                        collect_domains += user_domain;
                      }
                    }
                  } );

                }

                forDomains.setValue( collect_domains );
              };
              reader.readAsText( f );
            }
            record_activity( 'tool_used', t_n, 'Browse Button Clicked' )
          } else {
            alert( 'File Type Not Supported' );
          }
        }
        return false;
      }
    }
    if ( $( '#load_urls' ).length > 0 ) {
      document.getElementById( 'load_urls' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'txt' ];

        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
          if ( isSuccess ) {
            for ( var i = 0, f; f = files[ i ]; i++ ) {
              var reader = new FileReader();
              reader.onload = function ( event ) {
                let collect_urls = '';
                let allDomains = event.target.result;
                if ( allDomains.trim() != '' ) {
                  let allUrlsArray = allDomains.replace( /\r/g, '' ).split( '\n' );

                  allUrlsArray.forEach( element => {
                        if ( element.trim() != '' ) {
                      let user_domain = element.trim();

                      if ( user_domain.indexOf( 'domain:' ) < 0 ) {
                        if ( collect_urls != '' ) collect_urls += '\n';
                        collect_urls += user_domain;
                      }


                    }
                  } );

                }

                forUrls.setValue( collect_urls );
              };
              reader.readAsText( f );
            }
            record_activity( 'tool_used', t_n, 'Browse Button Clicked' )
          } else {
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

function genDisavowFile() {
  let collectFileData = '#' + window.location.href + '\n';
  let allDomains = forDomains.getValue();
  let collect_domains = '';
  let downloadFile = false;

  if ( allDomains.trim() != '' ) {
    let allDomains_array = allDomains.replace( /\r/g, '' ).split( '\n' );
    let uniqueDomainsRecords = []
    allDomains_array.forEach( element => {
          if ( element.trim() != '' ) {
        let user_domain = element.trim();
        if ( user_domain.indexOf( 'domain:' ) >= 0 ) {
          user_domain = user_domain.replace( 'domain:', '' );
        }
        if ( user_domain.indexOf( '#' ) >= 0 ) {
          if ( collect_domains != '' ) collect_domains += '\n';
          collect_domains += user_domain;
          downloadFile = true;
        } else {
          if ( !user_domain.match( /(http|https):\/\// ) ) {
            user_domain = "http://" + user_domain;
          }
          let nUrl = new URL( user_domain );

          let host_only = nUrl.host;
          if ( !uniqueDomainsRecords.includes( host_only ) ) {
            if ( collect_domains != '' ) collect_domains += '\n';
            collect_domains += 'domain:' + nUrl.host;
            uniqueDomainsRecords.push( host_only )
            downloadFile = true;
          }
        }
      }
    } );
    if ( collect_domains.trim() != '' ) {
      collectFileData += '#Domains to disavow\n' + collect_domains;
    }
  }

  let allUrls = forUrls.getValue();
  if ( allUrls.trim() != '' ) {
    let collectURLs = '';
    allUrls_array = allUrls.replace( /\r/g, '' ).split( '\n' );
    let uniqueUrlRecords = [];
    allUrls_array.forEach( element => {
          let singleUrl = element.trim();
          if ( singleUrl != '' && !uniqueUrlRecords.includes( singleUrl ) ) {
            if ( collectURLs != '' ) collectURLs += '\n';
        collectURLs += singleUrl;
        uniqueUrlRecords.push( singleUrl )
      }
    } )
    if ( collectURLs != '' ) {
      if ( collect_domains.trim() != '' ) {
        collectFileData += '\n';
      }
      collectFileData += '#Pages to disavow\n' + collectURLs;
      downloadFile = true;
    }
  }
  if ( downloadFile ) {
    // Start file download.
    let siteNameOpt = $( '#siteNameOpt' ).val();
    let text_file_name = 'google_disavow.txt';
    if ( siteNameOpt.trim() != '' ) {
      let file_name = siteNameOpt.replace( /([^a-zA-Z0-9-_.]+)/g, '' );
      text_file_name = file_name + '_' + text_file_name;
    }
    download( text_file_name, `${collectFileData}` );
  }
}

function download( filename, text ) {
  var element = document.createElement( 'a' );
  element.setAttribute( 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( text ) );
  element.setAttribute( 'download', filename );
  element.style.display = 'none';
  document.body.appendChild( element );
  element.click();
  document.body.removeChild( element );
}
