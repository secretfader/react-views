var path  = require('path')
,   clean = require('js-beautify').html
,   jsx   = require('node-jsx')
,   React = require('react');

class View {
  constructor (options) {
    options = options || {};

    this.cache  = options.cache || true;
    this.markup = options.markup || '<!doctype html>';
    this.path   = options.path || process.cwd();
    this.pretty = options.pretty || false;

    jsx.install(options.jsx || { extension: '.jsx' });

    this.configured = true;
  }

  render (template, locals) {
    let self = this;
    locals = locals || {};

    if (!self.configured) self.configure();

    return new Promise(function (resolve, reject) {
      if (self.cache[template] && self.cache) {
        return resolve(self.cache[template]);
      }

      let view   = require(path.join(self.path, template))
      ,   output = [];

      view = view.default || view;
      view = React.createFactory(view);

      output.push(self.markup, React.renderToStaticMarkup(view(locals)));

      output = output.join('');
      if (self.pretty) output = clean(output);

      resolve(output);
    });
  }
}

View.cache = {};

module.exports = function (options) {
  return new View(options);
};
