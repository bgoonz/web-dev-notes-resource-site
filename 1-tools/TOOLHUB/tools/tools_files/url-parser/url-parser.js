function parse() {
  var uri, parser;
  let s = $( "#input-text" ).val();
  uri = new URI( s ).duplicateQueryParameters( true );

  parser = new Array();

  $( "#scheme" ).text( uri.scheme() );
  $( "#protocol" ).text( uri.protocol() );
  $( "#hostname" ).text( uri.hostname() );

  parser[ "Scheme" ] = uri.scheme();
  parser[ "Protocol" ] = uri.protocol();
  parser[ "Hostname" ] = uri.hostname();

  if ( uri.directory() ) {
    parser[ "Directory" ] = uri.directory();
  }

  if ( uri.resource() ) {
    parser[ "Resource" ] = uri.resource();
  }

  if ( uri.host() ) {
    parser[ "Host" ] = uri.host();
  }

  if ( uri.userinfo() ) {
    parser[ "Userinfo" ] = uri.userinfo();
  }

  if ( uri.authority() ) {
    parser[ "Authority" ] = uri.authority();
  }

  if ( uri.username() ) {
    parser[ "Username" ] = uri.username();
  }

  if ( uri.password() ) {
    parser[ "Password" ] = uri.password();
  }

  if ( uri.port() ) {
    parser[ "Port" ] = uri.port();
  }

  if ( uri.subdomain() ) {
    parser[ "Subdomain" ] = uri.subdomain();
  }

  if ( uri.domain() ) {
    parser[ "Domain" ] = uri.domain();
  }

  if ( uri.tld() ) {
    parser[ "Tld" ] = uri.tld();
  }

  if ( uri.path() ) {
    parser[ "Path" ] = uri.path();
  }

  if ( uri.filename() ) {
    parser[ "Filename" ] = uri.filename();
  }

  if ( uri.suffix() ) {
    parser[ "Filesuffix" ] = uri.suffix();
  }

  if ( uri.query() ) {
    parser[ "Query" ] = uri.query();
  }

  if ( uri.hash() ) {
    parser[ "Hash" ] = uri.hash();
  }

  $( "#urlData" ).html( "" );
  $( "#urlData" ).append( "<table class=\"table table-dark table-hover\">" );
  $( "#urlData table" ).append( "<tr><th colspan=\"2\">Url Details</th></tr>" );
  let tr_count = 2;
  for ( var index in parser ) {
    $( "#urlData table" ).append( "<tr><td></td><td></td></tr>" );
    $( "#urlData table tr:nth-child(" + tr_count + ") td:nth-child(1)" ).text( index );
    $( "#urlData table tr:nth-child(" + tr_count + ") td:nth-child(2)" ).text( parser[ index ] );
    tr_count++;

  }

  $( "#urlData table" ).append( "<tr><th colspan=\"2\">Query String</th></tr>" );
  $.each( uri.query( true ), function ( i, n ) {

    if ( $.isArray( n ) ) {
      for ( var j = 0; j < n.length; j++ ) {
        $( "#urlData table" ).append( "<tr><td>" + i + '\'[' + j + ']' + "</td><td>" + n[ j ] + "</td></tr>" );
      }

    } else {
      $( "#urlData table" ).append( "<tr><td>" + i + "</td><td>" + n + "</td></tr>" );

    }

  } );


}
