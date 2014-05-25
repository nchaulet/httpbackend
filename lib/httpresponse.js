var HttpResponse = function(request) {
	this.request = request;
	this.passThrough = false;
	this.onResponse = function() {};
};

HttpResponse.prototype.respond = function(data) {
	this.data = data;
	this.onResponse();
};

HttpResponse.prototype.passThrough = function() {
	this.passThrough = true;
	this.onResponse();
};

HttpResponse.prototype.buildContext = function() {
	if (this.passThrough) {
		return '';
	}

	var contextFunction = null;

	if (typeof this.data != 'function') {
		contextFunction = function () {
			return [200, data];
		};

		contextFunction = contextFunction.toString().replace(/data/, JSON.stringify(this.data));
	} else {
		contextFunction = this.data.toString();
	}

	return "window.httpBackendContext.context['" + this.request.uid + "'] = " +  contextFunction + ";";
};

HttpResponse.prototype.buildResponse = function() {

	if (this.passThrough) {
		return 'passThrough()';
	}

	return "respond(function(method, url, data) { return window.httpBackendContext.context['" + this.request.uid + "'](method, url, data);})";
};

module.exports = HttpResponse;