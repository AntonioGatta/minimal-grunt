/*
 * @author Antonio Gatta <a.gatta@xeader.com>
 * @url http://www.xeader.com
 * @copyright Copyright (c) 2017
 * @license All right reserved
 */

/* global window, document, define, jQuery, setInterval, clearInterval, scrollReveal, Modernizr, Foundation */
(function ($, window, document, scrollReveal, Modernizr, Foundation) {
    'use strict';

    var app = {
        baseUrl: '/',
        raf: window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        },
        mouse: {
            xMousePos: 0,
            yMousePos: 0,
            lastScrolledLeft: 0,
            lastScrolledTop: 0,
            captureMousePosition: function (event) {
                app.mouse.xMousePos = event.pageX;
                app.mouse.yMousePos = event.pageY;
            }
        },
        $document: $(document),
        $window: $(window),
        $body: $('body'),
        customScroll: function (event) {

            var delta = 0;
            if (!event) {
                event = window.event;
            }
            if (event.wheelDelta) {
                delta = event.wheelDelta / 200;
            } else if (event.detail) {
                delta = -event.detail;
            }

            var wheelDistance = function (evt) {
                if (!evt) {
                    evt = event;
                }
                var w = evt.wheelDelta, d = evt.detail;
                if (d) {
                    if (w) {
                        return w / d / 40 * d > 0 ? 1 : -1; // Opera
                    } else {
                        return -d / 3; // Firefox;         TODO: do not /3 for OS X
                    }
                } else {
                    return w / 120; // IE/Safari/Chrome TODO: /3 for Chrome OS X
                }
            };

            delta = wheelDistance(event);

            if (delta) {

                var body = document.body,
                    html = document.documentElement;
                var height = Math.max(body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight) - app.$window.height();
                var scrollTop = window.pageYOffset;
                var finScroll = Math.max(
                    Math.min(
                        scrollTop - parseInt(delta * 100) * 1.5,
                        height
                    ),
                    0
                );
                app.raf.call(window, function () {
                    window.TweenMax.to(window, 1.5, {
                        scrollTo: {y: finScroll, autoKill: true},
                        ease: window.Expo.easeOut,
                        autoKill: true,
                        overwrite: 5
                    });
                });
            }
            if (event.preventDefault) {
                event.preventDefault();
            }
            event.returnValue = false;
        },
        init: function () {

            //document
            $(function () {

                document.onmousewheel = function () {
                    app.customScroll();
                };
                if (document.addEventListener) {
                    document.addEventListener('DOMMouseScroll', app.customScroll, false);
                }

            });

            app.$document.on('ready', function () {
                app.$body.addClass('ready');
            });

            app.$window.on('load', function () {
                app.$body.addClass('loaded').css('opacity', 1);

                // Init ScrollReveal
                window.sr = new scrollReveal({
                    scale: {direction: 'up', power: '0%'},
                    vFactor: 0.01,
                    reset: false
                });

            });

            app.$document.on('mousemove', app.mouse.captureMousePosition);

            app.$window.on('scroll', function () {

                if (app.mouse.lastScrolledLeft !== app.$document.scrollLeft()) {
                    app.mouse.xMousePos -= app.mouse.lastScrolledLeft;
                    app.mouse.lastScrolledLeft = app.$document.scrollLeft();
                    app.mouse.xMousePos += app.mouse.lastScrolledLeft;
                }
                if (app.mouse.lastScrolledTop !== app.$document.scrollTop()) {
                    app.mouse.yMousePos -= app.mouse.lastScrolledTop;
                    app.mouse.lastScrolledTop = app.$document.scrollTop();
                    app.mouse.yMousePos += app.mouse.lastScrolledTop;
                }
            });

            app.$document.on('click', '.scroll-to-fold', function (event) {
                var $to = $(event.currentTarget).parents('.full-screen-header, .alt-menu').first();
                event.preventDefault();
                window.TweenMax.to(window, 1, {
                    scrollTo: {y: $to.outerHeight(), autoKill: true},
                    ease: window.Power4.easeInOut,
                    autoKill: true,
                    overwrite: 1
                });
            });

            app.$window.on('load resize', app.registerMedias);
            app.$document.on('ready', app.registerMedias);
        },
        registerMedias: function (event) {
            var $html = $('html').first();
            $(Object.keys(Foundation.media_queries)).each(function (i, media) {
                $html.toggleClass(
                    'media-' + media,
                    matchMedia(Foundation.media_queries[media]).matches
                );
            });
        },
        isElementInViewport: function (el) {
            var top = el.offsetTop;
            var left = el.offsetLeft;
            var width = el.offsetWidth;
            var height = el.offsetHeight;

            while (el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }

            return (
                top >= window.pageYOffset &&
                left >= window.pageXOffset &&
                (top + height) <= (window.pageYOffset + window.innerHeight) &&
                (left + width) <= (window.pageXOffset + window.innerWidth)
            );
        }
    };

    if (window.app === undefined) {
        window.app = app;
    } else {
        window.app = $.extend(true, app, window.app);
    }

    app.init();
}(jQuery, window, window.document, scrollReveal, Modernizr, Foundation));
