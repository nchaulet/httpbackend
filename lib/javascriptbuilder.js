JavascriptContextBuilder = function() {
	this.javascriptInit = '';
};

JavascriptContextBuilder.prototype.appendResponse = function(response) {

};

JavascriptBuilder.prototype._getInitFunction = function() {
	var initFunction = function() {

        var myAppDev = angular.module('httpBackendMock', ['ngMockE2E']);

        myAppDev.run(function($httpBackend) {
            window.httpBackendContext = $httpBackend;
            window.httpBackendContext.context = {};
            var firstSync;
        });
    };

    return initFunction;
}

JavascriptBuilder.prototype.toString = function() {

	
	if (init) {
		var initFunction = this._getInitFunction();
	}
};

JavascriptContextBuilder.prototype.buildRequestmethod = function(request) {

	if (typeof request.url == 'string') {
		var url = '"' + request.url + '"';
	} else {
		var url = request.url;
	}

	return 'when' + request.method + "(" + url +")";
};

JavascriptContextBuilder.prototype.buildResponse = function(response) {

	if (response.isPassThrough) {
		return 'passThrough()';
	}

	return "respond(function(method, url, data) { return window.httpBackendContext.context['" + response.request.uid + "'](method, url, data);})";
};


JavascriptContextBuilder.prototype.buildContextForResponse = function(response) {
	if (response.isPassThrough) {
		return '';
	}

	var contextFunction = null;

	if (typeof response.data != 'function') {
		contextFunction = function () {
			return [200, data];
		};

		contextFunction = contextFunction.toString().replace(/data/, JSON.stringify(response.data));
	} else {
		contextFunction = response.data.toString();
	}

	return "window.httpBackendContext.context['" + response.request.uid + "'] = " +  contextFunction + ";";
};



module.exports = JavascriptBuilder;