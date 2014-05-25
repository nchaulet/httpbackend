var HttpBackend = require('../../lib/httpbackend');

var backend = null;

var browserGet = browser.get;

describe('Test Http backend synchronisations methods', function() {
    afterEach(function() {
        browser.get = browserGet;
    });

    it('Test whenGET with auto sync', function() {
        backend = new HttpBackend(browser, { autoSync: true});
        backend.whenGET(/result/).respond('result');

        browser.get('http://127.0.0.1:8080');
        element(by.css('#buttonGET')).click();

        backend.whenGET(/result/).respond('resultAfterInit');
        element(by.css('#buttonGET')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('resultAfterInit');
    });

    it('Test whenGET without auto sync ', function() {
        backend = new HttpBackend(browser, { autoSync: false});
        backend.whenGET(/result/).respond('result');

        browser.get('http://127.0.0.1:8080');

        backend.whenGET(/result/).respond('resultAfterInit');
        element(by.css('#buttonGET')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('result');
    });

    it('Test whenGET without auto sync and manual sync', function() {
        backend = new HttpBackend(browser, { autoSync: false});
        backend.whenGET(/result/).respond('result');

        browser.get('http://127.0.0.1:8080');
        element(by.css('#buttonGET')).click();

        backend.whenGET(/result/).respond('resultAfterInit');
        backend.sync();

        element(by.css('#buttonGET')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('resultAfterInit');
    });

});