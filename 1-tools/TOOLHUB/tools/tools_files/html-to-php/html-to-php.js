function convertToPHP() {
  var html_val = $( '#input-text' ).val();
  $( '#result' ).val( '<?php\n$output = <<<OUTPUT\n' + html_val + '\nOUTPUT;\necho $output;' );
}
