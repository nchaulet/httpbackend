var HttpRequest = require('../../lib/httprequest');

var chai = require('chai');
chai.should();

describe('HttpRequest', function() {
	describe('#constructor', function() {
		it('should set uid, method, and uri', function() {
			var request = new HttpRequest('GET', '/test');

			request.uid.should.equal('GET/test');
			request.url.should.equal('/test');
			request.method.should.equal('GET');
		});
	});
});