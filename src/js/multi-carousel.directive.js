(function() {
    'use strict';

    angular
        .module('angularMultiCarousel')
        .directive('multiCarousel', multiCarousel);

    function multiCarousel($animate, $interval) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'template/multi-carousel/multi-carousel.html',
            scope: {
                items: '=',
                interval: '@'
            },
            link: link
        };

        function link(scope, element, attrs) {

            var enabled = true;
            var moving = false;
            var inner = angular.element(element[0].querySelector('inner'));

            // API
            scope.prev = prev;
            scope.next = next;
            scope.enable = enable;
            scope.disable = disable;

            if (attrs.interval && scope.items.length) {
                start();
            }

            function start() {
                $interval(function() {
                    if (enabled) {
                        next();
                    }
                }, attrs.interval);
            }

            function prev() {

                if (moving) {
                    return;
                }

                var item = scope.items.pop();
                scope.items.unshift(item);

                moving = true;

                $animate.addClass(inner, 'prev').then(function() {
                    inner.removeClass('prev');
                    moving = false;
                });
            }

            function next() {

                if (moving) {
                    return;
                }

                var item = scope.items.shift();
                scope.items.push(item);

                moving = true;

                $animate.addClass(inner, 'next').then(function() {
                    inner.removeClass('next');
                    moving = false;
                });
            }

            function enable() {
                enabled = true;
            }

            function disable() {
                enabled = false;
            }

        }
    }

}());
