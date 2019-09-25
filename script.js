/*
 *  yahiarefaiea-official-website-beta 1.0.0
 *
 *  I’m a 21 years old handsome guy who grows up in a small town in Syria.
 *  http://beta.yahiarefaiea.com/
 *  hello@yahiarefaiea.com
 *
 *  Last update on: 2018/10/24
 *  ©2018 Yahia Refaiea. all rights reserved.
 */

$(document).ready(function() {
    var input = $('.field').find('input, textarea')
    input.keyup(function() {
        inputTest(this)
    })
})

var Router = {
    wrapper: [],
    location: null,

    //	ROUTE
    route: function(location, callback) {
        Router.location = Router.processLocation(location)

        //	ROUTES
        Router.routes(callback)
    },

    //	PROCESS LOCATION
    processLocation: function(location) {
        if (location === undefined) location = window.location.hash

        return location.replace('#', '')
    },

    //	CALLBACK
    callback: function(callback) {
        setTimeout(function() {
            Router.updateWrapper()
            Router.updateTemplate(Router.wrapper[0])
            window.location.hash = Router.location
            Router.location = null

            //  CALLBACKS
            Router.callbacks(Router.wrapper[0])
            if (typeof callback === 'function' && callback) callback()
        }, 200)
    },

    //	UPDATE TEMPLATE
    updateTemplate: function(template) {
        var templates = $('.template')
        var current = $('.template[data-template=' + template + ']')

        templates.removeClass('current')
        setTimeout(function() {
            templates.hide()
            current.show().addClass('current')
        }, 1120)
    },

    //	UPDATE WRAPPER
    updateWrapper: function(push, pull) {
        if (push) Router.push(push)
        if (pull) Router.pull(pull)

        var wrapper = Router.wrapper.toString().replace(/,/g, ' ')
        $('.wrapper').attr('class', 'wrapper ' + wrapper)
    },

    //	PUSH
    push: function(items) {
        items = items.split(' ')

        for (i = 0; i < items.length; i++) {
            if (!Router.wrapper.includes(items[i]) && items[i] != '')
                Router.wrapper.push(items[i])
        }
    },

    //	PULL
    pull: function(items) {
        items = items.split(' ')

        for (i = 0; i < items.length; i++) {
            if (Router.wrapper.includes(items[i]) && items[i] != '')
                Router.wrapper.splice(Router.wrapper.indexOf(items[i]), 1)
        }
    },

    //	LISTEN
    listen: function() {
        $('.wrapper').on('click', '.router', function(e) {
            Router.route(
                $(this).attr('href'),
                window[$(this).attr('data-callback')]
            )
            e.preventDefault()
        })

        window.addEventListener('popstate', function(e) {
            Router.route(undefined)
        })
    }
}
Router.routes = function(callback) {
    Router.wrapper = []
    var location = Router.location.split('/').filter(Boolean)

    //  HOME
    Router.push('home')

    //  CALLBACK
    Router.callback(callback)
}
Router.callbacks = function(wrapper) {
    if (wrapper == 'secret') secret()
    else if (wrapper == 'opinion') opinion()
    else if (wrapper == 'bucketAll') bucketAll()
    else if (wrapper == 'notFound') notFound()
}
var secretAvailability = true
function secret() {
    if (secretAvailability == true) {
        setTimeout(function() {
            var input = $('.template[data-template=secret] .field').find(
                'input, textarea'
            )

            input.focus()
            Identity.robot()
        }, Identity.duration * 1.25)
    }
}
var opinionAvailability = true
function opinion() {
    if (opinionAvailability == true) {
        setTimeout(function() {
            var input = $('.template[data-template=opinion] .field').find(
                'input, textarea'
            )

            input.focus()
            Identity.robot()
        }, Identity.duration * 1.25)
    }
}

function loadProject() {
    Router.route(undefined, function() {
        //  CALLBACK
        Router.listen()
    })
}

loadProject()
