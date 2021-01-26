var Site = {
  populateNameField: true,

  setupObfuscator: function () {
      $( '#emailAddr' ).on( 'keyup', Site.handleEmailChanged );
      $( '#linkText' ).on( 'keyup', Site.handleNameChanged );
      $( '#result' ).on( 'focus', Site.handleCodeFocussed );

    $( '#emailAddr' ).focus();
    Site.doObfuscation();
  },

  handleEmailChanged: function () {
    // By default, we copy the email into the name field
    // (until the user manually changes the name field)
    if ( Site.populateNameField ) {
      $( '#linkText' ).val( $( '#emailAddr' ).val() );
    }

    Site.doObfuscation();
  },

  handleNameChanged: function ( event ) {
    // If the user is tabbing into the field we don't want to do anything
    if ( event.key == 'tab' ) {
      return;
    }
    Site.populateNameField = false;
    Site.doObfuscation();
  },

  handleCodeFocussed: function () {
    // Make it select all
    $( '#result' ).select();
  },

  doObfuscation: function () {
    // If email is empty or default
    if ( $( '#emailAddr' ).val() == '' ) {
      $( '#result' ).val( '' );
      $( '#preview' ).html( '(write something above)' );
      return;
    }

    // If name is empty or default
    if ( $( '#linkText' ).val() == '' ) {
      $( '#result' ).val( '' );

      Site.populateNameField = true;
      $( '#preview' ).html( '(write something above)' );
      return;
    }

    var email_obfuscated = Site.obfuscate( $( '#emailAddr' ).val() );

    var name = $( '#linkText' ).val();
    var name_obfuscated = '<script type="text/javascript">document.write(\'' + Site.obfuscate( name ) + '\')<\/script>';
    $( '#preview' ).html( '<a href="javascript:location=\'mailto:' + email_obfuscated + '\';void 0">' + name + '</a>' );
    $( '#result' ).val( '<a href="javascript:location=\'mailto:' + email_obfuscated + '\';void 0">' + ( name.indexOf( '@' ) >= 0 ? name_obfuscated : name ) + '</a>' );
  },

  obfuscate: function ( plaintext ) {
    var obfuscated = '';

    for ( var i = 0; i < plaintext.length; i++ ) {
      obfuscated += '\\u00' + plaintext.charCodeAt( i ).toString( 16 );
    }

    return obfuscated;
  }
};
$( 'document' ).ready( Site.setupObfuscator );
