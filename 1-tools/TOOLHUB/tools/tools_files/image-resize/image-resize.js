var mxHeight, mxWidth, checkWarnings, imageData, imageName;
$( document ).ready( function () {
  checkWarnings = true;
  imageData = '';
  $( 'input[type="file"]' ).on( "change", function () {
    let emVal = '';
    $( '#img64 #img64Ext #dToken' ).val( emVal );
    checkWarnings = true;
    var input = $( this ),
      label = input.val().replace( /\\/g, '/' ).replace( /.*\//, '' );
    let filenames = [];
    let fi = document.getElementById( "fileUpload" ).files;
    var fileName, fileExtension;
    if ( fi.length > 0 ) {
      fileName = fi.item( 0 ).name;
      imageName = fileName
      fileExtension = fileName.replace( /^.*\./, '' );
      if ( fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' ) {
        readImageFile( fi.item( 0 ), fileName );
      }
      for ( let i in fi ) {
        if ( fi.hasOwnProperty( i ) ) {
          filenames.push( fi[ i ].name );
        }
      }
    }
    $( this ).next( ".custom-file-label" ).html( filenames.join( "," ) );
  } );
  $( '#percentValue' ).keyup( function () {
    updateRange();
  } )

  function readImageFile( file, fileName ) {
    var reader = new FileReader();
    reader.onload = function ( e ) {
      var img = new Image();
      imageData = e.target.result;
      imageName = fileName;
      img.src = e.target.result;
      $( img ).addClass( "rounded" )
      img.onload = function () {
        mxWidth = this.width;
        mxHeight = this.height;
        $( '#width' ).val( mxWidth );
        $( '#height' ).val( mxHeight );
        $( '#preserveWidth' ).val( mxWidth );
        $( '#preserveHeight' ).val( mxHeight );
        img.width = 200;
        img.height = 200;
        $( '#sample_img' ).html( img );
        $( '#filename' ).html( 'Name: ' + file.name );
        $( '#dimensions' ).html( 'Dimension: ' + mxWidth + 'X' + mxHeight );
        $( '#size' ).html( 'Size: ' + Math.round( ( file.size / 1024 ) ) + 'KB' );
        $( '#downloadBtn' ).removeClass( 'd-none' );
      }
    };
    reader.readAsDataURL( file );
  }
  $( '#downLoadLink' ).click( function () {
    let percentValue = $( '#percentValue' ).val()
    let uHeightValue = $( '#height' ).val();
    let uWidthValue = $( '#width' ).val();
    let selected_type = $( 'input[name=resize-method][type=radio]:checked' ).val();
    let uploadImage = true
    let fi = document.getElementById( "fileUpload" ).files;
    if ( fi.length < 1 ) {
      let alertText = "<strong>Alert!</strong> Please Select An Image To Upload.";
      $( '#alertDangerText' ).html( alertText );
      $( '#alertDanger' ).modal( 'show' );
      uploadImage = false;
    }
    if ( $.trim( selected_type ) == 'percent' ) {
      if ( isNaN( percentValue ) ) {
        let alertText = "<strong>Alert!</strong> Please enter a Numeric value in PercentAge Field.";
        $( '#alertDangerText' ).html( alertText );
        $( '#alertDanger' ).modal( 'show' );
        uploadImage = false;
      }
      if ( !isNaN( percentValue ) && $.trim( percentValue ) > 100 && checkWarnings ) {
        let warningText = "<strong>Warning!</strong> The Entered PercentAge Value Exceeds 100. Are you sure to continue.";
        $( '#alertWarningText' ).html( warningText );
        $( '#alertWarning' ).modal( 'show' );
        uploadImage = false;
      }
    }
    if ( $.trim( selected_type ) == 'dimensions' ) {
      if ( isNaN( uHeightValue ) ) {
        let alertText = "<strong>Alert!</strong> Please enter a Numeric value in Height Field.";
        $( '#alertDangerText' ).html( alertText );
        $( '#alertDanger' ).modal( 'show' );
        uploadImage = false;
      } else if ( isNaN( uWidthValue ) ) {
        let alertText = "<strong>Alert!</strong> Please enter a Numeric value in Width Field.";
        $( '#alertDangerText' ).html( alertText );
        $( '#alertDanger' ).modal( 'show' );
        uploadImage = false;
      }
      if ( !isNaN( uHeightValue ) && $.trim( uHeightValue ) > mxHeight && checkWarnings ) {
        let warningText = "<strong>Warning!</strong> The Entered Height Exceeds the Original Height of Image. Are you sure to continue.";
        $( '#alertWarningText' ).html( warningText );
        $( '#alertWarning' ).modal( 'show' );
        uploadImage = false;
      } else if ( !isNaN( uWidthValue ) && $.trim( uWidthValue ) > mxWidth && checkWarnings ) {
        let warningText = "<strong>Warning!</strong> The Entered Width Exceeds the Original Width of Image. Are you sure to continue.";
        $( '#alertWarningText' ).html( warningText );
        $( '#alertWarning' ).modal( 'show' );
        uploadImage = false;
      }
    }
    if ( uploadImage ) {
      let percentValue = $( '#percentValue' ).val();
      let uHeightValue = $( '#height' ).val();
      let uWidthValue = $( '#width' ).val();
      let preserveWidthValue = $( '#preserveWidth' ).val();
      let preserveHeightValue = $( '#preserveHeight' ).val();
      let finalWidth = '';
      let finalHeight = '';
      if ( $.trim( selected_type ) == 'dimensions' ) {
        if ( uHeightValue.trim() != '' && uWidthValue.trim() != '' ) {
          finalHeight = uHeightValue.trim();
          finalWidth = uWidthValue.trim();
        } else if ( uHeightValue.trim() != '' ) {
          finalHeight = uHeightValue.trim();
          finalWidth = Math.round( ( preserveWidthValue / preserveHeightValue ) * finalHeight );
        } else if ( uWidthValue.trim() != '' ) {
          finalWidth = uWidthValue.trim();
          finalHeight = Math.round( ( preserveHeightValue / preserveWidthValue ) * finalWidth );
        }
      } else if ( $.trim( selected_type ) == 'percent' ) {
        $p = percentValue.trim();
        finalHeight = Math.round( preserveHeightValue * ( $p / 100 ) );
        finalWidth = Math.round( preserveWidthValue * ( $p / 100 ) );
      }
      if ( finalWidth != '' && finalHeight != '' ) {
        let input = document.querySelector( '#fileUpload' );
        if ( input.files && input.files[ 0 ] ) {
          var reader = new FileReader();
          reader.onload = function ( e ) {
            const img = new Image();
            img.src = reader.result;
            file = input.files[ 0 ];
            let ImgNameArr = file.name.split( '.' );
            let fileNameNoExtension = ImgNameArr[ 0 ];
            let ext = ImgNameArr[ ImgNameArr.length - 1 ];
            img.onload = () => {
              const elem = document.createElement( 'canvas' );
              elem.width = finalWidth;
              elem.height = finalHeight;
              const ctx = elem.getContext( '2d' );
              ctx.drawImage( img, 0, 0, finalWidth, finalHeight );
              const a = document.createElement( "a" );
              a.style.display = "none";
              document.body.appendChild( a );
              a.href = elem.toDataURL( 'image/png' );
              let newFileName = fileNameNoExtension + ' (' + finalWidth + ' x ' + finalHeight + ').' + ext;
              a.setAttribute( "download", newFileName );
              a.click();
              document.body.removeChild( a );
            }, reader.onerror = error => console.log( error );
          };
          reader.readAsDataURL( input.files[ 0 ] );
        }
      }
    }
  } );
} );

function showView( e ) {
  if ( $.trim( e ) == 'percent' ) {
    $( '#dimensionsSection' ).addClass( 'd-none' );
    $( '#percentSection' ).removeClass( 'd-none' );
  }
  if ( $.trim( e ) == 'dimensions' ) {
    $( '#percentSection' ).addClass( 'd-none' );
    $( '#dimensionsSection' ).removeClass( 'd-none' );
  }
}

function updatePercentValue() {
  let cRange = $( '#compressRange' ).val();
  $( '#percentValue' ).val( cRange );
}

function updateRange() {
  let cRange = $( '#percentValue' ).val();
  $( '#compressRange' ).val( cRange );
}

function SF() {
  checkWarnings = false;
  $( '#alertWarning' ).modal( 'hide' );
  $( '#submit' ).click();
}
