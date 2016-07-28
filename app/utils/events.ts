var events = [];

export var custom_event_utils = {
    _get_event: function (type) {
        var a = events.filter(function (event) {
            return event.type == type;
        });
        return a.length > 0 ? a[0] : null;
    },
    new_event: function (type) {
        if (custom_event_utils._get_event(type)) {
            return false;
        }
        events.push({ type: type, callbacks: [] });
        return true;
    },

    on: function (type, callback) {
        var event = custom_event_utils._get_event(type);
        if (event) {
            event.callbacks.push(callback);
            return true;
        }

        return false;
    },

    un: function (type, callback) {
        var event = custom_event_utils._get_event(type);
        if (event) {
            event.callbacks = event.callbacks.filter(function (cb) {
                return cb != callback;
            });
        }
    },

    trigger: function (type) {
        var event = custom_event_utils._get_event(type);
        var args = Array.prototype.slice.call(arguments, 1);
        if (event) {
            event.callbacks.map(function (callback) {
                callback.call(this, args);
            });
        }
    }
}