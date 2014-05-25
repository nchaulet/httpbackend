# Http Backend

Http backend mock module for protractor

## instalation

```shell
npm install httpbackend
```

include angular mock script
https://github.com/angular/bower-angular-mocks

## Simple Usage

```javascript
var HttpBackend = require('httpbackend');
var backend = new HttpBackend(browser);

describe('Test Http backend methods', function() {
	afterEach(function() {
		backend.reset();
	});

	it('Test whenGET with string response', function() {
		backend.whenGET(/result/).respond('raoul');

		browser.get('http://127.0.0.1:8080');

		var result = element(by.binding('result'));
		expect(result.getText()).toEqual('raoul');
  	});

  	it('Test whenPOST with function as response', function() {
        backend.whenPOST(/result/).respond(function(method, url, data) {
            return [200, data];
        });

        browser.get('http://127.0.0.1:8080');

        element(by.css('#buttonPOST')).click();

        var result = element(by.binding('result'));
        expect(result.getText()).toEqual('postedData');
    });
});
```

## Advanced Usage

@TODO

### Workflow

## Development and test

Init project
```shell
bower install
npm install
````

## Licence

MIT