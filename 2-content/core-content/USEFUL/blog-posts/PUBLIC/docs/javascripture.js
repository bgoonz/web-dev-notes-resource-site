
"use strict";

var asyncFunctionsSupported = false;

try {
  asyncFunctionsSupported = eval('!!(async()=>1)()');
}
catch(e) {
}

var apiSets = [['Audio',
['AnalyserNode','fftSize','frequencyBinCount','maxDecibels','minDecibels','smoothingTimeConstant','getByteFrequencyData','getByteTimeDomainData','getFloatFrequencyData']
,['AudioBuffer','duration','length','numberOfChannels','sampleRate','getChannelData']
,['AudioBufferSourceNode','buffer','loop','loopEnd','loopStart','playbackRate','start','stop','onended']
,['AudioContext','currentTime','destination','listener','sampleRate','createAnalyser','createBiquadFilter','createBuffer','createBufferSource','createChannelMerger','createChannelSplitter','createConvolver','createDelay','createDynamicsCompressor','createGain','createMediaElementSource','createMediaStreamDestination','createMediaStreamSource','createOscillator','createPanner','createPeriodicWave','createScriptProcessor','createWaveShaper','decodeAudioData']
,['AudioDestinationNode','maxChannelCount']
,['AudioListener','dopplerFactor','speedOfSound','setOrientation','setPosition','setVelocity']
,['AudioNode','channelCount','channelCountMode','channelInterpretation','context','numberOfInputs','numberOfOutputs','connect','disconnect']
,['AudioParam','defaultValue','value','cancelScheduledValues','exponentialRampToValueAtTime','linearRampToValueAtTime','setTargetAtTime','setValueAtTime','setValueCurveAtTime']
,['AudioProcessingEvent','inputBuffer','outputBuffer','playbackTime']
,['BiquadFilterNode','detune','frequency','gain','Q','type','getFrequencyResponse']
,['ChannelMergerNode']
,['ChannelSplitterNode']
,['ConvolverNode','buffer','normalize']
,['DelayNode','delayTime']
,['DynamicsCompressorNode','attack','knee','ratio','reduction','release','threshold']
,['GainNode','gain']
,['MediaElementAudioSourceNode']
,['MediaStreamAudioDestinationNode','stream']
,['MediaStreamAudioSourceNode']
,['OfflineAudioCompletionEvent','renderedBuffer']
,['OfflineAudioContext','startRendering','oncomplete']
,['OscillatorNode','detune','frequency','type','setPeriodicWave','start','stop','onended']
,['PannerNode','coneInnerAngle','coneOuterAngle','coneOuterGain','distanceModel','maxDistance','panningModel','refDistance','rolloffFactor','setOrientation','setPosition','setVelocity']
,['PeriodicWave']
,['ScriptProcessorNode','bufferSize','onaudioprocess']
,['WaveShaperNode','curve','oversample']],
['Browser',
['ApplicationCache','status','swapCache','update','oncached','onchecking','ondownloading','onerror','onnoupdate','onprogress','onupdateready','CHECKING','DOWNLOADING','IDLE','UNCACHED','UPDATEREADY']
,['BeforeUnloadEvent','returnValue']
,['External','AddSearchProvider','IsSearchProviderInstalled']
,['FormData','append']
,['HashChangeEvent','newURL','oldURL']
,['History','length','state','back','forward','go','pushState','replaceState']
,['Location','hash','host','hostname','href','origin','password','pathname','port','protocol','search','username','assign','reload','replace']
,['MessageChannel','port1','port2']
,['MessageEvent','data','lastEventId','origin','ports','source']
,['MessagePort','close','postMessage','start','onmessage']
,['Navigator','clipboard','maxTouchPoints','xr','getGamepads','getUserMedia']
,['PopStateEvent','state']
,['PromiseRejectionEvent','promise']
,['Screen','availHeight','availWidth','colorDepth','height','pixelDepth','width']
,['Storage','length','clear','getItem','key','removeItem','setItem']
,['StorageEvent','key','newValue','oldValue','storageArea','url']
,['Transferable']
,['URLSearchParams','append','delete','get','getAll','has','set']
,['Window','applicationCache','crypto','customElements','document','external','frameElement','frames','globalThis','history','indexedDB','innerHeight','innerWidth','length','localStorage','location','name','navigator','opener','outerHeight','outerWidth','pageXOffset','pageYOffset','parent','screen','screenX','screenY','scrollX','scrollY','self','sessionStorage','status','top','window','alert','atob','blur','btoa','cancelAnimationFrame','clearInterval','clearTimeout','close','confirm','createImageBitmap','fetch','focus','getComputedStyle','matchMedia','open','postMessage','print','prompt','requestAnimationFrame','setInterval','setTimeout','showModalDialog','stop','onabort','onafterprint','onbeforeprint','onbeforeunload','onblur','oncanplay','oncanplaythrough','onchange','onclick','oncontextmenu','oncopy','oncuechange','oncut','ondblclick','ondrag','ondragend','ondragenter','ondragleave','ondragover','ondragstart','ondrop','ondurationchange','onemptied','onended','onerror','onfocus','ongamepadconnected','ongamepaddisconnected','onhashchange','oninput','oninvalid','onkeydown','onkeypress','onkeyup','onload','onloadeddata','onloadedmetadata','onloadstart','onmessage','onmousedown','onmousemove','onmouseout','onmouseover','onmouseup','onmousewheel','onoffline','ononline','onpagehide','onpageshow','onpaste','onpause','onplay','onplaying','onpopstate','onprogress','onratechange','onreset','onresize','onscroll','onseeked','onseeking','onselect','onshow','onstalled','onstorage','onsubmit','onsuspend','ontimeupdate','onunhandledrejection','onunload','onvolumechange']
,['XMLHttpRequest','readyState','response','responseText','responseType','responseXML','status','statusText','timeout','upload','withCredentials','abort','getAllResponseHeaders','getResponseHeader','open','overrideMimeType','send','setRequestHeader','onabort','onerror','onload','onloadend','onloadstart','onprogress','onreadystatechange','ontimeout','DONE','HEADERS_RECEIVED','LOADING','OPENED','UNSENT']
,['XMLHttpRequestUpload','onabort','onerror','onload','onloadend','onloadstart','onprogress']],
['CSS',
['Counter','identifier','listStyle','separator']
,['CSSCharsetRule','encoding']
,['CSSFontFaceRule','style']
,['CSSImportRule','href','media','styleSheet']
,['CSSMediaRule','cssRules','media','deleteRule','insertRule']
,['CSSPageRule','selectorText','style']
,['CSSPrimitiveValue','primitiveType','getCounterValue','getFloatValue','getRectValue','getRGBColorValue','getStringValue','setFloatValue','setStringValue','CSS_ATTR','CSS_CM','CSS_COUNTER','CSS_DEG','CSS_DIMENSION','CSS_EMS','CSS_EXS','CSS_GRAD','CSS_HZ','CSS_IDENT','CSS_IN','CSS_KHZ','CSS_MM','CSS_MS','CSS_NUMBER','CSS_PC','CSS_PERCENTAGE','CSS_PT','CSS_PX','CSS_RAD','CSS_RECT','CSS_RGBCOLOR','CSS_S','CSS_STRING','CSS_UNKNOWN','CSS_URI']
,['CSSRule','cssText','parentRule','parentStyleSheet','type','CHARSET_RULE','FONT_FACE_RULE','IMPORT_RULE','MEDIA_RULE','PAGE_RULE','STYLE_RULE','UNKNOWN_RULE']
,['CSSRuleList','length','item']
,['CSSStyleDeclaration','alignContent','alignItems','alignmentBaseline','alignSelf','all','animation','animationDelay','animationDirection','animationDuration','animationFillMode','animationIterationCount','animationName','animationPlayState','animationTimingFunction','backfaceVisibility','background','backgroundAttachment','backgroundBlendMode','backgroundClip','backgroundColor','backgroundImage','backgroundOrigin','backgroundPosition','backgroundPositionX','backgroundPositionY','backgroundRepeat','backgroundRepeatX','backgroundRepeatY','backgroundSize','baselineShift','blockSize','border','borderBlockEnd','borderBlockEndColor','borderBlockEndStyle','borderBlockEndWidth','borderBlockStart','borderBlockStartColor','borderBlockStartStyle','borderBlockStartWidth','borderBottom','borderBottomColor','borderBottomLeftRadius','borderBottomRightRadius','borderBottomStyle','borderBottomWidth','borderCollapse','borderColor','borderImage','borderImageOutset','borderImageRepeat','borderImageSlice','borderImageSource','borderImageWidth','borderInlineEnd','borderInlineEndColor','borderInlineEndStyle','borderInlineEndWidth','borderInlineStart','borderInlineStartColor','borderInlineStartStyle','borderInlineStartWidth','borderLeft','borderLeftColor','borderLeftStyle','borderLeftWidth','borderRadius','borderRight','borderRightColor','borderRightStyle','borderRightWidth','borderSpacing','borderStyle','borderTop','borderTopColor','borderTopLeftRadius','borderTopRightRadius','borderTopStyle','borderTopWidth','borderWidth','bottom','boxDecorationBreak','boxShadow','boxSizing','bufferedRendering','captionSide','clear','clip','clipPath','clipRule','color','colorInterpolation','colorInterpolationFilters','colorProfile','colorRendering','content','counterIncrement','counterReset','cssFloat','cssText','cursor','cx','cy','direction','display','dominantBaseline','emptyCells','enableBackground','fill','fillOpacity','fillRule','filter','flex','flexBasis','flexDirection','flexFlow','flexGrow','flexShrink','flexWrap','float','floodColor','floodOpacity','font','fontFamily','fontFeatureSettings','fontKerning','fontLanguageOverride','fontSize','fontSizeAdjust','fontStretch','fontStyle','fontSynthesis','fontVariant','fontVariantAlternates','fontVariantCaps','fontVariantEastAsian','fontVariantLigatures','fontVariantNumeric','fontVariantPosition','fontWeight','glyphOrientationHorizontal','glyphOrientationVertical','height','hyphens','imageOrientation','imageRendering','imeMode','inlineSize','isolation','justifyContent','kerning','left','length','letterSpacing','lightingColor','lineHeight','listStyle','listStyleImage','listStylePosition','listStyleType','margin','marginBlockEnd','marginBlockStart','marginBottom','marginInlineEnd','marginInlineStart','marginLeft','marginRight','marginTop','marker','markerEnd','markerMid','markerOffset','markerStart','mask','maskType','maxBlockSize','maxHeight','maxInlineSize','maxWidth','maxZoom','minBlockSize','minHeight','minInlineSize','minWidth','minZoom','mixBlendMode','motion','motionOffset','motionPath','motionRotation','objectFit','objectFit','objectPosition','objectPosition','offsetBlockEnd','offsetBlockStart','offsetInlineEnd','offsetInlineStart','opacity','order','orientation','orphans','outline','outlineColor','outlineOffset','outlineStyle','outlineWidth','overflow','overflowWrap','overflowX','overflowY','padding','paddingBlockEnd','paddingBlockStart','paddingBottom','paddingInlineEnd','paddingInlineStart','paddingLeft','paddingRight','paddingTop','page','pageBreakAfter','pageBreakBefore','pageBreakInside','paintOrder','parentRule','perspective','perspectiveOrigin','pointerEvents','position','quotes','r','resize','right','rubyAlign','rubyPosition','rx','ry','scrollBehavior','scrollSnapCoordinate','scrollSnapDestination','scrollSnapPointsX','scrollSnapPointsY','scrollSnapType','scrollSnapTypeX','scrollSnapTypeY','shapeImageThreshold','shapeMargin','shapeOutside','shapeRendering','size','speak','src','stopColor','stopOpacity','stroke','strokeDasharray','strokeDashoffset','strokeLinecap','strokeLinejoin','strokeMiterlimit','strokeOpacity','strokeWidth','tableLayout','tabSize','textAlign','textAnchor','textDecoration','textDecorationColor','textDecorationLine','textDecorationStyle','textIndent','textLineThrough','textLineThroughColor','textLineThroughMode','textLineThroughStyle','textLineThroughWidth','textOrientation','textOverflow','textOverline','textOverlineColor','textOverlineMode','textOverlineStyle','textOverlineWidth','textRendering','textShadow','textTransform','textUnderline','textUnderlineColor','textUnderlineMode','textUnderlineStyle','textUnderlineWidth','top','touchAction','transform','transformBox','transformOrigin','transformStyle','transition','transitionDelay','transitionDuration','transitionProperty','transitionTimingFunction','unicodeBidi','unicodeRange','userZoom','vectorEffect','verticalAlign','visibility','whiteSpace','widows','width','willChange','wordBreak','wordSpacing','wordWrap','writingMode','x','y','zIndex','zoom','getPropertyValue','setPropertyValue']
,['CSSStyleRule','selectorText','style']
,['CSSStyleSheet','cssRules','ownerRule','deleteRule','insertRule']
,['CSSValue','cssText','cssValueType','CSS_CUSTOM','CSS_INHERIT','CSS_PRIMITIVE_VALUE','CSS_VALUE_LIST']
,['CSSValueList','length','item']
,['MediaQueryList','matches','media','addListener','removeListener','onchange']
,['Rect','bottom','left','right','top']
,['RGBColor','blue','green','red']
,['StyleSheet','disabled','href','media','ownerNode','parentStyleSheet','title','type']
,['StyleSheetList','length','item']],
['Canvas',
['CanvasCaptureMediaStreamTrack','canvas','requestFrame']
,['CanvasGradient','addColorStop']
,['CanvasPattern']
,['CanvasRenderingContext']
,['CanvasRenderingContext2D','canvas','fillStyle','font','globalAlpha','globalCompositeOperation','lineCap','lineDashOffset','lineJoin','lineWidth','miterLimit','shadowBlur','shadowColor','shadowOffsetX','shadowOffsetY','strokeStyle','textAlign','textBaseline','arc','arcTo','beginPath','bezierCurveTo','clearRect','clip','closePath','createImageData','createLinearGradient','createPattern','createRadialGradient','drawImage','fill','fillRect','fillText','getImageData','getTransform','isPointInPath','lineTo','measureText','moveTo','putImageData','quadraticCurveTo','rect','restore','rotate','save','scale','setLineDash','setTransform','stroke','strokeRect','strokeText','transform','translate']
,['ImageBitmap','height','width','close']
,['ImageBitmapRenderingContext','canvas','transferFromImageBitmap']
,['ImageData','data','height','width']
,['TextMetrics','width']],
['Clipboard',
['Clipboard','read','readText','write','writeText']
,['ClipboardEvent','clipboardData']
,['ClipboardItem','delayed','lastModified','presentationStyle','types','getType','createDelayed']],
['Components',
['CustomElementPrototype','adoptedCallback','attributeChangedCallback','connectedCallback','disconnectedCallback']
,['CustomElementRegistry','define','get','whenDefined']
,['HTMLContentElement','select','getDistributedNodes']
,['HTMLShadowElement','getDistributedNodes']
,['ShadowRoot','activeElement','host','innerHTML','olderShadowRoot','styleSheets','elementFromPoint','getElementsByClassName','getElementsByTagName','getElementsByTagNameNS','getSelection']],
['Crypto',
['Crypto','subtle','getRandomValues']
,['SubtleCrypto','decrypt','deriveBits','deriveKey','digest','encrypt','exportKey','generateKey','importKey','sign','unwrapKey','verify','wrapKey']],
['DOM',
['AbortController','signal','abort']
,['AbortSignal','aborted','onabort']
,['Attr','localName','name','namespaceURI','prefix','value']
,['CharacterData','data','length','appendData','deleteData','insertData','remove','replaceData','substringData']
,['Comment']
,['CompositionEvent','data','locale']
,['Document','activeElement','body','characterSet','compatMode','contentType','cookie','doctype','documentElement','documentURI','fullscreenElement','fullscreenEnabled','implementation','pointerLockElement','readyState','styleSheets','title','URL','adoptNode','append','createComment','createDocumentFragment','createElement','createElementNS','createEvent','createNodeIterator','createProcessingInstruction','createRange','createTextNode','createTreeWalker','exitFullscreen','exitPointerLock','getElementById','getElementsByClassName','getElementsByTagName','getElementsByTagNameNS','hasFocus','importNode','prepend','querySelector','querySelectorAll','onabort','oncopy','oncut','onfullscreenchange','onfullscreenerror','onload','onpaste','onpointerlockchange','onpointerlockerror','onreadystatechange','ontouchcancel','ontouchend','ontouchmove','ontouchstart']
,['DocumentFragment','querySelector','querySelectorAll']
,['DocumentType']
,['DOMImplementation','createCSSStyleSheet','createDocument','createDocumentType','createHTMLDocument','hasFeature']
,['DOMParser','parseFromString']
,['DOMStringMap']
,['DOMTokenList','length','value','add','contains','item','remove','replace','toggle']
,['Element','attributes','childElementCount','children','classList','className','clientHeight','clientLeft','clientTop','clientWidth','dataset','firstElementChild','id','lastElementChild','localName','namespaceURI','nextElementSibling','prefix','previousElementSibling','scrollHeight','scrollLeft','scrollTop','scrollWidth','shadowRoot','tagName','append','createShadowRoot','getAttribute','getAttributeNS','getBoundingClientRect','getClientRects','getDestinationInsertionPoints','getElementsByClassName','getElementsByTagName','getElementsByTagNameNS','hasAttribute','hasAttributeNS','hasAttributes','prepend','querySelector','querySelectorAll','releasePointerCapture','removeAttribute','removeAttributeNS','replaceChildren','requestFullscreen','requestPointerLock','scrollIntoView','setAttribute','setAttributeNS','setPointerCapture','oncopy','oncut','onfullscreenchange','onfullscreenerror','ongotpointercapture','onlostpointercapture','onpaste','onpointercancel','onpointerdown','onpointerenter','onpointerleave','onpointermove','onpointerout','onpointerover','onpointerup','ontouchcancel','ontouchend','ontouchmove','ontouchstart']
,['Event','bubbles','cancelable','currentTarget','defaultPrevented','eventPhase','isTrusted','target','timeStamp','type','preventDefault','stopImmediatePropagation','stopPropagation','AT_TARGET','BUBBLING_PHASE','CAPTURING_PHASE','NONE']
,['EventListener','handleEvent']
,['EventTarget','addEventListener','dispatchEvent','removeEventListener']
,['FocusEvent','view','initUIEvent','detail']
,['HTMLAnchorElement','hash','host','hostname','href','hreflang','media','pathname','port','protocol','rel','relList','search','target','text','type']
,['HTMLBaseElement','href','target']
,['HTMLBodyElement','onafterprint','onbeforeprint','onbeforeunload','onblur','onerror','onfocus','onhashchange','onload','onmessage','onoffline','ononline','onpagehide','onpageshow','onpopstate','onresize','onscroll','onstorage','onunload']
,['HTMLBRElement']
,['HTMLButtonElement','autofocus','disabled','form','formAction','formEnctype','formMethod','formNoValidate','formTarget','labels','name','type','validationMessage','validity','value','willValidate','checkValidity','setCustomValidity']
,['HTMLCanvasElement','height','width','captureStream','getContext','toBlob','toDataURL']
,['HTMLCollection','length','item','namedItem']
,['HTMLDivElement']
,['HTMLDListElement']
,['HTMLElement','accessKey','accessKeyLabel','classList','className','commandChecked','commandDisabled','commandHidden','commandIcon','commandLabel','commandType','contentEditable','contextMenu','dir','draggable','dropzone','hidden','innerHTML','isContentEditable','lang','offsetHeight','offsetLeft','offsetParent','offsetTop','offsetWidth','outerHTML','spellcheck','style','tabIndex','title','blur','click','focus','insertAdjacentHTML','scrollIntoView','onabort','onblur','onchange','onclick','oncompositionend','oncompositionstart','oncompositionupdate','oncontextmenu','ondblclick','ondrag','ondragend','ondragenter','ondragleave','ondragover','ondragstart','ondrop','onerror','onfocus','onfocusin','onfocusout','oninput','oninvalid','onkeydown','onkeypress','onkeyup','onload','onloadeddata','onloadedmetadata','onloadstart','onmousedown','onmouseenter','onmouseleave','onmousemove','onmouseout','onmouseover','onmouseup','onmousewheel','onresize','onscroll','onselect','onunload','onwheel']
,['HTMLEmbedElement','height','src','type','width']
,['HTMLFormControlsCollection']
,['HTMLFormElement','acceptCharset','action','autocomplete','elements','encoding','enctype','length','method','name','noValidate','target','checkValidity','reset','submit','onsubmit']
,['HTMLHeadElement']
,['HTMLHeadingElement']
,['HTMLHRElement']
,['HTMLHtmlElement']
,['HTMLIFrameElement','allowFullscreen','contentDocument','contentWindow','height','name','sandbox','seamless','src','srcdoc','width']
,['HTMLImageElement','alt','complete','height','naturalHeight','naturalWidth','src','width','onload']
,['HTMLInputElement','accept','alt','autocomplete','autofocus','checked','defaultChecked','defaultValue','dirName','disabled','files','form','formAction','formEnctype','formMethod','formNoValidate','formTarget','height','indeterminate','labels','list','max','maxLength','min','multiple','name','pattern','placeholder','readOnly','required','selectionDirection','selectionEnd','selectionStart','size','src','step','type','validationMessage','validity','value','valueAsDate','valueAsNumber','width','willValidate','checkValidity','select','setCustomValidity','setSelectionRange','stepDown','stepUp']
,['HTMLLIElement','value']
,['HTMLLinkElement','disabled','href','hreflang','media','rel','relList','sizes','type']
,['HTMLMenuElement']
,['HTMLMetaElement','content','httpEquiv','name']
,['HTMLModElement','cite','dateTime']
,['HTMLOListElement','reversed','start','type']
,['HTMLOptGroupElement','disabled','label']
,['HTMLOptionElement','defaultSelected','disabled','form','index','label','selected','text','value']
,['HTMLOptionsCollection','length','selectedIndex','add','remove']
,['HTMLParagraphElement']
,['HTMLPreElement']
,['HTMLQuoteElement','cite']
,['HTMLScriptElement','async','charset','defer','src','text','type','type']
,['HTMLSelectElement','autofocus','checkValidity','disabled','form','labels','length','multiple','name','options','required','selectedIndex','selectedOptions','size','type','validationMessage','validity','value','willValidate','add','remove','setCustomValidity']
,['HTMLSlotElement','name','assignedElements','assignedNodes','onslotchange']
,['HTMLSpanElement']
,['HTMLStyleElement','disabled','media','scoped','sheet','type']
,['HTMLTableCellElement','cellIndex','colSpan','headers','rowSpan']
,['HTMLTableElement','border','caption','createTBody','rows','sortable','tBodies','tFoot','tHead','createCaption','createTFoot','createTHead','deleteCaption','deleteRow','deleteTFoot','deleteTHead','insertRow','stopSorting']
,['HTMLTableRowElement','cells','rowIndex','sectionRowIndex','deleteCell','insertCell']
,['HTMLTimeElement','datetime']
,['HTMLTitleElement','text']
,['HTMLUListElement']
,['Image']
,['InputEvent','data','isComposing']
,['IntersectionObserver','root','rootMargin','thresholds','disconnect','observe','takeRecords','unobserve']
,['IntersectionObserverEntry','boundingClientRect','intersectionRatio','intersectionRect','isIntersecting','rootBounds','target','time']
,['KeyboardEvent','altKey','charCode','ctrlKey','keyCode','location','metaKey','repeat','shiftKey','which','DOM_KEY_LOCATION_LEFT','DOM_KEY_LOCATION_NUMPAD','DOM_KEY_LOCATION_RIGHT','DOM_KEY_LOCATION_STANDARD']
,['MouseEvent','altKey','button','buttons','clientX','clientY','ctrlKey','metaKey','movementX','movementY','offsetX','offsetY','pageX','pageY','relatedTarget','screenX','screenY','shiftKey','x','y','getModifierState']
,['MutationObserver','disconnect','observe','takeRecords']
,['MutationRecord','addedNodes','attributeName','attributeNamespace','nextSibling','oldValue','previousSibling','removedNodes','target','type']
,['Node','baseURI','childNodes','firstChild','lastChild','nextSibling','nodeName','nodeType','nodeValue','ownerDocument','parentElement','parentNode','previousSibling','textContent','appendChild','cloneNode','compareDocumentPosition','contains','hasChildNodes','insertBefore','isDefaultNamespace','isEqualNode','lookupNamespaceURI','lookupPrefix','normalize','removeChild','replaceChild','ATTRIBUTE_NODE','CDATA_SECTION_NODE','COMMENT_NODE','DOCUMENT_FRAGMENT_NODE','DOCUMENT_NODE','DOCUMENT_POSITION_CONTAINED_BY','DOCUMENT_POSITION_CONTAINS','DOCUMENT_POSITION_DISCONNECTED','DOCUMENT_POSITION_FOLLOWING','DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC','DOCUMENT_POSITION_PRECEDING','DOCUMENT_TYPE_NODE','ELEMENT_NODE','ENTITY_NODE','ENTITY_REFERENCE_NODE','NOTATION_NODE','PROCESSING_INSTRUCTION_NODE','TEXT_NODE']
,['NodeFilter','acceptNode','FILTER_ACCEPT','FILTER_REJECT','FILTER_SKIP','SHOW_ALL','SHOW_ATTRIBUTE','SHOW_CDATA_SECTION','SHOW_COMMENT','SHOW_DOCUMENT','SHOW_DOCUMENT_FRAGMENT','SHOW_DOCUMENT_TYPE','SHOW_ELEMENT','SHOW_ENTITY','SHOW_ENTITY_REFERENCE','SHOW_NOTATION','SHOW_PROCESSING_INSTRUCTION','SHOW_TEXT']
,['NodeIterator']
,['NodeList','length','item']
,['Option']
,['PointerEvent','height','isPrimary','pointerId','pointerType','pressure','tiltX','tiltY','width']
,['ProcessingInstruction']
,['ProgressEvent','lengthComputable','loaded','total']
,['Range','collapsed','commonAncestorContainer','endContainer','endOffset','startContainer','startOffset','cloneContents','cloneRange','collapse','compareBoundaryPoints','deleteContents','detach','extractContents','insertNode','selectNode','selectNodeContents','setEnd','setEndAfter','setEndBefore','setStart','setStartAfter','setStartBefore','surroundContents','END_TO_END','END_TO_START','START_TO_END','START_TO_START']
,['ResizeObserver','disconnect','observe','unobserve']
,['ResizeObserverEntry','contentRect','target']
,['Text','wholeText','splitText']
,['Touch','clientX','clientY','identifier','pageX','pageY','screenX','screenY','target']
,['TouchEvent','altKey','changedTouches','ctrlKey','metaKey','shiftKey','targetTouches','touches']
,['TouchList','length','item']
,['TreeWalker']
,['UIEvent','view','initUIEvent','detail']
,['ValidityState','customError','patternMismatch','rangeOverflow','rangeUnderflow','stepMismatch','tooLong','typeMismatch','valid','valueMissing']
,['XMLDocument']
,['XMLSerializer','serializeToString']],
['DragDrop',
['DataTransfer','dropEffect','effectAllowed','items','setDragImage']
,['DataTransferItem','kind','type','getAsFile','getAsString']
,['DataTransferItemList','length','add','clear','remove']
,['DragEvent','dataTransfer']],
['Fetch',
['Headers','append','delete','get','getAll','has','set']
,['Request','bodyUsed','cache','credentials','destination','headers','integrity','isHistoryNavigation','isReloadNavigation','keepalive','method','mode','redirect','referrer','referrerPolicy','signal','url','arrayBuffer','blob','clone','formData','json','text']
,['Response','body','headers','ok','redirected','status','statusText','trailer','type','url','arrayBuffer','blob','clone','formData','json','text','error','redirect']],
['FileAPI',
['Blob','size','type','arrayBuffer','slice','stream','text']
,['File','lastModifiedDate','name']
,['FileList','length','item']
,['FileReader','error','readyState','result','abort','readAsArrayBuffer','readAsDataURL','readAsText','onabort','onerror','onload','onloadend','onloadstart','onprogress','DONE','EMPTY','LOADING']
,['FileReaderSync','readAsArrayBuffer','readAsText']
,['URL','createObjectURL','revokeObjectURL']],
['Gamepad',
['Gamepad','axes','buttons','connected','id','index','mapping','timestamp']
,['GamepadButton','pressed','touched','value']
,['GamepadEvent','gamepad']],
['Geometry',
['DOMMatrix','a','b','c','d','e','f','m11','m12','m13','m14','m21','m22','m23','m24','m31','m32','m33','m34','m41','m42','m43','m44','invertSelf','multiplySelf','preMultiplySelf','rotateAxisAngleSelf','rotateFromVectorSelf','rotateSelf','scale3DSelf','scaleSelf','setValue','skewXSelf','skewY','translateSelf','fromFloat32Array','fromFloat64Array','fromMatrix']
,['DOMMatrixReadOnly','a','b','c','d','e','f','is2D','isIdentity','m11','m12','m13','m14','m21','m22','m23','m24','m31','m32','m33','m34','m41','m42','m43','m44','flipX','flipY','inverse','multiply','rotate','rotateAxisAngle','rotateFromVector','scale','scale3D','scaleNonUniform','skewX','skewY','toFloat32Array','toFloat64Array','transformPoint','translate','fromFloat32Array','fromFloat64Array','fromMatrix']
,['DOMPoint','w','x','y','z','fromPoint']
,['DOMPointReadOnly','w','x','y','z','fromPoint','matrixTransform']
,['DOMQuad','p1','p2','p3','p4','getBounds','fromQuad','fromRect']
,['DOMRect','height','width','x','y','fromRect']
,['DOMRectList','length','item']
,['DOMRectReadOnly','bottom','height','left','right','top','width','x','y','fromRect']],
['IndexedDB',
['IDBFactory','deleteDatabase','open','cmp']
,['IDBOpenDBRequest','onblocked','onupgradeneeded']
,['IDBRequest','error','readyState','result','source','transaction','onerror','onsuccess']],
['JavaScript',
['Array','length','concat','copyWithin','entries','every','fill','filter','find','findIndex','flat','flatMap','forEach','includes','indexOf','join','keys','lastIndexOf','map','pop','push','reduce','reduceRight','reverse','shift','slice','some','sort','splice','unshift','values','from','isArray','of']
,['AsyncIterable']
,['AsyncIterator','next','return','throw']
,['BigInt','asIntN','asUintN']
,['Boolean','toString']
,['Collator','compare','resolvedOptions','supportedLocalesOf']
,['Date','getDate','getDay','getFullYear','getHours','getMilliseconds','getMinutes','getMonth','getSeconds','getTime','getTimezoneOffset','getUTCDate','getUTCDay','getUTCFullYear','getUTCHours','getUTCMilliseconds','getUTCMinutes','getUTCMonth','getUTCSeconds','setDate','setFullYear','setHours','setMilliseconds','setMinutes','setMonth','setSeconds','setTime','setUTCDate','setUTCFullYear','setUTCHours','setUTCMilliseconds','setUTCMinutes','setUTCMonth','setUTCSeconds','toDateString','toISOString','toJSON','toLocaleDateString','toLocaleString','toLocaleTimeString','toTimeString','toUTCString','valueOf','now','parse','UTC']
,['DateTimeFormat','format','resolvedOptions','supportedLocalesOf']
,['Error','message','name']
,['Function','length','prototype','apply','bind','call']
,['Global','globalThis','Infinity','NaN','undefined','decodeURI','decodeURIComponent','encodeURI','encodeURIComponent','eval','isFinite','isNaN','parseFloat','parseInt']
,['Intl','Collator','DateTimeFormat','NumberFormat']
,['Iterable']
,['Iterator','next']
,['JSON','parse','stringify']
,['Map','size','clear','delete','entries','forEach','get','has','keys','set','values']
,['Math','E','LN10','LN2','LOG10E','LOG2E','PI','SQRT1_2','SQRT2','abs','acos','acosh','asin','asinh','atan','atan2','atanh','cbrt','ceil','clz','cos','cosh','exp','expm1','floor','fround','hypot','imul','log','log10','log1p','log2','max','min','pow','random','round','sign','sin','sinh','sqrt','tan','tanh','trunc']
,['Number','toExponential','toFixed','toLocaleString','toPrecision','toString','EPSILON','MAX_SAFE_INTEGER','MAX_VALUE','MIN_SAFE_INTEGER','MIN_VALUE','NaN','NEGATIVE_INFINITIY','POSITIVE_INFINITIY','isFinite','isInteger','isNaN','isSafeInteger','parseFloat','parseInt']
,['NumberFormat','format','resolvedOptions','supportedLocalesOf']
,['Object','constructor','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','toLocaleString','toString','valueOf','create','defineProperties','defineProperty','entries','freeze','fromEntries','getOwnPropertyDescriptor','getOwnPropertyDescriptors','getOwnPropertyNames','getOwnPropertySymbols','getPrototypeOf','is','isExtensible','isFrozen','isSealed','keys','preventExtensions','seal','values']
,['Promise','catch','finally','then','all','allSettled','race','reject','resolve']
,['PropertyDescriptor','configurable','enumerable','get','set','value','writable']
,['Proxy','revocable']
,['ProxyHandler','apply','construct','defineProperty','deleteProperty','enumerate','get','getOwnPropertyDescriptor','has','isExtensible','ownKeys','preventExtensions','set']
,['Reflect','apply','construct','defineProperty','deleteProperty','get','getOwnPropertyDescriptor','getPrototypeOf','has','isExtensible','ownKeys','preventExtensions','set','setPrototypeOf']
,['RegExp','dotAll','flags','global','ignoreCase','lastIndex','multiline','source','sticky','exec','test']
,['Set','size','add','clear','delete','entries','forEach','has','keys','values']
,['String','length','charAt','charCodeAt','codePointAt','concat','endsWith','includes','indexOf','lastIndexOf','localeCompare','match','matchAll','normalize','padEnd','padStart','repeat','replace','replaceAll','search','slice','split','startsWith','substring','toLocaleLowerCase','toLocaleUpperCase','toLowerCase','toUpperCase','trim','trimEnd','trimStart','fromCharCode','fromCodePoint']
,['Symbol','description','asyncIterator','hasInstance','isConcatSpreadable','isRegExp','iterator','match','replace','search','species','split','toPrimitive','toStringTag','unscopables','for','keyFor']
,['undefined']
,['WeakMap','delete','get','has','set']
,['WeakSet','add','delete','has']],
['Media',
['AudioTrack','enabled','id','kind','label','language']
,['AudioTrackList','length','getTrackById','onaddtrack','onchange','onremovetrack']
,['HTMLAudioElement']
,['HTMLMediaElement','audioTracks','autoplay','buffered','controller','controls','crossOrigin','currentSrc','currentTime','defaultMuted','defaultPlaybackRate','duration','ended','error','loop','mediaGroup','muted','networkState','paused','playbackRate','played','preload','readyState','seekable','seeking','src','textTracks','videoTracks','volume','addTextTrack','canPlayType','fastSeek','getStartDate','load','pause','play','onabort','oncanplay','oncanplaythrough','ondurationchange','onemptied','onemptied','onended','onerror','onloadeddata','onloadedmetadata','onloadstart','onpause','onplay','onplaying','onprogress','onratechange','onseeked','onseeking','onsuspend','ontimeupdate','onvolumechange','onwaiting','HAVE_CURRENT_DATA','HAVE_ENOUGH_DATA','HAVE_FUTURE_DATA','HAVE_METADATA','HAVE_NOTHING','NETWORK_EMPTY','NETWORK_IDLE','NETWORK_LOADING','NETWORK_NO_SOURCE']
,['HTMLVideoElement','height','poster','videoHeight','videoWidth','width']
,['MediaController','buffered','currentTime','defaultPlaybackRate','duration','muted','paused','playbackRate','playbackState','played','readyState','seekable','volume','pause','play','unpause','oncanplay','oncanplaythrough','ondurationchange','onemptied','onended','onloadeddata','onloadedmetadata','onpause','onplay','onplaying','onratechange','ontimeupdate','onvolumechange','onwaiting']
,['MediaError','code','MEDIA_ERR_ABORTED','MEDIA_ERR_DECODE','MEDIA_ERR_NETWORK','MEDIA_ERR_SRC_NOT_SUPPORTED']
,['MediaList']
,['MediaStream','active','id','addTrack','clone','getAudioTracks','getTrackById','getTracks','getVideoTracks','removeTrack','onaddtrack','onremovetrack']
,['MediaStreamTrack','enabled','id','kind','label','muted','muted','readyState','applyConstraints','clone','getCapabilities','getConstraints','getSettings','stop','onended','onmute','onunmute']
,['TextTrack','enabled','id','inBandMetadataTrackDispatchType','kind','label','language','mode']
,['TextTrackList','length','getTrackById','onaddtrack','onchange','onremovetrack']
,['TimeRanges','length','end','start']
,['VideoTrack','id','kind','label','language','selected']
,['VideoTrackList','length','selectedIndex','getTrackById','onaddtrack','onchange','onremovetrack']],
['SVG',
['SVGAngle','unitType','value','valueAsString','valueInSpecifiedUnits','convertToSpecifiedUnits','newValueSpecifiedUnits','SVG_ANGLETYPE_DEG','SVG_ANGLETYPE_GRAD','SVG_ANGLETYPE_RAD','SVG_ANGLETYPE_UNKNOWN','SVG_ANGLETYPE_UNSPECIFIED']
,['SVGAnimatedAngle','animVal','baseVal']
,['SVGAnimatedBoolean','animVal','baseVal']
,['SVGAnimatedEnumeration','animVal','baseVal']
,['SVGAnimatedInteger','animVal','baseVal']
,['SVGAnimatedLength','animVal','baseVal']
,['SVGAnimatedLengthList','animVal','baseVal']
,['SVGAnimatedNumber','animVal','baseVal']
,['SVGAnimatedNumberList','animVal','baseVal']
,['SVGAnimatedPreserveAspectRatio','animVal','baseVal']
,['SVGAnimatedRect','animVal','baseVal']
,['SVGAnimatedString','animVal','baseVal']
,['SVGAnimationElement','targetElement','getCurrentTime','getSimpleDuration','getStartTime']
,['SVGCircleElement','cx','cy','r']
,['SVGClipPathElement','clipPathUnits']
,['SVGColor','colorType','iccColor','rgbColor','setColor','setRGBColor','setRGBColorICCColor','SVG_COLORTYPE_CURRENTCOLOR','SVG_COLORTYPE_RGBCOLOR','SVG_COLORTYPE_RGBCOLOR_ICCCOLOR','SVG_COLORTYPE_UNKNOWN']
,['SVGElement','id','ownerSVGElement','viewportElement','xmlbase']
,['SVGEllipseElement','cx','cy','rx','ry']
,['SVGICCColor','colorProfile','colors']
,['SVGImageElement','height','preserveAspectRatio','width','x','y']
,['SVGLength','unitType','value','valueAsString','valueInSpecificUnits','convertToSpecifiedUnits','newValueSpecifiedUnits','SVG_LENGTHTYPE_CM','SVG_LENGTHTYPE_EMS','SVG_LENGTHTYPE_EXS','SVG_LENGTHTYPE_IN','SVG_LENGTHTYPE_MM','SVG_LENGTHTYPE_NUMBER','SVG_LENGTHTYPE_PC','SVG_LENGTHTYPE_PERCENTAGE','SVG_LENGTHTYPE_PT','SVG_LENGTHTYPE_PX','SVG_LENGTHTYPE_UNKNOWN']
,['SVGLengthList','numberOfItems','appendItem','clear','getItem','initialize','insertItemBefore','removeItem','replaceItem']
,['SVGLineElement','x1','x2','y1','y2']
,['SVGMaskElement','height','maskContentUnits','maskUnits','width','x','y']
,['SVGMatrix','a','b','c','d','e','f','flipX','flipY','inverse','multiply','rotate','rotateFromVector','scale','scaleNonUniform','skewX','skewY','translate']
,['SVGNumber','value']
,['SVGNumberList','numberOfItems','appendItem','clear','getItem','initialize','insertItemBefore','removeItem','replaceItem']
,['SVGPathElement','pathLength','createSVGPathSegArcAbs','createSVGPathSegArcRel','createSVGPathSegClosePath','createSVGPathSegCurvetoCubicAbs','createSVGPathSegCurvetoCubicRel','createSVGPathSegCurvetoCubicSmoothAbs','createSVGPathSegCurvetoCubicSmoothRel','createSVGPathSegCurvetoQuadraticAbs','createSVGPathSegCurvetoQuadraticRel','createSVGPathSegCurvetoQuadraticSmoothAbs','createSVGPathSegCurvetoQuadraticSmoothRel','createSVGPathSegLinetoAbs','createSVGPathSegLinetoHorizontalAbs','createSVGPathSegLinetoHorizontalRel','createSVGPathSegLinetoRel','createSVGPathSegLinetoVerticalAbs','createSVGPathSegLinetoVerticalRel','createSVGPathSegMovetoAbs','createSVGPathSegMovetoRel','getPathSegAtLength','getPointAtLength','getTotalLength']
,['SVGPoint','x','y','matrixTransform']
,['SVGPolygonElement']
,['SVGPolylineElement']
,['SVGPreserveAspectRatio','align','meetOrSlice','SVG_MEETORSLICE_MEET','SVG_MEETORSLICE_SLICE','SVG_MEETORSLICE_UNKNOWN','SVG_PRESERVEASPECTRATIO_NONE','SVG_PRESERVEASPECTRATIO_UNKNOWN','SVG_PRESERVEASPECTRATIO_XMAXYMAX','SVG_PRESERVEASPECTRATIO_XMAXYMID','SVG_PRESERVEASPECTRATIO_XMAXYMIN','SVG_PRESERVEASPECTRATIO_XMIDYMAX','SVG_PRESERVEASPECTRATIO_XMIDYMID','SVG_PRESERVEASPECTRATIO_XMIDYMIN','SVG_PRESERVEASPECTRATIO_XMINYMAX','SVG_PRESERVEASPECTRATIO_XMINYMID','SVG_PRESERVEASPECTRATIO_XMINYMIN']
,['SVGRect','height','width','x','y']
,['SVGRectElement','height','rx','ry','width','x','y']
,['SVGStringList','numberOfItems','appendItem','clear','getItem','initialize','insertItemBefore','removeItem','replaceItem']
,['SVGSVGElement','className','contentScriptType','contentStyleType','currentScale','currentTranslate','currentView','externalResourcesRequired','farthestViewportElement','height','nearestViewportElement','pixelUnitToMillimeterX','pixelUnitToMillimeterY','preserveAspectRatio','requiredExtensions','requiredFeatures','screenPixelToMillimeterX','screenPixelToMillimeterY','style','systemLanguage','useCurrentView','viewBox','viewport','width','x','xmllang','xmlspace','y','zoomAndPan','animationsPaused','checkEnclosure','checkIntersection','createEvent','createSVGAngle','createSVGLength','createSVGMatrix','createSVGNumber','createSVGPoint','createSVGRect','createSVGTransform','createSVGTransformFromMatrix','deselectAll','forceRedraw','getBBox','getComputedStyle','getCTM','getCurrentTime','getElementById','getEnclosureList','getIntersectionList','getOverrideStyle','getPresentationAttribute','getScreenCTM','getTransformToElement','hasExtension','pauseAnimations','setCurrentTime','suspendRedraw','unpauseAnimations','unsuspendRedraw','unsuspendRedrawAll','SVG_ZOOMANDPAN_DISABLE','SVG_ZOOMANDPAN_MAGNIFY','SVG_ZOOMANDPAN_UNKNOWN']
,['SVGTextContentElement','lengthAdjust','textLength','getCharNumAtPosition','getComputedTextLength','getEndPositionOfChar','getExtentOfChar','getNumberOfChars','getRotationOfChar','getStartPositionOfChar','getSubStringLength','selectSubString','LENGTHADJUST_SPACING','LENGTHADJUST_SPACINGANDGLYPHS','LENGTHADJUST_UNKNOWN']
,['SVGTextPositioningElement','dx','dy','rotate','x','y']
,['SVGTransform','angle','matrix','type','setMatrix','setRotate','setScale','setSkewX','setSkewY','setTranslate','SVG_TRANSFORM_MATRIX','SVG_TRANSFORM_ROTATE','SVG_TRANSFORM_SCALE','SVG_TRANSFORM_SKEWX','SVG_TRANSFORM_SKEWY','SVG_TRANSFORM_TRANSLATE','SVG_TRANSFORM_UNKNOWN']
,['SVGTRefElement']
,['SVGTSpanElement']
,['SVGUnitTypes','SVG_UNIT_TYPE_OBJECTBOUNDINGBOX','SVG_UNIT_TYPE_UNKNOWN','SVG_UNIT_TYPE_USERSPACEONUSE']
,['SVGViewSpec']],
['Streams',
['ReadableStream','locked','cancel','getReader','pipeThrough','pipeTo','tee']
,['ReadableStreamDefaultReader','closed','cancel','read','releaseLock']],
['TypedArrays',
['ArrayBuffer','byteLength','slice','isView']
,['ArrayBufferView','buffer','byteLength','byteOffset']
,['BigInt64Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['BigUint64Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['DataView','buffer','byteLength','byteOffset','getBigInt64','getBigUint64','getFloat32','getFloat64','getInt16','getInt32','getInt8','getUint16','getUint32','getUint8','setBigInt64','setBigUint64','setFloat32','setFloat64','setInt16','setInt32','setInt8','setUint16','setUint32','setUint8']
,['Float32Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['Float64Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['Int16Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['Int32Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['Int8Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['Uint16Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['Uint32Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['Uint8Array','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']
,['Uint8ClampedArray','buffer','byteLength','byteOffset','length','copyWithin','entries','every','fill','filter','find','findIndex','forEach','includes','indexOf','join','keys','lastIndexOf','map','reduce','reduceRight','reverse','set','slice','some','sort','subarray','values','BYTES_PER_ELEMENT']],
['WebGL',
['WebGLActiveInfo','name','size','type']
,['WebGLBuffer']
,['WebGLContextAttributes','alpha','antialias','depth','premultipliedAlpha','preserveDrawingBuffer','stencil','xrCompatible']
,['WebGLFramebuffer']
,['WebGLProgram']
,['WebGLRenderbuffer']
,['WebGLRenderingContext','canvas','drawingBufferHeight','drawingBufferWidth','activeTexture','attachShader','bindAttribLocation','bindBuffer','bindFramebuffer','bindRenderbuffer','bindTexture','blendColor','blendEquation','blendEquationSeparate','blendFunc','blendFuncSeparate','bufferData','bufferSubData','checkFramebufferStatus','clear','clearColor','clearDepth','clearStencil','colorMask','compileShader','copyTexImage2D','copyTexSubImage2D','createBuffer','createFramebuffer','createProgram','createRenderbuffer','createShader','createTexture','cullFace','deleteBuffer','deleteFramebuffer','deleteProgram','deleteRenderbuffer','deleteShader','deleteTexture','depthFunc','depthMask','depthRange','detachShader','disable','disableVertexAttribArray','drawArrays','drawElements','enable','enableVertexAttribArray','finish','flush','framebufferRenderbuffer','framebufferTexture2D','frontFace','generateMipmap','getActiveAttrib','getActiveUniform','getAttachedShaders','getAttribLocation','getBufferParameter','getContextAttributes','getError','getExtension','getFramebufferAttachmentParameter','getParameter','getProgramInfoLog','getProgramParameter','getRenderbufferParameter','getShaderInfoLog','getShaderParameter','getShaderPrecisionFormat','getShaderSource','getSupportedExtensions','getTexParameter','getUniform','getUniformLocation','getVertexAttrib','getVertexAttribOffset','hint','isBuffer','isContextLost','isEnabled','isFramebuffer','isProgram','isRenderbuffer','isShader','isTexture','lineWidth','linkProgram','makeXRCompatible','pixelStorei','polygonOffset','readPixels','renderbufferStorage','sampleCoverage','scissor','shaderSource','stencilFunc','stencilFuncSeparate','stencilMask','stencilMaskSeparate','stencilOp','stencilOpSeparate','texImage2D','texParameterf','texParameteri','texSubImage2D','uniform1f','uniform1fv','uniform1i','uniform1iv','uniform2f','uniform2fv','uniform2i','uniform2iv','uniform3f','uniform3fv','uniform3i','uniform3iv','uniform4f','uniform4fv','uniform4i','uniform4iv','uniformMatrix2fv','uniformMatrix3fv','uniformMatrix4fv','useProgram','validateProgram','vertexAttrib1f','vertexAttrib1fv','vertexAttrib2f','vertexAttrib2fv','vertexAttrib3f','vertexAttrib3fv','vertexAttrib4f','vertexAttrib4fv','vertexAttribPointer','viewport','ACTIVE_ATTRIBUTES','ACTIVE_TEXTURE','ACTIVE_UNIFORMS','ALIASED_LINE_WIDTH_RANGE','ALIASED_POINT_SIZE_RANGE','ALPHA','ALPHA_BITS','ALWAYS','ARRAY_BUFFER','ARRAY_BUFFER_BINDING','ATTACHED_SHADERS','BACK','BLEND','BLEND_COLOR','BLEND_DST_ALPHA','BLEND_DST_RGB','BLEND_EQUATION','BLEND_EQUATION_ALPHA','BLEND_EQUATION_RGB','BLEND_SRC_ALPHA','BLEND_SRC_RGB','BLUE_BITS','BOOL','BOOL_VEC2','BOOL_VEC3','BOOL_VEC4','BROWSER_DEFAULT_WEBGL','BUFFER_SIZE','BUFFER_USAGE','BYTE','CCW','CLAMP_TO_EDGE','COLOR_ATTACHMENT0','COLOR_BUFFER_BIT','COLOR_CLEAR_VALUE','COLOR_WRITEMASK','COMPILE_STATUS','COMPRESSED_TEXTURE_FORMATS','CONSTANT_ALPHA','CONSTANT_COLOR','CONTEXT_LOST_WEBGL','CULL_FACE','CULL_FACE_MODE','CURRENT_PROGRAM','CURRENT_VERTEX_ATTRIB','CW','DECR','DECR_WRAP','DELETE_STATUS','DEPTH_ATTACHMENT','DEPTH_BITS','DEPTH_BUFFER_BIT','DEPTH_CLEAR_VALUE','DEPTH_COMPONENT','DEPTH_COMPONENT16','DEPTH_FUNC','DEPTH_RANGE','DEPTH_STENCIL','DEPTH_STENCIL_ATTACHMENT','DEPTH_TEST','DEPTH_WRITEMASK','DITHER','DONT_CARE','DST_ALPHA','DST_COLOR','DYNAMIC_DRAW','ELEMENT_ARRAY_BUFFER','ELEMENT_ARRAY_BUFFER_BINDING','EQUAL','FASTEST','FLOAT','FLOAT_MAT2','FLOAT_MAT3','FLOAT_MAT4','FLOAT_VEC2','FLOAT_VEC3','FLOAT_VEC4','FRAGMENT_SHADER','FRAMEBUFFER','FRAMEBUFFER_ATTACHMENT_OBJECT_NAME','FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE','FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE','FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL','FRAMEBUFFER_BINDING','FRAMEBUFFER_COMPLETE','FRAMEBUFFER_INCOMPLETE_ATTACHMENT','FRAMEBUFFER_INCOMPLETE_DIMENSIONS','FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT','FRAMEBUFFER_UNSUPPORTED','FRONT','FRONT_AND_BACK','FRONT_FACE','FUNC_ADD','FUNC_REVERSE_SUBTRACT','FUNC_SUBTRACT','GENERATE_MIPMAP_HINT','GEQUAL','GREATER','GREEN_BITS','HIGH_FLOAT','HIGH_INT','INCR','INCR_WRAP','INT','INT_VEC2','INT_VEC3','INT_VEC4','INVALID_ENUM','INVALID_FRAMEBUFFER_OPERATION','INVALID_OPERATION','INVALID_VALUE','INVERT','KEEP','LEQUAL','LESS','LINE_LOOP','LINE_STRIP','LINE_WIDTH','LINEAR','LINEAR_MIPMAP_LINEAR','LINEAR_MIPMAP_NEAREST','LINES','LINK_STATUS','LOW_FLOAT','LOW_INT','LUMINANCE','LUMINANCE_ALPHA','MAX_COMBINED_TEXTURE_IMAGE_UNITS','MAX_CUBE_MAP_TEXTURE_SIZE','MAX_FRAGMENT_UNIFORM_VECTORS','MAX_RENDERBUFFER_SIZE','MAX_TEXTURE_IMAGE_UNITS','MAX_TEXTURE_SIZE','MAX_VARYING_VECTORS','MAX_VERTEX_ATTRIBS','MAX_VERTEX_TEXTURE_IMAGE_UNITS','MAX_VERTEX_UNIFORM_VECTORS','MAX_VIEWPORT_DIMS','MEDIUM_FLOAT','MEDIUM_INT','MIRRORED_REPEAT','NEAREST','NEAREST_MIPMAP_LINEAR','NEAREST_MIPMAP_NEAREST','NEVER','NICEST','NO_ERROR','NONE','NOTEQUAL','NUM_COMPRESSED_TEXTURE_FORMATS','ONE','ONE_MINUS_CONSTANT_ALPHA','ONE_MINUS_CONSTANT_COLOR','ONE_MINUS_DST_ALPHA','ONE_MINUS_DST_COLOR','ONE_MINUS_SRC_ALPHA','ONE_MINUS_SRC_COLOR','OUT_OF_MEMORY','PACK_ALIGNMENT','POINTS','POLYGON_OFFSET_FACTOR','POLYGON_OFFSET_FILL','POLYGON_OFFSET_UNITS','RED_BITS','RENDERBUFFER','RENDERBUFFER_ALPHA_SIZE','RENDERBUFFER_BINDING','RENDERBUFFER_BLUE_SIZE','RENDERBUFFER_DEPTH_SIZE','RENDERBUFFER_GREEN_SIZE','RENDERBUFFER_HEIGHT','RENDERBUFFER_INTERNAL_FORMAT','RENDERBUFFER_RED_SIZE','RENDERBUFFER_STENCIL_SIZE','RENDERBUFFER_WIDTH','RENDERER','REPEAT','REPLACE','RGB','RGB5_A1','RGB565','RGBA','RGBA4','SAMPLE_ALPHA_TO_COVERAGE','SAMPLE_BUFFERS','SAMPLE_COVERAGE','SAMPLE_COVERAGE_INVERT','SAMPLE_COVERAGE_VALUE','SAMPLER_2D','SAMPLER_CUBE','SAMPLES','SCISSOR_BOX','SCISSOR_TEST','SHADER_TYPE','SHADING_LANGUAGE_VERSION','SHORT','SRC_ALPHA','SRC_ALPHA_SATURATE','SRC_COLOR','STATIC_DRAW','STENCIL_ATTACHMENT','STENCIL_BACK_FAIL','STENCIL_BACK_FUNC','STENCIL_BACK_PASS_DEPTH_FAIL','STENCIL_BACK_PASS_DEPTH_PASS','STENCIL_BACK_REF','STENCIL_BACK_VALUE_MASK','STENCIL_BACK_WRITEMASK','STENCIL_BITS','STENCIL_BUFFER_BIT','STENCIL_CLEAR_VALUE','STENCIL_FAIL','STENCIL_FUNC','STENCIL_INDEX','STENCIL_INDEX8','STENCIL_PASS_DEPTH_FAIL','STENCIL_PASS_DEPTH_PASS','STENCIL_REF','STENCIL_TEST','STENCIL_VALUE_MASK','STENCIL_WRITEMASK','STREAM_DRAW','SUBPIXEL_BITS','TEXTURE','TEXTURE_2D','TEXTURE_BINDING_2D','TEXTURE_BINDING_CUBE_MAP','TEXTURE_CUBE_MAP','TEXTURE_CUBE_MAP_NEGATIVE_X','TEXTURE_CUBE_MAP_NEGATIVE_Y','TEXTURE_CUBE_MAP_NEGATIVE_Z','TEXTURE_CUBE_MAP_POSITIVE_X','TEXTURE_CUBE_MAP_POSITIVE_Y','TEXTURE_CUBE_MAP_POSITIVE_Z','TEXTURE_MAG_FILTER','TEXTURE_MIN_FILTER','TEXTURE_WRAP_S','TEXTURE_WRAP_T','TEXTURE0','TEXTURE1','TEXTURE10','TEXTURE11','TEXTURE12','TEXTURE13','TEXTURE14','TEXTURE15','TEXTURE16','TEXTURE17','TEXTURE18','TEXTURE19','TEXTURE2','TEXTURE20','TEXTURE21','TEXTURE22','TEXTURE23','TEXTURE24','TEXTURE25','TEXTURE26','TEXTURE27','TEXTURE28','TEXTURE29','TEXTURE3','TEXTURE30','TEXTURE31','TEXTURE4','TEXTURE5','TEXTURE6','TEXTURE7','TEXTURE8','TEXTURE9','TRIANGLE_FAN','TRIANGLE_STRIP','TRIANGLES','UNPACK_ALIGNMENT','UNPACK_COLORSPACE_CONVERSION_WEBGL','UNPACK_FLIP_Y_WEBGL','UNPACK_PREMULTIPLY_ALPHA_WEBGL','UNSIGNED_BYTE','UNSIGNED_INT','UNSIGNED_SHORT','UNSIGNED_SHORT_4_4_4_4','UNSIGNED_SHORT_5_5_5_1','UNSIGNED_SHORT_5_6_5','VALIDATE_STATUS','VENDOR','VERSION','VERTEX_ATTRIB_ARRAY_BUFFER_BINDING','VERTEX_ATTRIB_ARRAY_ENABLED','VERTEX_ATTRIB_ARRAY_NORMALIZED','VERTEX_ATTRIB_ARRAY_POINTER','VERTEX_ATTRIB_ARRAY_SIZE','VERTEX_ATTRIB_ARRAY_STRIDE','VERTEX_ATTRIB_ARRAY_TYPE','VERTEX_SHADER','VIEWPORT','ZERO']
,['WebGLShader']
,['WebGLShaderPrecisionFormat','precision','rangeMax','rangeMin']
,['WebGLTexture']
,['WebGLUniformLocation']],
['WebRTC',
['RTCDataChannel']
,['RTCPeerConnection']],
['WebSockets',
['CloseEvent','code','reason','wasClean']
,['WebSocket','binaryType','bufferedAmount','extensions','protocol','readyState','url','close','send','onclose','onerror','onmessage','onopen','CLOSED','CLOSING','CONNECTING','OPEN']],
['WebXR',
['XRBoundedReferenceSpace','boundsGeometry']
,['XRFrame','session','getPose','getViewerPose']
,['XRInputSource','gamepad','gripSpace','handedness','profiles','targetRayMode','targetRaySpace']
,['XRInputSourceEvent','frame','inputSource']
,['XRInputSourcesChangeEvent','added','removed','session']
,['XRLayer']
,['XRReferenceSpace','getOffsetReferenceSpace','onreset']
,['XRReferenceSpaceEvent','referenceSpace','transform']
,['XRRenderState','baseLayer','depthFar','depthNear','inlineVerticalFieldOfView']
,['XRRigidTransform','inverse','matrix','orientation','position']
,['XRSession','inputSources','renderState','visibiltyState','cancelAnimationFrame','end','requestAnimationFrame','requestReferenceSpace','updateRenderState','onend','oninputsourceschange','onselect','onselectend','onselectstart','onsqueeze','onsqueezeEnd','onsqueezeStart','onvisibilitychange']
,['XRSessionEvent','session']
,['XRSpace']
,['XRSystem','isSessionSupported','requestSession','ondevicechange']
,['XRView','eye','projectionMatrix','transform']
,['XRViewerPose','views']
,['XRViewport','height','width','x','y']
,['XRWebGLLayer','antialias','framebuffer','framebufferHeight','framebufferWidth','ignoreDepthValues','getViewport','getNativeFramebufferScaleFactor']],
['Worker',
['Worker','postMessage','terminate','onerror','onmessage']
,['WorkerGlobalScope','globalThis','location','self','addEventListener','close','dispatchEvent','postMessage','removeEventListener','onerror','onmessage','onoffline','ononline']]];
var noDescriptions = {AudioBuffer:true,AudioBufferSourceNode:true,AudioListener:true,AudioNode:true,AudioParam:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,OfflineAudioContext:true,ScriptProcessorNode:true,External:true,MessageEvent:true,StorageEvent:true,URLSearchParams:true,Counter:true,CSSCharsetRule:true,CSSFontFaceRule:true,CSSImportRule:true,CSSMediaRule:true,CSSPageRule:true,CSSPrimitiveValue:true,CSSValue:true,Rect:true,RGBColor:true,HTMLContentElement:true,HTMLShadowElement:true,ShadowRoot:true,CompositionEvent:true,DocumentType:true,DOMImplementation:true,FocusEvent:true,HTMLAnchorElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLBRElement:true,HTMLDivElement:true,HTMLDListElement:true,HTMLEmbedElement:true,HTMLFormControlsCollection:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLHRElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLLIElement:true,HTMLLinkElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLOptGroupElement:true,HTMLOptionsCollection:true,HTMLParagraphElement:true,HTMLPreElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLSelectElement:true,HTMLSpanElement:true,HTMLTableCellElement:true,HTMLTableElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLUListElement:true,InputEvent:true,IntersectionObserverEntry:true,NodeFilter:true,NodeIterator:true,ProcessingInstruction:true,ProgressEvent:true,Touch:true,TouchEvent:true,TreeWalker:true,UIEvent:true,ValidityState:true,XMLDocument:true,XMLSerializer:true,Headers:true,GamepadEvent:true,IDBOpenDBRequest:true,AudioTrack:true,MediaError:true,MediaList:true,MediaStream:true,VideoTrack:true,VideoTrackList:true,SVGAngle:true,SVGAnimatedAngle:true,SVGAnimatedBoolean:true,SVGAnimatedEnumeration:true,SVGAnimatedInteger:true,SVGAnimatedLengthList:true,SVGAnimatedNumber:true,SVGAnimatedNumberList:true,SVGAnimatedPreserveAspectRatio:true,SVGAnimatedRect:true,SVGAnimatedString:true,SVGClipPathElement:true,SVGColor:true,SVGICCColor:true,SVGImageElement:true,SVGLengthList:true,SVGMaskElement:true,SVGMatrix:true,SVGNumber:true,SVGNumberList:true,SVGPathElement:true,SVGPoint:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGPreserveAspectRatio:true,SVGRect:true,SVGRectElement:true,SVGStringList:true,SVGTextContentElement:true,SVGTextPositioningElement:true,SVGTRefElement:true,SVGUnitTypes:true,SVGViewSpec:true,RTCDataChannel:true,RTCPeerConnection:true,CloseEvent:true,XRBoundedReferenceSpace:true,XRFrame:true,XRInputSourceEvent:true,XRInputSourcesChangeEvent:true,XRLayer:true,XRReferenceSpace:true,XRReferenceSpaceEvent:true,XRRenderState:true,XRSessionEvent:true,XRSpace:true,XRViewerPose:true,XRViewport:true,XRWebGLLayer:true};

var apichooserList = document.querySelector('#apisets > ul');
var related = document.getElementById('related-apis'); 

var styleSheet = document.styleSheets[0];
var rootObjs = [];
for (var i = 0; i < apiSets.length; i++) {
  var set = apiSets[i];
  var setName = set[0];
  styleSheet.insertRule('#rootObjs > .' + setName + ' { display: none; }', styleSheet.cssRules.length);
  styleSheet.insertRule('#rootObjs.' + setName + ' > .' + setName + ' { display: block; }', styleSheet.cssRules.length);

  apichooserList.insertAdjacentHTML('beforeend',
   "<li><label><input id='inc" + setName + "' type='checkbox'>" + setName + "</label></li>");

  var inSet = false;
  for (var j = 1; j < set.length; j++) {
    rootObjs.push( { name: set[j][0], set: setName } );
    if ('/' + set[j][0] === location.pathname.replace('.html', '')) {
      inSet = true;
    }
  }

  if (related && inSet) {
    for (var j = 1; j < set.length; j++) {
      var typeName = set[j][0];
      var className = setName;
      if (noDescriptions[typeName]) {
        className += ' noDescription';
      }
      related.insertAdjacentHTML('beforeend',
        "<a href='/" + typeName + "' class='" + className + "'" + (typeName.length > 15 ? ' title="' + typeName + '"' : '') + ">" + typeName + "</a>");
    }
  }
}
rootObjs.sort(function(a, b) {
  return a.name.localeCompare(b.name);
});

var allList = document.getElementById('rootObjs');
rootObjs.forEach(function(type) {
  var className = type.set;
  if (noDescriptions[type.name]) {
    className += ' noDescription';
  }

  allList.insertAdjacentHTML('beforeend',
    "<a href='/" + type.name + "' class='" + className + "'" + (type.name.length > 15 ? ' title="' + type.name + '"' : '') + ">" + type.name + "</a>");
});

var possibilities;


var buildAutoCompleteList = function() {
  var apiLinks = [];
  var selectedSets = [];
  
  possibilities = [];

  var rootObjsClass = '';
  apiSets.forEach(function(api) {
    var setName = api[0];
    if (document.getElementById('inc' + setName).checked) {
      rootObjsClass += ' ' + setName;
      selectedSets.push(setName);
      api.forEach(function(obj, index) {
        if (index === 0) return;
        var objName = obj[0]; 
        possibilities.push(objName);
        apiLinks.push(objName);
        obj.forEach(function(propName, index) {
          if (index === 0) return;
          possibilities.push(objName + '.' + propName);
        });
      });
    }
  });

  if (rootObjsClass === '') {
    rootObjsClass = 'empty';
  };

  rootObjsClass += ' navgroup';

  document.getElementById('rootObjs').className = rootObjsClass;

  possibilities.sort();

  if (selectedSets.length) {
    var shortNames = {'JavaScript': 'JS'};
    selectedSets = selectedSets.map(function(set) {
      return shortNames[set] || set;
    });
    selectedSets = selectedSets.join(', ');
  } 
  else {
    selectedSets = 'none';
  }
    
  var selectedsetsElement = document.getElementById('selectedsets');
  selectedsetsElement.innerHTML = 'include: ' + selectedSets;
  selectedsetsElement.title = selectedSets;
};

var openApiChooser = function() {
  var apisets =  document.getElementById('apisets');
  apisets.style.display = 'block';
  var obscure =  document.getElementById('obscure');
  obscure.style.display = 'block';

  obscure.addEventListener('click', function(e) {
    apisets.style.display = 'none';
    obscure.style.display = 'none';
    e.preventDefault();
  });
};


var checkBoxes = document.querySelectorAll('#apisets input');

for (var i = 0; i < checkBoxes.length; i++) {
  var checkBox = checkBoxes[i];

  var apiName = checkBox.id.substring(3); // cut off 'inc'
  var checked = true;
  var forceChecked = false;

  // See if this page is in a set that was not enabled
  for (var j = 0; j < apiSets.length; j++) {
    var set = apiSets[j];
    if (set[0] === apiName) {
      for (var k = 1; k < set.length; k++) {
        if ('/' + set[k][0] === location.pathname) {
          forceChecked = true
        }
      }
    }
  }

  if (forceChecked) {
    localStorage.setItem(checkBox.id, true);
  }
  var storedState = localStorage.getItem(checkBox.id);
  if (storedState) {
    checked = (storedState === 'true');
  }
  checked = checked || forceChecked;
  checkBox.checked = Boolean(checked);
  checkBox.onchange =  function(evt) {
    _gaq.push(['_trackEvent', 'APIChange', evt.target.id]);
    if (localStorage) {
      localStorage.setItem(evt.target.id, evt.target.checked);
    }
    buildAutoCompleteList();
  };
}

var searchBox = document.getElementById('searchBox');
var resultsBox = document.getElementById('resultsBox');
var selectedIndex = -1;
var selectedItem;
var suggestions = [];

buildAutoCompleteList();

var setSelected = function(index) {
  if (selectedItem) {
    selectedItem.className = '';
  }
  selectedIndex = Math.max(0, Math.min(index, suggestions.length - 1));
  selectedItem = suggestions[selectedIndex];

  if (selectedItem) {
    selectedItem.className = 'selected';
  }
};

var createSuggestion = function(text, href) {
  var suggestion = document.createElement('a');
  suggestion.innerHTML = text;
  suggestion.href = href;
  resultsBox.appendChild(suggestion);
  suggestions.push(suggestion);
  suggestion.addEventListener('mousedown', function(e) {
    e.preventDefault();
    return false;
  });
};


var autocomplete = function(searchTerm) {
  if (!searchTerm || searchTerm.length === 0) {
    resultsBox.style.display = 'none';
    return;
  }
  resultsBox.style.display = '';

  var regexp = RegExp(searchTerm.replace(/[^\w]/, function(x) { return '\\' + x }), 'i');

  var filtered = possibilities.filter(function(p) { 
    return regexp.test(p);
  });

  filtered.sort(function(a, b) {
    var aMatchIndex = a.match(regexp).index;
    var bMatchIndex = b.match(regexp).index;

    var aAtStart = (aMatchIndex === 0);
    var bAtStart = (bMatchIndex === 0);

    // Show things at the start first
    if (aAtStart && !bAtStart) {
      return -1;
    }
    if (!aAtStart && bAtStart) {
      return 1;
    }

    var aDotIndex = a.indexOf('.');
    var bDotIndex = b.indexOf('.');

    var aAfterDot = (aMatchIndex === aDotIndex + 1)
    var bAfterDot = (bMatchIndex === bDotIndex + 1)

    // Then choose things that are at the start after the . 
    if (aAfterDot && !bAfterDot) {
      return -1;
    }
    if (!aAfterDot && bAfterDot) {
      return 1;
    }

    // Then choose things that don't have a dot
    var aDot = (aDotIndex !== -1);
    var bDot = (bDotIndex !== -1);
    
    if (!aDot && bDot) {
      return -1;
    }
    if (aDot && !bDot) {
      return 1;
    }

    return a.localeCompare(b);
  });

  // Limit the results to the first X
  filtered = filtered.slice(0, 15);
  resultsBox.innerHTML = '';
  
  suggestions = [];

  filtered.forEach(function(r){
    createSuggestion(r, r.replace('.', '#'));
  });

  if (searchTerm.length) {
    createSuggestion(searchTerm + ' - site search',
                     'http://www.google.com/search?q=' + encodeURIComponent(searchTerm) + '&sitesearch=PUBLIC.com');
     
    createSuggestion(searchTerm + ' - Google search',
                     'http://www.google.com/search?q=' + encodeURIComponent(searchTerm));
  }

  setSelected(0);

  if (filtered.length && filtered[0].match(regexp).index === 0) {
    return filtered[0];
  }
}

var keyCodes = { BACKSPACE: 8, 
                 ENTER: 13,
                 UP: 38,
                 DOWN: 40,
                 DELETE: 46,
                 S: 83};

searchBox.addEventListener('keydown', function(event){
  var newVal;
  switch (event.keyCode) {
    case keyCodes.BACKSPACE: 
    case keyCodes.DELETE: 
      var deleteStart = searchBox.selectionStart;
      var deleteEnd = searchBox.selectionEnd;
      if (searchBox.selectionStart === searchBox.selectionEnd) {
        if (event.keyCode === keyCodes.BACKSPACE) {
          deleteStart--;
        }
        else {
          deleteEnd++;
        }
      }
      newVal = searchBox.value.slice(0, deleteStart) + 
               searchBox.value.slice(deleteEnd);
      autocomplete(newVal);
      break;
    case keyCodes.ENTER: 
      if (selectedItem) {
        _gaq.push(['_trackEvent','Search', 'Search', 'text=' + searchBox.value + '&href=' + selectedItem.href]);
        window.location = selectedItem.href;
        searchBox.blur();
      }
      event.preventDefault();
      return false;
    case keyCodes.DOWN:
      setSelected(selectedIndex + 1);

      if (selectedItem) {
        searchBox.value = selectedItem.innerHTML;
        searchBox.setSelectionRange(searchBox.value.length, searchBox.value.length); 
      }
      event.preventDefault();
      return false;
    case keyCodes.UP:
      setSelected(selectedIndex - 1);
      
      if (selectedItem) {
        searchBox.value = selectedItem.innerHTML;
        searchBox.setSelectionRange(searchBox.value.length, searchBox.value.length); 
      }
      event.preventDefault();
      return false;
    default:
      return;
  }
  return;
});

searchBox.addEventListener('keypress', function(event){
  if (event.charCode === 0) {
    return;
  }
  var newVal = searchBox.value.slice(0, searchBox.selectionStart) + 
               String.fromCharCode(event.charCode) + 
               searchBox.value.slice(searchBox.selectionEnd);

  var match = autocomplete(newVal);
  var selectionStart = searchBox.selectionStart
  if (match && searchBox.selectionEnd === searchBox.value.length) {
    searchBox.value = match;
    searchBox.setSelectionRange(selectionStart + 1, match.length); 
    event.preventDefault();
    return false;
  }
});

searchBox.addEventListener('blur', function() {
  resultsBox.style.display = 'none';
});


var expandoClicked = function(group) {
  if (group.className.match(/expanded/)) {
    group.className = group.className.replace('expanded', 'collapsed');
  }
  else {
    group.className = group.className.replace('collapsed', 'expanded');
  }
};    

var escapeHTML = function(s) {
  return String(s).replace(/[&<>"'\/]/g, function (s) {
    switch (s) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      case '/': return '&#x2F;';
    }
  });
}

var lastRun;
var recordRun = function(prop) {
  if (!init && lastRun !== prop) {
    _gaq.push(['_trackEvent','Run', prop, 'ctrl-enter', inCtrlEnter ? 1 : 0]);
    lastRun = prop;
  }
};


var dumpObject = function(x, depth) {
  if (depth > 3) return '...';
  var r = x;
  if (typeof x === 'object') {
    var isArray = Array.isArray(x);
    r = isArray ? '[ ' : '{ ';

    var first = true;
    for (var prop in x) {
      if (!first) {
        r += ', '
      }
      if (!isArray || prop != Number(prop)) {
        r += prop + ': ';
      }
      r += dumpObject(x[prop], depth + 1); 

      first = false;
    }

    r += isArray ? ' ]' : ' }';
  }
  else if (typeof x === 'string') {
    r = "'" + x + "'";
  }
  return r;
}
var executeExample = function(example, prop) {
  recordRun(prop);

  var code = example.getElementsByClassName('code')[0];
  var results = example.getElementsByClassName('results')[0];
  var errormessage = example.getElementsByClassName('errormessage')[0];
  
  if (code && results && errormessage) {
    var iframe = example.getElementsByTagName('iframe')[0];

    if (iframe) {
      iframe.contentWindow.console = undefined;
      iframe.contentWindow.PUBLICReportError = undefined;

      iframe.parentNode.removeChild(iframe);
    }

    iframe = document.createElement('iframe');
    // put the iframe way offscreen.  onerror doesn't seem to work
    // in FF if the iframe is display none 
    iframe.style.position = 'fixed';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    example.appendChild(iframe);

    var doc = iframe.contentDocument;
    if (!doc && iframe.contentWindow) {
      doc = iframe.contentWindow.document;
    }
    doc = doc || iframe.document;
    results.innerHTML = '';
    errormessage.style.display = 'none';

    doc.open();
    iframe.contentWindow.console = {
      log: function() {
        var res = '';
        for (var i = 0; i < arguments.length; i++) {
          if (res.length) {
            res += ' ';
          }
          res += escapeHTML(arguments[i]);
        }
        results.insertAdjacentHTML('beforeend', res + '\n');
      },
      dir: function(obj) {
        results.insertAdjacentHTML('beforeend', escapeHTML(dumpObject(obj, 0)) + '\n');
      }
    };

    iframe.contentWindow.PUBLICReportError = function(error) {
      errormessage.innerHTML = escapeHTML(error);
      errormessage.style.display = 'block';
    };

    doc.writeln('<script>');
    doc.writeln('window.onerror=function(err) { PUBLICReportError(err); };');
    doc.writeln('window.onunhandledrejection=function(evt) { PUBLICReportError("Promise rejected: " + evt.reason); evt.preventDefault(); };');
    doc.writeln('</script>');

    var scriptBody;

    if (asyncFunctionsSupported) {
      scriptBody = '(async()=>{' + code.value + '\n})().catch(e=>PUBLICReportError(e))';
    }
    else {
      scriptBody = code.value;
    }

    var blob = new Blob([scriptBody], { type: 'application/javascript' });
    var url = URL.createObjectURL(blob);
    doc.writeln('<script src="' + url + '">');
    URL.revokeObjectURL(blob);
    doc.writeln('</script>');
    doc.close();
  }
};



var executeHTMLExample = function(example, prop) {
  recordRun(prop);

  var code = example.getElementsByClassName('code')[0];
  var iframe = example.getElementsByClassName('output')[0];
  var results = example.getElementsByClassName('results')[0];
  var errormessage = example.getElementsByClassName('htmlerrormessage')[0];
  
  if (code && iframe && results && errormessage) {
    var newIframe = document.createElement('iframe');
    newIframe.className = iframe.className;
    newIframe.width = iframe.width;
    newIframe.height = iframe.height;
    newIframe.style.width = iframe.offsetWidth + 'px';
    newIframe.style.height = iframe.offsetHeight + 'px';
    iframe.parentNode.replaceChild(newIframe, iframe);
    iframe = newIframe;

    var doc = iframe.contentDocument;
    if (!doc && iframe.contentWindow) {
      doc = iframe.contentWindow.document;
    }
    doc = doc || iframe.document;
    results.innerHTML = '';

    doc.open();

    iframe.contentWindow.console = {
      log: function() {
        var res = '';
        for (var i = 0; i < arguments.length; i++) {
          if (res.length) {
            res += ' ';
          }
          res += escapeHTML(arguments[i]);
        }
        results.insertAdjacentHTML('beforeend', res + '\n');
      },
      dir: function(obj) {
        results.insertAdjacentHTML('beforeend', escapeHTML(dumpObject(obj, 0)) + '\n');
      }
    };

    errormessage.style.display = 'none';

    iframe.contentWindow.PUBLICReportError = function(error) {
      errormessage.innerHTML = escapeHTML(error);
      errormessage.style.display = 'block';
    };

    doc.writeln('<script>');
    doc.writeln('window.onerror=function(err) { PUBLICReportError(err); };');
    doc.writeln('window.onunhandledrejection=function(evt) { PUBLICReportError("Promise rejected: " + evt.reason); evt.preventDefault(); };');
    doc.writeln('</script>');
    doc.writeln(code.value);
    doc.close();
  }
};

var requestExample = function(anchor, prop) {
  _gaq.push(['_trackEvent', 'RequestExample', prop]);
  anchor.href = '';
  anchor.textContent = 'Requested!';
};

var focusListener = function(event) {
  var example = event.target.parentNode.parentNode;
  if (example.className.indexOf('focus') === -1) {
    example.className += ' focus';
  }
};
var blurListener = function(event) {
  var example = event.target.parentNode.parentNode;
  example.className = example.className.replace(' focus', '').trim();
};

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case keyCodes.S:
      if (event.ctrlKey) {
         searchBox.focus();
         event.preventDefault();
         event.stopPropagation();
         return false;
      }
      break;
  }
}, true);

var inCtrlEnter = false;

var makeCtrlEnterListener = function(callback) {
  return function(event) {
    var newVal;
    switch (event.keyCode) {
      case keyCodes.ENTER: 
        if (event.ctrlKey) {
          // Find the 'Run' link and click it
          inCtrlEnter = false;
          try {
            event.target.parentNode.parentNode.querySelector('a').click();
          }
          finally {
            inCtrlEnter = false;
          }
          event.preventDefault();
          return false;
        }
        break;
    }
  }
};
var exampleKeydownListener = makeCtrlEnterListener(executeExample);

var initExample = function(example) {
  var textarea = example.querySelector('textarea');
  textarea.addEventListener('focus', focusListener);
  textarea.addEventListener('blur', blurListener);
  textarea.addEventListener('keydown', exampleKeydownListener);
  executeExample(example);
};

var htmlExampleKeydownListener = makeCtrlEnterListener(executeHTMLExample);

var initHTMLExample = function(example) {
  var textarea = example.querySelector('textarea');
  textarea.addEventListener('focus', focusListener);
  textarea.addEventListener('blur', blurListener);
  textarea.addEventListener('keydown', htmlExampleKeydownListener);
  executeHTMLExample(example);
};

var init = true;
var startTime = Date.now();

var targetElementName = (window.location.hash || '').replace('#', '');
var targetMember;

if (targetElementName) {
  var targetAnchor = document.querySelector('a[name=' + targetElementName + ']');
  
  if (targetAnchor) {
    targetMember = targetAnchor.parentNode;
  }
}


var examplesNodeList = document.querySelectorAll('.example, .htmlexample');
var examples = Array(examplesNodeList.length);

var initExampleIndex = 0;
for (var i = 0; i < examplesNodeList.length; i++) {
  var example = examplesNodeList[i];
  examples[i] = example;

  if (example.parentNode === targetMember) {
    initExampleIndex = i;
  }
}

var loadTimeout = 100;
var loadExamples = function() {
  var start = Date.now();

  while (true) { 
    var example = examples[initExampleIndex];
    examples[initExampleIndex] = undefined;

    if (!example) {
      init = false;
      break;
    }

    if (example.className.indexOf('htmlexample') !== -1) {
      initHTMLExample(example);
    }
    else {
      initExample(example);
    }

    initExampleIndex = (initExampleIndex + 1) % examples.length;

    if (Date.now() - start > loadTimeout) {
      setTimeout(loadExamples, 4);
      break;
    }
  }
}

if (examples.length) {
  loadExamples();
}
else {
  init = false;
}

if (localStorage.getItem('newCount') < 20) {
  setTimeout(function() {
    var contribute = document.querySelector('.contribute');
    var newPopup = document.createElement('div');
    newPopup.className = 'popup';
    newPopup.textContent = 'New!';
    contribute.appendChild(newPopup);
    
    localStorage.setItem('newCount', (+localStorage.getItem('newCount') || 0) + 1);
  }, 2500);
}

// The expand/collapse arrows on each item
var expanders = document.querySelectorAll('.expand-members');
for (var i = 0; i < expanders.length; i++) {
  var expander = expanders[i];
  expander.addEventListener('click', function(event) {
    // Remember the position of the arrow
    var oldTopOffset = event.target.getBoundingClientRect().top;

    document.body.classList.toggle('members-collapsed');
    var collapsed = document.body.classList.contains('members-collapsed');
    sessionStorage.collapsed = collapsed 
    event.target.scrollIntoView(event.target);

    // Scroll the page back so the arrow is in the same place
    var newTopOffset = event.target.getBoundingClientRect().top;
    var scroller = document.getElementsByClassName('content')[0];
    scroller.scrollTop += newTopOffset - oldTopOffset;

    _gaq.push(['_trackEvent', 'UI', 'Toggle Collapse', 'collapsed=' + collapsed]);
  });
}

