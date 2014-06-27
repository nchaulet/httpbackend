var HttpRequest  = require('./httprequest.js'),
    HttpResponse = require('./httpresponse.js'),
    JavascriptBuilder = require('./javascriptbuilder.js'),
    _            = require('lodash');

/**
* HttpBackend
*/
var HttpBackend = function(browser, options) {
    this.browser = browser;
    this.browserGet = this.browser.get;
    this.options = options;
    this.flow = this.browser.driver.controlFlow;
    if (!this.options || this.options == 'undefined') {
        this.options = {};
    }

    if (!_.isBoolean(this.options.autoSync)) {
        this.options.autoSync = true;
    }

    this.reset();
};

HttpBackend.prototype.reset = function() {
    this.isInitialized = false;
    this.clear();
    this._init();
};

HttpBackend.prototype.clear = function() {
    this.responses = [];
    this.browser.get = this.browserGet;
    if (this.isInitialized) {
        this.browser.removeMockModule('httpBackendMock');
    }
};

HttpBackend.prototype.when = function(url) {
    return this._when('', url);
};

HttpBackend.prototype.whenGET = function(url) {
    return this._when('GET', url);
};

HttpBackend.prototype.whenPOST = function(url) {
    return this._when('POST', url);
};

HttpBackend.prototype.whenPUT = function(url) {
    return this._when('PUT', url);
};

HttpBackend.prototype.whenDELETE = function(url) {
    return this._when('DELETE', url);
};

HttpBackend.prototype.whenHEAD = function(url) {
    return this._when('HEAD', url);
};

HttpBackend.prototype.whenJSONP = function(url) {
    return this._when('PATCH', url);
};

HttpBackend.prototype.whenHEAD = function(url) {
    return this._when('JSONP', url);
};

HttpBackend.prototype.init = function() {

    this.isInitialized = true;
    var jsBuilder = new JavascriptBuilder();
    jsBuilder.responses = this.responses;
    return this.browser.addMockModule('httpBackendMock', jsBuilder.toString(true));
};

HttpBackend.prototype.sync = function() {
    var jsBuilder = new JavascriptBuilder();
    jsBuilder.responses = this.responses;
    this.browser.driver.executeScript(jsBuilder.toString());
};

HttpBackend.prototype._init = function() {
    var _this = this;
    this.browser.get = function(destination, opt_timeout) {
        if (!_this.isInitialized) {
            _this.init();
        }

        _this.browserGet.call(browser, destination, opt_timeout);
    };
};

HttpBackend.prototype._when = function(method, url) {
    var request = new HttpRequest(method, url);
    var response = new HttpResponse(request);

    var responseIndex = _.findIndex(this.responses, function(response) {
        return response.request.uid == request.uid;
    });

    if (responseIndex) {
        this.responses.splice(responseIndex, 1, response);
    } else {
        this.responses.push(response);
    }

    if (this.options.autoSync && this.isInitialized) {
        var _this = this;
        response.onResponse = function() {
            _this.sync();
        };
    }

    return response;
};

module.exports = HttpBackend;
