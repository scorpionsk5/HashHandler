(function (window) {
    var registeredListeners = [],

        findIndex = function (handler) {
            return registeredListeners.indexOf(handler);
        },

        triggerHandlers = function (e) {
            registeredListeners.forEach(function (handler) {
                (typeof handler === 'function') && handler(e);
            });
        },

        hashHandler = Object.create({
            start: function () {
                if (typeof window.onhashchange === 'object') {
                    window.onhashchange = triggerHandlers;
                }
                else {
                    // TODO: Non-supported browser implementation.
                }
            },

            addHandler: function (handler) {
                if (findIndex(handler) == -1) {
                    registeredListeners.push(handler);
                }
            },

            removeHandler: function (handler) {
                var index = findIndex(handler);
                if (index > -1) {
                    registeredListeners.splice(index, 1);
                }
            },

            reset: function () {
                registeredListeners = [];
            }
        });

    // Export Router class.
    if (define && (typeof define === 'function') && define.amd) {
        define('hashHandler', function () { return hashHandler; })
    }
    else {
        window.hashHandler = hashHandler;
    };
})(window);