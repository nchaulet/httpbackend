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
});