$( document ).ready( function () {
      $( "#start_date" ).datepicker( {
    format: 'yyyy-mm-dd',
    autoPick: true
    } );

  $( "#end_date" ).datepicker( {
    format: 'yyyy-mm-dd',
    autoPick: true
    } );
    } )


function calculate_date() {
  var start_date = $( "#start_date" ).datepicker( 'getDate', true );

  var end_date = $( "#end_date" ).datepicker( 'getDate', true );

  var start_d_c = new Date( start_date );
  var end_d_c = new Date( end_date );

  if ( start_d_c.getTime() > end_d_c.getTime() ) {
    start_d_c = new Date( end_date );
    end_d_c = new Date( start_date );
  }


  if ( $( '#resultContainer' ).hasClass( 'd-none' ) ) {
    $( '#resultContainer' ).removeClass( 'd-none' );
  }
  var resultData = getAge( start_d_c, end_d_c );

  for ( var key in resultData ) {
    if ( resultData.hasOwnProperty( key ) ) {
      $( "#" + key ).html( resultData[ key ] );
    }
  }
}

function getAge( date_1, date_2 ) {

  //convert to UTC
  var date2_UTC = new Date( Date.UTC( date_2.getUTCFullYear(), date_2.getUTCMonth(), date_2.getUTCDate() ) );
  var date1_UTC = new Date( Date.UTC( date_1.getUTCFullYear(), date_1.getUTCMonth(), date_1.getUTCDate() ) );


  var yAppendix, mAppendix, dAppendix, r, tdays, tweeks, tweeksText, _hour, _hourText, _min, _minText, from_date, to_date;


  //--------------------------------------------------------------
  var days = date2_UTC.getDate() - date1_UTC.getDate();
  if ( days < 0 ) {
    date2_UTC.setMonth( date2_UTC.getMonth() - 1 );
    days += DaysInMonth( date2_UTC );
  }
  //--------------------------------------------------------------
  var months = date2_UTC.getMonth() - date1_UTC.getMonth();
  if ( months < 0 ) {
    date2_UTC.setFullYear( date2_UTC.getFullYear() - 1 );
    months += 12;
  }
  //--------------------------------------------------------------
  var years = date2_UTC.getFullYear() - date1_UTC.getFullYear();





  if ( years > 1 ) yAppendix = " Years";
  else yAppendix = " Year";
  if ( months > 1 ) mAppendix = " Months";
  else mAppendix = " Month";
  if ( days > 1 ) dAppendix = " Days";
  else dAppendix = " Day";



  r = '';
  if ( years > 0 ) r += years + yAppendix;
  if ( months > 0 ) {
    if ( $.trim( r ) != '' ) r += ' , ';
    r += months + mAppendix;
  }

  if ( days > 0 ) {
    if ( $.trim( r ) != '' ) r += ' and ';
    r += days + dAppendix;
  } else if ( years == 0 && months == 0 && days == 0 ) r = "Both Dates Are Same";
  tdays = Math.round( Math.abs( ( date_2.getTime() - date_1.getTime() ) / ( 1000 * 60 * 60 * 24 ) ) )
  tweeks = Math.floor( tdays / 7 );
  tweeksText = ( tweeks > 0 ) ? " Weeks" : " Week";

  dAppendix = ( days > 1 ) ? " days" : " day";


  _hour = tdays * 24;
  _hourText = ( _hour > 1 ) ? " Hours" : " Hour";

  _min = tdays * 1440 + ""
  _minText = ( _min > 1 ) ? " Minutes" : " Minute";

  from_date = date_1.toDateString();

  to_date = date_2.toDateString();

  return {
    res: r,
      yy: years + " <strong> " + yAppendix + "</strong>",
      mm: months + " <strong> " + mAppendix + "</strong>",
      weeks: tweeks + " <strong>" + tweeksText + "</strong>",
      dd: days + " <strong> " + dAppendix + "</strong>",
      sec: tdays * 86400 + " <strong> Seconds</strong>",
      min: _min + " <strong>" + _minText + "</strong>",
      hou: _hour + " <strong>" + _hourText + "</strong>",
      from: "From Date : " + from_date,
      to: "To Date, But not Include : " + to_date,

  }



}


function DaysInMonth( date2_UTC ) {
  var monthStart = new Date( date2_UTC.getFullYear(), date2_UTC.getMonth(), 1 );
  var monthEnd = new Date( date2_UTC.getFullYear(), date2_UTC.getMonth() + 1, 1 );
  var monthLength = ( monthEnd - monthStart ) / ( 1000 * 60 * 60 * 24 );
  return monthLength;
}
