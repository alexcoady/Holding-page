require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'bootstrap'], function (app, $) {
    'use strict';

    var range = function (r_1, r_2, d_1, d_2) {

        var range = {
                "difference": r_2 - r_1,
                "modifier": r_1 * -1
            },
            domain = {
                "difference": d_2 - d_1,
                "modifier": d_1
            },
            multiplier = (domain.difference / range.difference);

        return function (value) {

            value += range.modifier;
            value = value * multiplier;
            value += domain.modifier;

            return value;
        }
    };
    
    // Image hovering stuff
    var projects = $('.project__item');

    for (var i = 0; i < projects.length; i += 1) {

        var project = projects[i];

        bindHover(project);
    }

    function bindHover (project) {

        $(project).on('mouseenter', function (e) {

            var $img = $(project).find('img'),
                
                image_height = $img.attr("height"),
                image_width = $img.attr("width"),
                
                project_height = $(project).height(),
                project_width = $(project).width(),
                
                rangeX = range( 0, project_width, 0, (image_width - project_width ) ),
                rangeY = range( 0, project_height, 0, (image_height - project_height ) );

            $(this).on('mousemove', function (ev) {

                var projectOffset = $(project).offset(),
                    relX = ev.pageX - projectOffset.left,
                    relY = ev.pageY - projectOffset.top; 

                $img.css({
                    "left": -rangeX(relX),
                    "top": -rangeY(relY)
                });
            });  
        });

        $(project).on('mouseleave', function () {

            $(this).off('mousemove');
        });


    }
});