var HttpRequest = function(method, url) {
	var allowedMethods = ['GET', 'PUT', 'HEAD', 'POST', 'DELETE', 'PATCH', 'JSONP', ''];
	this.method = method;

	if (allowedMethods.indexOf(method) < 0) {
		throw new Error('Method not allowed :' + method);
	}
	
	this.url = url;
	this.uid = this.method + url;
};

module.exports = HttpRequest;
