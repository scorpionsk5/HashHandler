/*
MIT License

Copyright (c) 2016 Shashi Kumar D

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function (window) {

    // Variable to store previous hash value.
    var prevHash = '',

        // Object to store Handlers in eventType array.
        registeredHandlers = {
            changed: [],
            preChange: []
        },

        // Helper Method to extend first order properties of objects.
        extend = function () {
            var newObject = {};
            for (var idx in arguments) {
                for (var objName in arguments[idx]) {
                    newObject[objName] = arguments[idx][objName];
                };
            };

            return newObject;
        },

        // Method to get default config.
        getDefaultConfig = function () {
            return {
                canRepeat: false
            };
        },

        // Method to find index of handler.
        findIndex = function (handler, eventType) {
            return registeredHandlers[eventType].indexOf(handler);
        },

        // Method to route and trigger handlers.
        triggerHandlers = function (eventType, e) {
            var me = this,
                args = {
                    e: e || {},
                    prevHash: prevHash,
                    newHash: me.getHash()
                };

            if (me.config.canRepeat || args.newHash !== args.prevHash) {
                registeredHandlers[eventType].forEach(function (handler) {
                    (typeof handler === 'function') && handler(args);
                });
            };

            prevHash = me.getHash();
        },

        // Methor to remove '#' from hashString.
        trimHashString = function (hashString) {
            if (hashString[0] === '#')
                hashString = hashString.substring(1, hashString.length);
            return hashString;
        },

        // HashHandler object.
        hashHandler = Object.create({
            // Method to initialize hashHandler by adding event listeners.
            start: function (config) {
                var hashString = window.document.location.hash;

                this.config = extend(getDefaultConfig(), config || {});

                if (typeof window.onhashchange === 'object') {  // For onhashchange supported browsers.
                    window.onhashchange = triggerHandlers.bind(this, 'changed');
                }
                else {  // For onhashchange non-supported browsers.
                    // TODO: Non-supported browser implementation.
                };

                prevHash = hashString ? trimHashString(hashString) : '';
            },

            // Events.
            changed: {
                // Method to add handler for changed event.
                addHandler: function (handler) {
                    if (findIndex(handler, 'changed') == -1) {
                        registeredHandlers['changed'].push(handler);
                    };
                },

                // Method to remove handler for changed event.
                removeHandler: function (handler) {
                    var index = findIndex(handler, 'changed');
                    if (index > -1) {
                        registeredHandlers['changed'].splice(index, 1);
                    };
                },
            },

            // Events.
            preChange: {
                // Method to add handler for preChange event.
                addHandler: function (handler) {
                    if (findIndex(handler, 'preChange') == -1) {
                        registeredHandlers['preChange'].push(handler);
                    };
                },

                // Method to remove handler for preChange event.
                removeHandler: function (handler) {
                    var index = findIndex(handler, 'preChange');
                    if (index > -1) {
                        registeredHandlers['preChange'].splice(index, 1);
                    };
                },
            },

            // Method to reset hashHandler. It clears all event handlers and sets new configurations.
            reset: function (newConfig) {
                for (var eventType in registeredHandlers) {
                    registeredHandlers[eventType] = [];
                };

                this.config = extend(getDefaultConfig(), newConfig || {});
            },

            // Method to get hash value.
            getHash: function () {
                var hashString = window.document.location.hash;
                return hashString ? trimHashString(hashString) : '';
            },

            // Method to set hash value.
            setHash: function (hash) {
                triggerHandlers.call(this, 'preChange');
                window.document.location.hash = hash;
            }
        });

    // Export hashHandler.
    var define = window.define;
    if (define && (typeof define === 'function') && define.amd) {
        define('hashHandler', function () { return hashHandler; });
    }
    else {
        window.hashHandler = hashHandler;
    };

})(window);