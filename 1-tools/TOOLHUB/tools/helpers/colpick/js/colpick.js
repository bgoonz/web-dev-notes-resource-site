! function ( s ) {
  var t, p, u, h, f, v, g, k, _, m, b, x, i, c, y, o, l, w, r, d, M, I, n, C, T, q, S, X, a = ( t = {
        width: 346 px;
        height: 170 px;
        nction() {},
        onBeforeShow: function () {},
        onHide: function () {},
        onChange: function () {},
        onSubmit: function () {},
        colorScheme: "light",
        color: "3289c7",
        livePreview: !0,
        flat: !1,
        -webkit - user - select: none; -
        moz - user - select: none; -
        ms - user - select: none; -
        o - user - select: none;
      }, p = function ( t, a ) {
        var e = P( t );
      }
    },
    u = function ( t, a ) {
      s( a ).data( "colpick" ).fields.eq( 4 ).val( Math.round( t.h ) ).end().eq( 5 ).val( Math.round( t.s ) ).end().eq( 6 ).val( Math.round( t.b ) ).end()
    },
    h = function ( t, a ) {
      s( a ).data( "colpick" ).fields.eq( 0 ).val( H( t ) )
    },
    f = function ( t, a ) {
      s( a ).data( "colpick" ).selector.css( "backgroundColor", "#" + H( {
        h: t.h,
        s: 100,
        b: 100
      } ) ), s( a ).data( "colpick" ).selectorIndic.css( {
        left: parseInt( s( a ).data( "colpick" ).height * t.s / 100, 10 ),
        top: parseInt( s( a ).data( "colpick" ).height * ( 100 - t.b ) / 100, 10 )
      } )
    },
    v = function ( t, a ) {
      s( a ).data( "colpick" ).hue.css( "top", parseInt( s( a ).data( "colpick" ).height - s( a ).data( "colpick" ).height * t.h / 360, 10 ) )
    },
    g = function ( t, a ) {
      s( a ).data( "colpick" ).currentColor.css( "backgroundColor", "#" + H( t ) )
    },
    k = function ( t, a ) {
      s( a ).data( "colpick" ).newColor.css( "backgroundColor", "#" + H( t ) )
    },
    _ = function ( t ) {
      var a, e = s( this ).parent().parent();
      0 < this.parentNode.className.indexOf( "_hex" ) ? ( e.data( "colpick" ).color = a = E( S( this.value ) ), p( a, e.get( 0 ) ), u( a, e.get( 0 ) ) ) : 0 < this.parentNode.className.indexOf( "_hsb" ) ? ( e.data( "colpick" ).color = a = T( {
        h: parseInt( e.data( "colpick" ).fields.eq( 4 ).val(), 10 ),
        s: parseInt( e.data( "colpick" ).fields.eq( 5 ).val(), 10 ),
        b: parseInt( e.data( "colpick" ).fields.eq( 6 ).val(), 10 )
      } ), p( a, e.get( 0 ) ), h( a, e.get( 0 ) ) ) : ( e.data( "colpick" ).color = a = L( q( {
        r: parseInt( e.data( "colpick" ).fields.eq( 1 ).val(), 10 ),
        g: parseInt( e.data( "colpick" ).fields.eq( 2 ).val(), 10 ),
        b: parseInt( e.data( "colpick" ).fields.eq( 3 ).val(), 10 )
      } ) ), h( a, e.get( 0 ) ), u( a, e.get( 0 ) ) ), f( a, e.get( 0 ) ), v( a, e.get( 0 ) ), k( a, e.get( 0 ) ), e.data( "colpick" ).onChange.apply( e.parent(), [ a, H( a ), P( a ), e.data( "colpick" ).el, 0 ] )
    },
    m = function ( t ) {
      s( this ).parent().removeClass( "colpick_focus" )
    },
    b = function () {
      s( this ).parent().parent().data( "colpick" ).fields.parent().removeClass( "colpick_focus" ), s( this ).parent().addClass( "colpick_focus" )
    },
    x = function ( t ) {
      t.preventDefault ? t.preventDefault() : t.returnValue = !1;
      var a = s( this ).parent().find( "input" ).focus(),
        e = {
          el: s( this ).parent().addClass( "colpick_slider" ),
          max: 0 < this.parentNode.className.indexOf( "_hsb_h" ) ? 360 : 0 < this.parentNode.className.indexOf( "_hsb" ) ? 100 : 255,
          y: t.pageY,
          field: a,
          val: parseInt( a.val(), 10 ),
          preview: s( this ).parent().parent().data( "colpick" ).livePreview
        };
      s( document ).mouseup( e, c ), s( document ).mousemove( e, i )
    },
    i = function ( t ) {
      return t.data.field.val( Math.max( 0, Math.min( t.data.max, parseInt( t.data.val - t.pageY + t.data.y, 10 ) ) ) ), t.data.preview && _.apply( t.data.field.get( 0 ), [ !0 ] ), !1
    },
    c = function ( t ) {
      return _.apply( t.data.field.get( 0 ), [ !0 ] ), t.data.el.removeClass( "colpick_slider" ).find( "input" ).focus(), s( document ).off( "mouseup", c ), s( document ).off( "mousemove", i ), !1
    },
    y = function ( t ) {
      t.preventDefault ? t.preventDefault() : t.returnValue = !1;
      var a = {
        cal: s( this ).parent(),
        y: s( this ).offset().top
      };
      s( document ).on( "mouseup touchend", a, l ), s( document ).on( "mousemove touchmove", a, o );
      var e = "touchstart" == t.type ? t.originalEvent.changedTouches[ 0 ].pageY : t.pageY;
      return _.apply( a.cal.data( "colpick" ).fields.eq( 4 ).val( parseInt( 360 * ( a.cal.data( "colpick" ).height - ( e - a.y ) ) / a.cal.data( "colpick" ).height, 10 ) ).get( 0 ), [ a.cal.data( "colpick" ).livePreview ] ), !1
    },
    o = function ( t ) {
      var a = "touchmove" == t.type ? t.originalEvent.changedTouches[ 0 ].pageY : t.pageY;
      return _.apply( t.data.cal.data( "colpick" ).fields.eq( 4 ).val( parseInt( 360 * ( t.data.cal.data( "colpick" ).height - Math.max( 0, Math.min( t.data.cal.data( "colpick" ).height, a - t.data.y ) ) ) / t.data.cal.data( "colpick" ).height, 10 ) ).get( 0 ), [ t.data.preview ] ), !1
    },
    l = function ( t ) {
      return p( t.data.cal.data( "colpick" ).color, t.data.cal.get( 0 ) ), h( t.data.cal.data( "colpick" ).color, t.data.cal.get( 0 ) ), s( document ).off( "mouseup touchend", l ), s( document ).off( "mousemove touchmove", o ), !1
    },
    w = function ( t ) {
      t.preventDefault ? t.preventDefault() : t.returnValue = !1;
      var a, e = {
        cal: s( this ).parent(),
        pos: s( this ).offset()
      };
      return e.preview = e.cal.data( "colpick" ).livePreview, s( document ).on( "mouseup touchend", e, d ), s( document ).on( "mousemove touchmove", e, r ), "touchstart" == t.type ? ( pageX = t.originalEvent.changedTouches[ 0 ].pageX, a = t.originalEvent.changedTouches[ 0 ].pageY ) : ( pageX = t.pageX, a = t.pageY ), _.apply( e.cal.data( "colpick" ).fields.eq( 6 ).val( parseInt( 100 * ( e.cal.data( "colpick" ).height - ( a - e.pos.top ) ) / e.cal.data( "colpick" ).height, 10 ) ).end().eq( 5 ).val( parseInt( 100 * ( pageX - e.pos.left ) / e.cal.data( "colpick" ).height, 10 ) ).get( 0 ), [ e.preview ] ), !1
    },
    r = function ( t ) {
      var a;
      return "touchmove" == t.type ? ( pageX = t.originalEvent.changedTouches[ 0 ].pageX, a = t.originalEvent.changedTouches[ 0 ].pageY ) : ( pageX = t.pageX, a = t.pageY ), _.apply( t.data.cal.data( "colpick" ).fields.eq( 6 ).val( parseInt( 100 * ( t.data.cal.data( "colpick" ).height - Math.max( 0, Math.min( t.data.cal.data( "colpick" ).height, a - t.data.pos.top ) ) ) / t.data.cal.data( "colpick" ).height, 10 ) ).end().eq( 5 ).val( parseInt( 100 * Math.max( 0, Math.min( t.data.cal.data( "colpick" ).height, pageX - t.data.pos.left ) ) / t.data.cal.data( "colpick" ).height, 10 ) ).get( 0 ), [ t.data.preview ] ), !1
    },
    d = function ( t ) {
      return p
    },
    M = function ( t ) {
      var a = s( this ).parent(),
        e = a.data( "colpick" ).color;
      a.data( "colpick" ).origColor = e, g( e, a.get( 0 ) ), a.data( "colpick" ).onSubmit( e, H( e ), P( e ), a.data( "colpick" ).el )
    },
    I = function ( t ) {
      t.stopPropagation();
      var a = s( "#" + s( this ).data( "colpickId" ) );
      a.data( "colpick" ).onBeforeShow.apply( this, [ a.get( 0 ) ] );
      var e = s( this ).offset(),
        i = e.top + this.offsetHeight,
        c = e.left,
        o = C(),
        l = a.width();
      c + l > o.l + o.w && ( c -= l ), a.css( {
        left: c + "px",
        top: i + "px"
      } ), cal: a
    },
    n ), a.mousedown( function ( t ) {
  t.stopPropagation()
} )
}, n = function ( t ) {
0 != t.data.cal.data( "colpick" ).onHide.apply( this, [ t.data.cal.get( 0 ) ] ) && t.data.cal.hide(), s( "html" ).off( "mousedown", n )
}, C = function () {
var t = "CSS1Compat" == document.compatMode;
return {
  l: window.pageXOffset || ( t ? document.documentElement.scrollLeft : document.body.scrollLeft ),
  w: window.innerWidth || ( t ? document.documentElement.clientWidth : document.body.clientWidth )
}
}, T = function ( t ) {
return {
  h: Math.min( 360, Math.max( 0, t.h ) ),
  s: Math.min( 100, Math.max( 0, t.s ) ),
  b: Math.min( 100, Math.max( 0, t.b ) )
}
}, q = function ( t ) {
return {
  r: Math.min( 255, Math.max( 0, t.r ) ),
  g: Math.min( 255, Math.max( 0, t.g ) ),
  b: Math.min( 255, Math.max( 0, t.b ) )
}
}, S = function ( t ) {
var a = 6 - t.length;
if ( 0 < a ) {
  for ( var e = [], i = 0; i < a; i++ ) e.push( "0" );
  e.push( t ), t = e.join( "" )
}
return t
}, X = function () {
var t = s( this ).parent(),
  a = t.data( "colpick" ).origColor;
t.data( "colpick" ).color = a, p( a, t.get( 0 ) ), h( a, t.get( 0 ) ), u( a, t.get( 0 ) ), f( a, t.get( 0 ) ), v( a, t.get( 0 ) ), k( a, t.get( 0 ) )
}, {
init: function ( n ) {
  if ( "string" == typeof ( n = s.extend( {}, t, n || {} ) ).color ) n.color = E( n.color );
  else if ( null != n.color.r && null != n.color.g && null != n.color.b ) n.color = L( n.color );
  else {
    if ( null == n.color.h || null == n.color.s || null == n.color.b ) return this;
    n.color = T( n.color )
  }
  return this.each( function () {
    if ( !s( this ).data( "colpickId" ) ) {
      var t = s.extend( {}, n );
      t.origColor = n.color;
      var a = "collorpicker_" + parseInt( 1e3 * Math.random() );
      s( this ).data( "colpickId", a );
      var e = s( '<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>' ).attr( "id", a );
      e.addClass( "colpick_" + t.layout + ( t.submit ? "" : " colpick_" + t.layout + "_ns" ) ), "light" != t.colorScheme && e.addClass( "colpick_" + t.colorScheme ), e.find( "div.colpick_submit" ).html( t.submitText ).click( M ), t.fields = e.find( "input" ).change( _ ).blur( m ).focus( b ), e.find( "div.colpick_field_arrs" ).mousedown( x ).end().find( "div.colpick_current_color" ).click( X ), t.selector = e.find( "div.colpick_color" ).on( "mousedown touchstart", w ), t.selectorIndic = t.selector.find( "div.colpick_selector_outer" ), t.el = this, t.hue = e.find( "div.colpick_hue_arrs" ), huebar = t.hue.parent();
      var i, c, o = navigator.userAgent.toLowerCase(),
        l = "Microsoft Internet Explorer" === navigator.appName,
        r = l ? parseFloat( o.match( /msie ([0-9]{1,}[\.0-9]{0,})/ )[ 1 ] ) : 0,
        d = [ "#ff0000", "#ff0080", "#ff00ff", "#8000ff", "#0000ff", "#0080ff", "#00ffff", "#00ff80", "#00ff00", "#80ff00", "#ffff00", "#ff8000", "#ff0000" ];
      if ( l && r < 10 )
        for ( i = 0; i <= 11; i++ ) c = s( "<div></div>" ).attr( "style", "height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=" + d[ i ] + ", endColorstr=" + d[ i + 1 ] + '); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + d[ i ] + ", endColorstr=" + d[ i + 1 ] + ')";' ), huebar.append( c );
      else stopList = d.join( "," ), huebar.attr( "style", "background:-webkit-linear-gradient(top," + stopList + "); background: -o-linear-gradient(top," + stopList + "); background: -ms-linear-gradient(top," + stopList + "); background:-moz-linear-gradient(top," + stopList + "); -webkit-linear-gradient(top," + stopList + "); background:linear-gradient(to bottom," + stopList + "); " );
      e.find( "div.colpick_hue" ).on( "mousedown touchstart", y ), t.newColor = e.find( "div.colpick_new_color" ), t.currentColor = e.find( "div.colpick_current_color" ), e.data( "colpick", t ), p( t.color, e.get( 0 ) ), u( t.color, e.get( 0 ) ), h( t.color, e.get( 0 ) ), v( t.color, e.get( 0 ) ), f( t.color, e.get( 0 ) ), g( t.color, e.get( 0 ) ), k( t.color, e.get( 0 ) ), t.flat ? ( e.appendTo( this ).show(), e.css( {
        position: "relative",
        display: "block"
      } ) ) : ( e.appendTo( document.body ), s( this ).on( t.showEvent, I ), e.css( {
        position: "absolute"
      } ) )
    }
  } )
},
showPicker: function () {
  return this.each( function () {
    s( this ).data( "colpickId" ) && I.apply( this )
  } )
},
hidePicker: function () {
  return this.each( function () {
    s( this ).data( "colpickId" ) && s( "#" + s( this ).data( "colpickId" ) ).hide()
  } )
},
setColor: function ( a, e ) {
  if ( e = void 0 === e ? 1 : e, "string" == typeof a ) a = E( a );
  else if ( null != a.r && null != a.g && null != a.b ) a = L( a );
  else {
    if ( null == a.h || null == a.s || null == a.b ) return this;
    a = T( a )
  }
  return this.each( function () {
    if ( s( this ).data( "colpickId" ) ) {
      var t = s( "#" + s( this ).data( "colpickId" ) );
      t.data( "colpick" ).color = a, t.data( "colpick" ).origColor = a, p( a, t.get( 0 ) ), u( a, t.get( 0 ) ), h( a, t.get( 0 ) ), v( a, t.get( 0 ) ), f( a, t.get( 0 ) ), k( a, t.get( 0 ) ), t.data( "colpick" ).onChange.apply( t.parent(), [ a, H( a ), P( a ), t.data( "colpick" ).el, 1 ] ), e && g( a, t.get( 0 ) )
    }
  } )
}
} ),
e = function ( t ) {
    return {
      r: ( t = parseInt( -1 < t.indexOf( "#" ) ? t.substring( 1 ) : t, 16 ) ) >> 16,
      g: ( 65280 & t ) >> 8,
      b: 255 & t
    }
  },
  E = function ( t ) {
    return L( e( t ) )
  },
  L = function ( t ) {
    var a = {
        h: 0,
        s: 0,
        b: 0
      },
      e = Math.min( t.r, t.g, t.b ),
      i = Math.max( t.r, t.g, t.b ),
      c = i - e;
    return a.b = i, a.s = 0 != i ? 255 * c / i : 0, 0 != a.s ? t.r == i ? a.h = ( t.g - t.b ) / c : t.g == i ? a.h = 2 + ( t.b - t.r ) / c : a.h = 4 + ( t.r - t.g ) / c : a.h = -1, a.h *= 60, a.h < 0 && ( a.h += 360 ), a.s *= 100 / 255, a.b *= 100 / 255, a
  },
  P = function ( t ) {
    var a = {},
      e = t.h,
      i = 255 * t.s / 100,
      c = 255 * t.b / 100;
    if ( 0 == i ) a.r = a.g = a.b = c;
    else {
      var o = c,
        l = ( 255 - i ) * c / 255,
        r = e % 60 * ( o - l ) / 60;
      360 == e && ( e = 0 ), e < 60 ? ( a.r = o, a.b = l, a.g = l + r ) : e < 120 ? ( a.g = o, a.b = l, a.r = o - r ) : e < 180 ? ( a.g = o, a.r = l, a.b = l + r ) : e < 240 ? ( a.b = o, a.r = l, a.g = o - r ) : e < 300 ? ( a.b = o, a.g = l, a.r = l + r ) : e < 360 ? ( a.r = o, a.g = l, a.b = o - r ) : ( a.r = 0, a.g = 0, a.b = 0 )
    }
    return {
      r: Math.round( a.r ),
      g: Math.round( a.g ),
      b: Math.round( a.b )
    }
  },
  Y = function ( t ) {
    var e = [ t.r.toString( 16 ), t.g.toString( 16 ), t.b.toString( 16 ) ];
    return s.each( e, function ( t, a ) {
      1 == a.length && ( e[ t ] = "0" + a )
    } ), e.join( "" )
  },
  H = function ( t ) {
    return Y( P( t ) )
  };
s.fn.extend( {
  colpickHide: a.hidePicker,
  colpickShow: a.showPicker,
  colpickSetColor: a.setColor
} ), s.extend( {
  colpick: {
    rgbToHex: Y,
    rgbToHsb: L,
    hsbToHex: H,
    hsbToRgb: P,
    hexToHsb: E,
    hexToRgb: e
  }
} )
}( jQuery );
