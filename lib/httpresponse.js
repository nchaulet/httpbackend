var HttpResponse = function(request) {
	this.request = request;
	this.isPassThrough = false;
	this.onResponse = function() {};
};

HttpResponse.prototype.respond = function(data) {
	this.data = data;
	this.onResponse();
};

HttpResponse.prototype.passThrough = function() {
	this.isPassThrough = true;
	this.onResponse();
};

module.exports = HttpResponse;