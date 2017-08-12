var routerApp = angular.module('chocolateApp', ['ui.router', 'slickCarousel']);

routerApp.constant('globalVar', {
    "name": "D'Chocolatier",
    "address": "D'Chocolatier, Sector 71, Mohali",
    "number": "+91 - 9815334882",
    "email": "divyavsawhney@gmail.com",
    "days": "Monday-Sunday",
    "timings": "10:00am-07:00pm"
});

routerApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/home');

    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: function($scope) {
                //====================================
                // Slick 1
                //====================================
                $scope.number1 = [1, 2, 3, 4, 5, 6, 7, 8];
                $scope.slickConfig1Loaded = true;
                $scope.updateNumber1 = function() {
                    $scope.slickConfig1Loaded = false;
                    $scope.number1[2] = '123';
                    $scope.number1.push(Math.floor((Math.random() * 10) + 100));
                    $timeout(function() {
                        $scope.slickConfig1Loaded = true;
                    }, 5);
                };
                $scope.slickCurrentIndex = 0;
                $scope.slickConfig = {
                    dots: true,
                    // autoplay: true,
                    initialSlide: 3,
                    infinite: true,
                    autoplaySpeed: 1000,
                    method: {},
                    event: {
                        beforeChange: function(event, slick, currentSlide, nextSlide) {
                            console.log('before change', Math.floor((Math.random() * 10) + 100));
                        },
                        afterChange: function(event, slick, currentSlide, nextSlide) {
                            $scope.slickCurrentIndex = currentSlide;
                        },
                        breakpoint: function(event, slick, breakpoint) {
                            console.log('breakpoint');
                        },
                        destroy: function(event, slick) {
                            console.log('destroy');
                        },
                        edge: function(event, slick, direction) {
                            console.log('edge');
                        },
                        reInit: function(event, slick) {
                            console.log('re-init');
                        },
                        init: function(event, slick) {
                            console.log('init');
                        },
                        setPosition: function(evnet, slick) {
                            console.log('setPosition');
                        },
                        swipe: function(event, slick, direction) {
                            console.log('swipe');
                        }
                    }
                };
            }
        })

        .state('contact', {
            url: '/contact',
            templateUrl: 'contact.html',
            controller: function($scope) {

            }
        })

        .state('events', {
            url: '/events',
            templateUrl: 'events.html'
        })

        .state('blog', {
            url: '/blog',
            templateUrl: 'blog.html'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'about.html',
            controller: function($scope, DataService) {
                var promise = DataService.getAboutUs()
                promise.then(function(result) {
                    $scope.about = result.data[0];
                    // $scope.about_url = result.data.photo;
                }, function(error) {
                    console.log(error);
                });
            }
        })

        // .state('gallery', {
        //     url: '/gallery',
        //     templateUrl: 'gallery.html',
        //     controller: function($scope, DataService) {
        //         console.log('in home');
        //         var promise = DataService.getCategories()
        //         promise.then(function(result) {
        //             $scope.categories = result.data;
        //             $scope.categories.forEach(function(category) {
        //                 category.active = false;
        //             });
        //             $scope.activeCategory = { 'id': 0, 'name': 'All' };
        //         }, function(error) {
        //             console.log(error);
        //         });
        //     }
        // })

        .state('gallery', {
            url: '/gallery',
            abstract: true,
            templateUrl: 'gallery.html',
            controller: function($scope, DataService) {
                var promise = DataService.getCategories()
                promise.then(function(result) {
                    $scope.categories = result.data;
                    $scope.categories.forEach(function(category) {
                        category.active = false;
                    });
                    $scope.activeCategory = { 'id': 0, 'name': 'All' };
                }, function(error) {
                    console.log(error);
                });
            }
        })

        .state('gallery.all', {
            url: '/all',
            templateUrl: 'products-all.html',
            controller: function($scope, DataService) {
                $scope.$parent.activeCategory = { 'id': 0, 'name': 'All' };
            }
        })

        .state('gallery.product', {
            url: '/product/:categoryId',
            templateUrl: 'products.html',
            controller: function($scope, DataService, $stateParams) {
                if ($stateParams.categoryId !== 0) {
                    var promise = DataService.getProducts($stateParams.categoryId)
                    promise.then(function(result) {
                        $scope.products = result.data;
                    });

                    // to handle refresh and history
                    $scope.categories.forEach(function(category) {
                        if ($stateParams.categoryId == category['id']) {
                            $scope.$parent.activeCategory = category;
                        }
                    });
                }
            }
        })

        .state('review', {
            url: '/review',
            templateUrl: 'review.html'
        })

        .state('menu', {
            url: '/menu',
            templateUrl: 'boulange-menu.html',
            controller: function($scope, DataService) {
                // DataService.getCategories();
                var promise = DataService.getCategories()
                promise.then(function(result) {
                    $scope.categories = result.data
                }, function(error) {
                    console.log(error)
                });
            }
        });

    // nested list with custom controller
    // .state('home.list', {
    //     url: '/list',
    //     templateUrl: 'partial-home-list.html',
    //     controller: function($scope) {
    //         $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
    //     }
    // })

    // // nested list with just some random string data
    // .state('home.paragraph', {
    //     url: '/paragraph',
    //     template: 'I could sure use a drink right now.'
    // })

    // // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    // .state('about', {
    //     url: '/about',
    //     views: {
    //         '': { templateUrl: 'partial-about.html' },
    //         'columnOne@about': { template: 'Look I am a column!' },
    //         'columnTwo@about': { 
    //             templateUrl: 'table-data.html',
    //             controller: 'scotchController'
    //         }
    //     }

    // });

});

routerApp.controller('rootController', function($scope, globalVar) {

    $scope.globalVar = globalVar;

});

routerApp.service('DataService', ["$http", "$q", function($http, $q) {

    var _getCategories = function() {
        var deferred = $q.defer();
        $http.get("http://localhost:8080/api/categories/")
            .then(function(result) {
                deferred.resolve(result);
            }, function() {
                deferred.reject();
            });
        return deferred.promise;
    }

    var _getProducts = function(category_id) {
        var deferred = $q.defer();
        // console.log(category_id);
        var config = { 'id': category_id };
        $http.post("http://localhost:8080/api/products/", config)
            .then(function(result) {
                deferred.resolve(result);
            }, function() {
                deferred.reject();
            });
        return deferred.promise;
    }

    var _getAboutUs = function() {
        var deferred = $q.defer();
        // console.log(category_id);
        // var config = { 'id': category_id };
        $http.get("http://localhost:8080/api/about_us/")
            .then(function(result) {
                deferred.resolve(result);
            }, function() {
                deferred.reject();
            });
        return deferred.promise;
    }

    return {
        getCategories: _getCategories,
        getProducts: _getProducts,
        getAboutUs: _getAboutUs
    }
}])