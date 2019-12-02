
function Flow(initial) {
  if (!(this instanceof Flow))
    return new Flow(initial);
  this.plugins = [];
  this.initial = initial;
  return this;
};

Flow.prototype.use = function (plugin) {
  this.plugins.push(plugin);
  return this;
};

Flow.prototype.run = async function () {
  var data = this.initial;
  for (const plugin of this.plugins) {
    data = await plugin(data);
  }
  return data;
};

module.exports = Flow;