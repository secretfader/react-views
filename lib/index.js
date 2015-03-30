var path  = require('path')
,   clean = require('js-beautify').html
,   jsx   = require('node-jsx')
,   React = require('react');

class View {
  constructor (options) {
    this.opts = options || {};

    this.opts.cache  = this.opts.cache || true;
    this.opts.markup = this.opts.markup || '<!doctype html>';
    this.opts.path   = this.opts.path || process.cwd();
    this.opts.pretty = this.opts.pretty || false;

    jsx.install(this.opts.jsx || { extension: '.jsx' });
  }

  flush (key) {
    if (key) return delete View.cache[key];
    View.cache = {};
  }

  render (template, locals) {
    let self = this;
    locals = locals || {};

    return new Promise(function (resolve, reject) {
      if (View.cache[template] && self.opts.cache) {
        return resolve(View.cache[template]);
      }

      let view   = require(path.join(self.opts.path, template))
      ,   output = [];

      view = view.default || view;
      view = React.createFactory(view);

      output.push(self.opts.markup, React.renderToStaticMarkup(view(locals)));

      output = output.join('');
      if (self.pretty) output = clean(output);

      if (self.opts.cache) View.cache[template] = output;

      resolve(output);
    });
  }
}

View.cache = {};

module.exports = function (options) {
  return new View(options);
};
