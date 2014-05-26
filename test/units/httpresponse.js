var HttpResponse = require('../../lib/httpresponse');

var chai = require('chai');
chai.should();

var mockedRequest = {
	uid: 'GET/test',
	uri: 'test',
	method: 'GET'
};

describe('HttpResponse', function() {
	describe('#respond', function() {
		it('should set data', function() {
			var response = new HttpResponse(mockedRequest);

			response.respond('test');
			response.data.should.equal('test');
		});
	});

	describe('#buildContext', function() {
		it('should return context with data', function() {
			var response = new HttpResponse(mockedRequest);

			response.respond('test');
			response.buildContext().should.equal("window.httpBackendContext.context['GET/test'] = function () {\n\t\t\treturn [200, \"test\"];\n\t\t};");
		});
	});

	describe('#buildResponse', function() {
		it('should return response', function() {
			var response = new HttpResponse(mockedRequest);

			response.buildResponse().should.equal("respond(function(method, url, data) { return window.httpBackendContext.context['GET/test'](method, url, data);})");
		});
	});
});