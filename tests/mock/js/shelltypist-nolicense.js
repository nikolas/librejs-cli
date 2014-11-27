(function ($) {
    $.fn.shellTypist = function( options ) {
	
	var opts = $.extend( {}, $.fn.shellTypist.defaults, options );

	// wrap extra span around text.
	this.wrapInner( '<span class="shell-text"></span>' );
	
	// add cursor.
	this.append( opts.cursor_html );
	
	// Create a variable to refer to it later.
	var cursor = this.children( '.block-cursor' );
	// set cursor color
	cursor.css( 'background', opts.cursorColor );
	
	// initialize cursor blinking.
	var blinking = setInterval( function() { blinkCursor() }, 500 );
	var blurbs = opts.blurbs;

	// set line height of the element to the cursor height.
	this.css( 'line-height', ( cursor.height()+5 ) + 'px' );

	// The actual element containing text.
	var shell_text = this.children( '.shell-text' ); 

	// An array of characters later entered in shell_text.
	var text_content;

	// Start the animation.
	setTimeout( function() { runAnimation() }, opts.startDelay );
	
	var runAnimation = function() {
	    var b = pickBlurb();
	    if ( b != null ) {
 		typeWord( b );
	    }

	};
	
	// Pick random blurb from array.
	var pickBlurb = function() {
	    if ( blurbs != undefined && blurbs.constructor.toString().indexOf( "Array" ) != -1 ) {
		multistring = true; 
		return blurbs.shift();
	    } else {
		// this is most likely a string
		b = blurbs;
		blurbs = null;
		return b;
	    }
	};

	// show/hide cursor
	var blinkCursor = function() {
	    cursor.toggle();
	};


	// returns a random speed between 200 and 1000 depending
	// on the character. Default typingSpeed is 1.
	var type_speed = function( character ) {

	    var rand = new Array();

	    if ( character == ' ' ) {
		rand['min'] = 80 * opts.typingSpeed;
		rand['max'] = 350 * opts.typingSpeed;
	    }
	    else if ( character ==  ',' ) {
		rand['min'] = 300 * opts.typingSpeed;
		rand['max'] = 450 * opts.typingSpeed;
	    }
	    else if ( $.inArray( character, ['?','.','/'] ) != -1 ) {
		rand['min'] = 700 * opts.typingSpeed;
		rand['max'] = 900 * opts.typingSpeed;
	    }
	    else {
		rand['min'] = 10 * opts.typingSpeed;
		rand['max'] = 100 * opts.typingSpeed;
	    }

	    return rand;
	};


	// Add a letter to the element
	var addLetter = function () {
	    if ( text_content.length > 0 ) {
		clearInterval( blinking );
		cursor.show();
		//shell_text.text( shell_text.text() + text_content[0] );
		shell_text.append( text_content[0] );
		speed = type_speed( text_content[0] );      
		text_content.shift();
		random_time =  Math.ceil( ( speed['max']-speed['min'] )*Math.random() ) + speed['min'];
		if ( random_time > 800 ) {
		    startBlink();
		}
		setTimeout( addLetter, random_time );
	    }
	    else {
		startBlink();
		setTimeout( runAnimation, opts.pauseDuration );
	    }
	};
	
	var startBlink = function() {
	    clearInterval( blinking );
	    blinking = setInterval( function() { blinkCursor() }, 500 );	    
	};
	
	/* Write the selected word */
	var typeWord = function( text_pick ) {
	    text_content = text_pick.split( "" );
	    shell_text.empty();
	    setTimeout( addLetter, 500 );
	};
	
    }

    // Default options.
    $.fn.shellTypist.defaults = {
	cursorColor: "#FFFFFF",
	cursor_html: '<span class="block-cursor"></span>',
	blurbs: new Array(),
	startDelay: 2000,
	pauseDuration: 5000,
	typingSpeed: 1
    };

})(jQuery);
