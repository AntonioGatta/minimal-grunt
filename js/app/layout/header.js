/*
 * @author Antonio Gatta <a.gatta@xeader.com>
 * @url http://www.xeader.com
 * @copyright Copyright (c) 2017
 * @license All right reserved
 */

/* global jQuery, window, document, app, Foundation */

(function ($, window, document) {
    'use strict';

    app.header = {
        init: function () {

        }
    };

    if (window.app === undefined) {
        window.app = app;
    } else {
        window.app = $.extend(true, app, window.app);
    }

    app.header.init();

}(jQuery, window, window.document));
