function nextNearest( value, number ) {
  remainder = value % number;
  if ( remainder > 0 ) {
    value = ( value - remainder ) + number;
  }
  return value;
}
function resetFields() {
  $( "#avg_page_size,#avg_daily_visitor,#avg_pages_per_visit" ).val( "" );
  $( "#avg_page_size,#avg_daily_visitor,#avg_pages_per_visit" ).removeClass( "is-invalid" );
};
function calculatebw() {

  var avg_page_size, avg_daily_visitor, avg_pages_per_visit, daily_quota, monthly_quota, suggest_monthly_quota, est_monthly_quota;

  avg_page_size = $.trim( $( "#avg_page_size" ).val() );
  avg_daily_visitor = $.trim( $( "#avg_daily_visitor" ).val() );
  avg_pages_per_visit = $.trim( $( "#avg_pages_per_visit" ).val() );

  if ( avg_page_size == "" || isNaN( avg_page_size ) || avg_page_size < 0 ) {
    $( "#avg_page_size" ).focus().addClass( "is-invalid" );
    return false;
  } else {
    $( "#avg_page_size" ).removeClass( "is-invalid" );
  }

  if ( avg_daily_visitor == "" || isNaN( avg_daily_visitor ) || avg_daily_visitor < 0 ) {
    $( "#avg_daily_visitor" ).focus().addClass( "is-invalid" );;
    return false;
  } else {
    $( "#avg_daily_visitor" ).removeClass( "is-invalid" );
  }

  if ( avg_pages_per_visit == "" || isNaN( avg_pages_per_visit ) || avg_pages_per_visit < 0 ) {
    $( "#avg_pages_per_visit" ).focus().addClass( "is-invalid" );
    return false;
  } else {
    $( "#avg_pages_per_visit" ).removeClass( "is-invalid" );
  }

  daily_quota = avg_page_size * avg_daily_visitor * avg_pages_per_visit;
  monthly_quota = daily_quota * 30;

  if ( monthly_quota >= 1000000 ) {
    suggest_monthly_quota = nextNearest( ( monthly_quota / 1000000 ), .5 ) + ' TB';
    est_monthly_quota = ( monthly_quota / 1000000 ).toFixed( 2 ) + ' TB';
  } else if ( monthly_quota >= 1000 ) {
    suggest_monthly_quota = Math.ceil( ( monthly_quota / 1000 ) ) + ' GB';
    est_monthly_quota = ( monthly_quota / 1000 ).toFixed( 2 ) + ' GB';
  } else if ( ( monthly_quota < 1000 ) && ( monthly_quota > 500 ) ) {
    suggest_monthly_quota = '1 GB';
    est_monthly_quota = monthly_quota + ' MB';
  } else if ( ( monthly_quota < 500 ) && ( monthly_quota != 0 ) ) {
    suggest_monthly_quota = '500 MB';
    est_monthly_quota = monthly_quota + ' MB';
  } else if ( ( monthly_quota == 0 ) ) {
    suggest_monthly_quota = '0 MB';
    est_monthly_quota = monthly_quota + ' MB';
  }

  $( "div.out" ).html( "<span class='data_out'>Your estimated monthly bandwidth quota is <strong>" + est_monthly_quota + "</strong>. <br/>You can start using <strong>" + suggest_monthly_quota + "</strong> bandwidth plan first.</span>" );
  $( "div.out" ).removeClass( "d-none" );

};
