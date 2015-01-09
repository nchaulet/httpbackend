var HttpBackend = require('../../lib/httpbackend');

var browserGet = browser.get;
var backend = null;

describe('Test Http backend methods', function() {
    beforeEach(function() {
        backend = new HttpBackend(browser);
    });

    afterEach(function() {
        backend.clear();
    });

    it('Test whenGET with string url', function() {
        backend.whenGET("/result.json").respond('raoul');

        browser.get('/');

        element(by.css('#buttonGET')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('raoul');
    });

    it('Test whenGET with passThrough', function() {
        backend.whenGET("/result.json").passThrough();
        browser.get('/');
        

        element(by.css('#buttonGET')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('resultFromServer');
    });

    it('Test whenGET with string response', function() {
        backend.whenGET(/result/).respond('raoul');

        browser.get('/');
        

        element(by.css('#buttonGET')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('raoul');
    });

    it('Test whenPOST with string response', function() {
        backend.whenPOST(/result/).respond('raoul');
        
        browser.get('/');

        element(by.css('#buttonPOST')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('raoul');
    });

    it('Test whenPOST with function as response', function() {
        backend.whenPOST(/result/).respond(function(method, url, data) {
            return [200, data];
        });

        browser.get('/');

        element(by.css('#buttonPOST')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('postedData');
    });

    it('Test whenPOST with string response', function() {
        backend.whenPOST(/result/).respond('raoulPOST');
        backend.whenGET(/result/).respond('raoulGET');

        browser.get('/');

        element(by.css('#buttonGET')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('raoulGET');

        element(by.css('#buttonPOST')).click();
        expect(result.getText()).toEqual('raoulPOST');
    });
});
