/*
 * @author Antonio Gatta <a.gatta@xeader.com>
 * @url http://www.xeader.com
 * @copyright Copyright (c) 2017
 * @license All right reserved
 */

/* global jQuery, window, document, app, TweenLite, TweenMax, Power1, Power2, Foundation */

var page = 'index';

(function ($, window, document, app, page, TweenLite, TweenMax, Foudation) {
    'use strict';

    app[page] = {
        init: function () {

        }
    };

    if (window.app === undefined) {
        window.app = app;
    } else {
        window.app = $.extend(true, app, window.app);
    }

    if (app.$body.is('.' + page) && app[page]) {
        app[page].init();
        app.currentPage = page;
    }

}(jQuery, window, window.document, window.app, page, TweenLite, TweenMax, Foundation));
