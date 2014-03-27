;(function($) {
	$.fn.setClock = function(options) {
		options = $.extend({}, $.fn.setClock.defaultOptions, options);
		$.fn.setClock.setSettings(options);

		// take the first element
		var element = $(this).eq(0);

		// prevent loop get out of control
		if(typeof clockTimer != 'undefined'){
			clearInterval(clockTimer);
		}
		
		// generate basic html
		$.fn.setClock.genHtml(element);
		
		// interval witch control each lap
		clockTimer = setInterval(function(){
			
			// get the time define on the startup
			var time = $.fn.setClock.defaultOptions.time;
			
			if(time == null){
		        clearInterval(clockTimer);
		        element.empty();
				return false;
			}else if(typeof(time) === 'object'){
				var date = time;
		    }else{
		    	var date = new Date(Number(time));
		    }
		    
		    var seconds = date.getSeconds();
		    
		    seconds = seconds+1;
		    date.setSeconds(seconds);
		    
		    seconds = date.getSeconds();
		    seconds = (seconds < 10 ? '0' : '') + seconds;
		    
		    var minutes = date.getMinutes();
		    minutes = (minutes < 10 ? '0' : '') + minutes;
		    
		    var hours = date.getHours();
		    hours = (hours < 10 ? '0' : '') + hours;

		    $.fn.setClock.defaultOptions.time = date;

		    element.find('ul li#hours').html(hours);
		    element.find('ul li#minutes').html(minutes);
		    element.find('ul li#seconds').html(seconds);
		}, 1000);
		
		return this;
	};

	$.fn.setClock.setSettings = function(options) {
		
		if(typeof(options.time) !== 'object'){
			throw new Error("Attr time must be an object!")
		}
		
		$.fn.setClock.defaultOptions = options;
	};

	$.fn.setClock.genHtml = function(el) {
		console.log(this._teste);
		if(el.find('ul li').length == 0){
			el.append('<ul><li id="hours"></li><li>:</li><li id="minutes"></li><li>:</li><li id="seconds"></li></ul>');
		}
	};
	
	$.fn.setClock.defaultOptions = {
		time: new Date()
	};
	
	//Public Functions
	$.fn.setClock.setTime = function(time) {
		$.fn.setClock.defaultOptions.time = time;
	};
	
	$.fn.setClock.destroy = function() {
		$.fn.setClock.defaultOptions.time = null;
	};

})(jQuery);