var path   = require('path')
,   expect = require('chai').expect;

var engine = require('../')({
  path: path.join(__dirname, 'support'),
  cache: false
});

describe('View Engine: Configuration', function () {
  it('should have a method named render', function () {
    expect(engine.render).to.be.a('function');
  });
});

describe('View Engine: Rendering', function () {
  it('should support calling a template by name', function (done) {
    engine.render('layout').then(function (output) {
      expect(output).to.equal('<!doctype html><html lang="en"><head><title></title></head><body><p>Hello, World.</p></body></html>');
      done();
    }).catch(done);
  });

  it('should support passing in locals', function (done) {
    engine.render('layout', { title: 'Hello' }).then(function (output) {
      expect(output).to.equal('<!doctype html><html lang="en"><head><title>Hello</title></head><body><p>Hello, World.</p></body></html>');
      done();
    }).catch(done);
  });
});
