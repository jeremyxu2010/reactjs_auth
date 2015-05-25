var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');

var inherits = require('inherits');

var BaseStore = function(){
    EventEmitter.call(this);
    this._dispatchToken = null;
};

inherits(BaseStore, EventEmitter);

BaseStore.prototype.subscribe = function(actionSubscribe){
    this._dispatchToken = AppDispatcher.register(actionSubscribe());
};

BaseStore.prototype.getDispatchToken = function() {
    return this._dispatchToken;
};

BaseStore.prototype.emitChange = function() {
    this.emit('CHANGE');
};

BaseStore.prototype.addChangeListener = function(cb) {
    this.on('CHANGE', cb)
};

BaseStore.prototype.removeChangeListener = function(cb) {
    this.removeListener('CHANGE', cb);
};

module.exports = BaseStore;