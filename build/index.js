"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var path = require("path"),
    clean = require("js-beautify").html,
    jsx = require("node-jsx"),
    React = require("react");

var View = (function () {
  function View(options) {
    _classCallCheck(this, View);

    options = options || {};

    this.cache = options.cache || true;
    this.markup = options.markup || "<!doctype html>";
    this.path = options.path || process.cwd();
    this.pretty = options.pretty || false;

    jsx.install(options.jsx || { extension: ".jsx" });

    this.configured = true;
  }

  _createClass(View, {
    render: {
      value: function render(template, locals) {
        var self = this;
        locals = locals || {};

        if (!self.configured) self.configure();

        return new Promise(function (resolve, reject) {
          if (self.cache[template] && self.cache) {
            return resolve(self.cache[template]);
          }

          var view = require(path.join(self.path, template)),
              output = [];

          view = view["default"] || view;
          view = React.createFactory(view);

          output.push(self.markup, React.renderToStaticMarkup(view(locals)));

          output = output.join("");
          if (self.pretty) output = clean(output);

          resolve(output);
        });
      }
    }
  });

  return View;
})();

View.cache = {};

module.exports = function (options) {
  return new View(options);
};