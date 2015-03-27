JavascriptBuilder = function() {
	this.responses = [];
};

JavascriptBuilder.prototype.appendResponse = function(response) {
	this.responses.push(response);
};

JavascriptBuilder.prototype._getInitFunction = function() {
	var initFunction = function() {

        var myAppDev = angular.module('httpBackendMock', ['ngMockE2E']);

        myAppDev.run(['$httpBackend', function($httpBackend) {
            window.httpBackendContext = $httpBackend;
            window.httpBackendContext.context = {};
            var firstSync;
        }]);
    };

    return initFunction;
};

JavascriptBuilder.prototype.toString = function(init) {

	var mockFunction = '';
	this.responses.forEach(function(response) {
		mockFunction += this._buildSyncFunctionForResponse(response);
	}, this);

	if (init && init != 'undefined') {
		mockFunction = '(' + this._getInitFunction().toString().replace(/var firstSync;/, mockFunction) + ')();';
	}

	return mockFunction;
};

JavascriptBuilder.prototype._buildSyncFunctionForResponse = function(response) {
    var mockFunction =  "window.httpBackendContext." + this.buildRequestmethod(response.request) +
        "." + this.buildResponse(response) +";";

    return this.buildContextForResponse(response) + mockFunction;
};

JavascriptBuilder.prototype.buildRequestmethod = function(request) {

	var url;

	if (typeof request.url == 'string') {
		url = '"' + request.url + '"';
	} else {
		url = request.url;
	}

	return 'when' + request.method + "(" + url +")";
};

JavascriptBuilder.prototype.buildResponse = function(response) {

	if (response.isPassThrough) {
		return 'passThrough()';
	}

	return "respond(function(method, url, data, headers) { return window.httpBackendContext.context['" + response.request.uid + "'](method, url, data, headers);})";
};


JavascriptBuilder.prototype.buildContextForResponse = function(response) {
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
