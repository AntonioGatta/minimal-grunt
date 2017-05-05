/*
 * @author Antonio Gatta <a.gatta@xeader.com>
 * @url http://www.xeader.com
 * @copyright Copyright (c) 2017
 * @license All right reserved
 */

/* global jQuery, window, document, app */

(function ($, window, document) {
    'use strict';

    app.footer = {
        init: function () {

        }
    };

    if (window.app === undefined) {
        window.app = app;
    } else {
        window.app = $.extend(true, app, window.app);
    }

    app.footer.init();

}(jQuery, window, window.document));
