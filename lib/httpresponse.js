var HttpResponse = function(request) {
	this.request = request;
	this.onResponse = function() {};
};

HttpResponse.prototype.respond = function(data) {
	this.data = data;
	this.onResponse();
};

module.exports = HttpResponse;