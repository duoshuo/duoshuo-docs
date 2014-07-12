(function(window, $){

var NAME = function(){
	this.defaultRoot = 'README.md';
	this.defaultIndex = 'index.md';
	
	this.parser = {};
	this.parser['md'] = this.parser['markdown'] = function(rsp){
		this.html(marked(rsp, true));
		document.title = this.find('h1').text();
		
		return this;
	};
	
	this.parser['txt'] = $.fn.text;
	this.parser['html'] = $.fn.html;
};

NAME.prototype.navigate = function(pathname){
	var self = this;
	var url = pathname;
	
	if (pathname === ''){
		url += this.defaultRoot;
	}
	else if (pathname.charAt(pathname.length - 1) === '/'){
		url += this.defaultIndex;
	}
	
	$.ajax({
		url  : url,
	    type: 'GET',
		complete: function(){},
		success: function(rsp, result, xhr){
			var main = $('main');
			
			var matches = url.match(/\.([a-z0-9]+)$/i);
			
			var parser = matches && self.parser[matches[1]] ? self.parser[matches[1]] : self.parser['html'];
			
			parser.call(main, rsp);
		},
		error : function(){
			var main = $('main');
			main.html('<h1>404 Not Found</h1>');
		}
	});
};

NAME.prototype.autoload = function (list, ext){
	list.each(function(){
		var el = $(this);
		$.ajax({
			url  : this.id +'.' + ext,
		    type: 'GET',
			complete: function(){},
			success: function(rsp, result, xhr){
				instance.parser[ext].call(el, rsp);
			}
		});
	});
};

NAME.prototype.dispatch = function(){
	var self = this;
	function router(e){
		var hash = window.location.hash;
		if (hash === ''){
			self.navigate('');
			return false;
		}
		
		var matches = hash.match(/^#!(.*)/i);
		if (matches){
			self.navigate(matches[1]);
			return false;
		}
	}
	
	$(window).on('hashchange', router);
	
	router();
};

window.NAME = NAME;

})(window, jQuery);
