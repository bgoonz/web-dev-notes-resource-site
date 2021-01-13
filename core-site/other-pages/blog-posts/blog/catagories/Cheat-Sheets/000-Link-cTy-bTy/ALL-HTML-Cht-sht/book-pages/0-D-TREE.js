

    let isCommandPressed = false;
    window.addEventListener( "keydown", ( event ) => {
      if ( event.which === 91 ) {
        isCommandPressed = true;
      }
    } );
    window.addEventListener( "keyup", ( event ) => {
      if ( event.which === 91 ) {
        isCommandPressed = false;
      }
    } );
    for ( let i = 1; i <= 14; i++ ) {
      const row = document.getElementById( `row-${i}` );
      row.addEventListener( "click", () => {
        if ( isCommandPressed ) {
          window.open( `/row-${i}`, "_blank" );
        } else {
          window.location.href = `/row-${i}`;
        }
      } );
    }

