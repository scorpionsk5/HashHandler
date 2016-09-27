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

        HashHandler = Object.create({
            start: function () {
                if (typeof window.onhashchange === 'object') {
                    window.onhashchange = triggerHandlers;
                }
                else {

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
            }
        });
})(window);