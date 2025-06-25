### Simple and fancy notifications for Meteor with Blaze

**This is a fork of [juliancwirko:s-alert](https://github.com/juliancwirko/meteor-s-alert) v3.1.2**

#### Fork Information
- **Package**: `vlasky:blaze-s-alert` v3.3.0
- **GitHub**: [https://github.com/vlasky/meteor-blaze-s-alert/](https://github.com/vlasky/meteor-blaze-s-alert/)
- **Purpose**: Add Meteor 3.0 support while maintaining Meteor 2.0 compatibility
- **Name change**: From `s-alert` to `blaze-s-alert` to clarify this is for Blaze templating (Meteor now supports multiple view layers)
- **Key enhancement**: All effect CSS files are now bundled in this single package for convenience

#### Original Package Resources
- Website: [https://s-alert.meteorapp.com/](https://s-alert.meteorapp.com/)
- Demo: [https://s-alert-demo.meteorapp.com/](https://s-alert-demo.meteorapp.com/)
- [s-Alert on the Meteor Podcast](https://www.meteorpodcast.com/e/episode-60-the-club-edition/)
- [Pure React UI Component](https://www.npmjs.com/package/react-s-alert)

### sAlert Usage

Add package:

    meteor add vlasky:blaze-s-alert

**Note**: All effects are now included in the main package. You don't need to add separate effect packages.

Then place `{{> sAlert}}` in your main template. Recomended usage:

```handlebars
<body>
    {{> sAlert}}
</body>
```

#### sAlert configuration

sAlert can be configured on the client, be sure to put this inside the /client directory because running it on the server will cause it to crash (more about possible configuration options below). The defaults are below:

```js
Meteor.startup(function () {

    sAlert.config({
        effect: '',
        position: 'top-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
    });

});
```

sAlert is based on a [client-only collection](https://docs.meteor.com/api/collections). It is called `sAlert.collection`. Every sAlert method returns the ID of the alert it has just created.

```js
var warningThatWeWantToCloseLater = sAlert.warning('Please register', {timeout: 'none'});
/* ... */
sAlert.close(warningThatWeWantToCloseLater);
```

#### Fire up your alerts with these methods:

##### Error

    sAlert.error('Your message', configOverwrite);

##### Warning

    sAlert.warning('Your message', configOverwrite);

##### Info

    sAlert.info('Your message', configOverwrite);

##### Success

    sAlert.success('Your message', configOverwrite);

##### Close alert:

    sAlert.close(alertId);

##### Immediately close all alerts:

    sAlert.closeAll();

#### Individual alert configuration

And what is `configOverwrite`? This is an object with all the settings you want to override, on a per-alert basis. For example:

```js
sAlert.error('Boom! Something went wrong!', {effect: 'genie', position: 'bottom-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
```

This particular error will be displayed in different way.

#### Available effects:

All effects are included in the main package:
- scale
- slide
- genie
- jelly
- flip
- bouncyflip
- stackslide

#### Available positions:

- top-left
- bottom-left
- top-right
- bottom-right
- top (full width)
- bottom (full width)

#### Timeout:

You can set up it in miliseconds or use the string `none`.

#### HTML tags

If you want you can use HTML in your message.

```js
sAlert.error('Boom! <br> Something went wrong!', {effect: 'your-effect-name-here', html: true});
```
You can also put it in the main sAlert config.

#### Closing alerts on route change

If you go to another route, in default the alerts should automatically be cleaned up. This works with Iron Router and FlowRouter. However if you want the alerts to persists on route change you should change `onRouteClose` param in your config (example above).

You can even overwrite it in sAlert methods calls. So you can close only some of the alerts on route change. Example:

```javascript
sAlert.warning('Opssss!!! No good! Keep me even when the route changes.', {onRouteClose: false, timeout: 10000});
sAlert.info('Be careful and hide me when the route changes.', {onRouteClose: true, timeout: 10000});
```

#### Stacking alerts

By default your multiple alerts on the screen will appear one after another with shift on top or bottom. You can disable it by stack param. Just set it to false.

```javascript
sAlert.info('Opssss!!! I am full width alert without stacking enabled', {position: 'top'; stack: false});
```
You can also put it in the main sAlert config.

There is an option to set up alerts limit on page and spacing between them.
Sometimes when you use long timeouts (or no timeouts) it is better to use configured limit. So when it will be reached all previous alerts will be cleared immediately.
Instead of using `stack: true` you can pass an object like:

```
...
stack: {
    spacing: 10, // in px
    limit: 3
}
...
```

See full config above.

Remember that if you use `stack.spacing` configuration you probably might want to use offset too, because the first alert will always have 0px spacing from top or bottom. If you use only `stack: true` there will be standard 30px spacing between alerts.

#### Alerts offset

If you want you can set up offset for your alerts. This is useful when you have for example some header and you want your alerts to appear below it. You can set this param in pixels. Default is '0';

```javascript
sAlert.info('Opssss!!! I am displayed below the header which is 70px height', {position: 'top'; offset: '100px'});
```
You can also put it in the main sAlert config.

#### Audio alerts

You can set up your audio 'beeps'. Just configure your audio file path (.mp3 is prefered because it should work in every browser). You can also configure 4 paths for 4 conditions. The best way is to put your audio files in `public` folde. Check the configuration above for more details.

**There is no default audio sample in the package.** You should use sound samples which you know that you have the right to use it.

#### onOpen callback

You can provide an `onOpen` callback function that will be called when an alert is rendered. This is useful for performing actions after the alert DOM is ready, such as:
- Adding event handlers to HTML elements within alerts
- Initializing third-party components
- Setting focus on specific elements
- Tracking analytics events
- Maintaining Content Security Policy (CSP) compliance by avoiding inline handlers

The `onOpen` function receives a data object containing the alert's data, including the alert's DOM id (`data._id`).

```js
sAlert.info('Click <button id="my-button">here</button>', {
    html: true,
    onOpen: function(data) {
        // Use data._id to find the alert element
        var alertElement = document.getElementById(data._id);
        var button = alertElement.querySelector('#my-button');
        if (button) {
            button.addEventListener('click', function() {
                console.log('Button clicked!');
                sAlert.close(data._id);
            });
        }
    }
});
```

#### onClose callback

The `onClose` callback function is called when an alert is closed. In this fork, it now receives a data object containing information about the alert being closed, making it easier to implement custom closing behavior for specific alerts.

```js
sAlert.info('Important notification', {
    onClose: function(data) {
        // data object contains the alert's information
        console.log('Alert closed:', data._id);
        console.log('Alert message was:', data.message);
        
        // Perform custom actions based on the specific alert
        if (data.customField) {
            // Handle special cleanup or tracking
        }
    },
    customField: 'trackingId123'
});
```

### CSS styling

You can override all CSS classes by targeting `s-alert-{{alertType}}.s-alert-effect-{{effectType}}`. The alert type classes are:

    .s-alert-info, .s-alert-success, .s-alert-warning, .s-alert-error

For example, this CSS rule will override the style for `.s-alert-error` when displayed with the `scale` effect:

```css
.s-alert-error.s-alert-effect-scale {
    background: #bada55;  /* your background color here */
    color: #fff  /* your text color here */
}
```

### Your own effects packages

You can prepare your own effect package. As a reference, look at one of the ready-to-use packages, such as [meteor-s-alert-jelly](https://github.com/juliancwirko/meteor-s-alert-jelly). You can create your own animations, but remember to use the `.s-alert-effect-{your-effect-name-here}` prefix. Then you can use it like:

```js
sAlert.error('Boom! Something went wrong!', {effect: 'your-effect-name-here'});
```

Or you can place it in the config:

```js
Meteor.startup(function () {

    sAlert.config({
        effect: 'your-effect-name-here',
        position: 'top-right',
        timeout: 5000
    });

});
```

If you want to have your effect package linked here just let me know.

### Template overwriting

Here is a default template (it will be included when you use the standard `{{> sAlert}}`):

```handlebars
<div class="s-alert-box s-alert-{{condition}} s-alert-{{position}} {{#if effect}}s-alert-is-effect s-alert-effect-{{effect}}{{/if}} s-alert-show" id="{{_id}}" style="{{boxPosition}}">
    <div class="s-alert-box-inner">
        <p>{{message}}</p>
    </div>
    <span class="s-alert-close"></span>
</div>
```

If you want to owerwrite it you should remember to be careful with all used helpers. They should remain in place.
**Here you have an example of overwriting an alert content template** (Place it somewhere in your html files, you can name it as you want):

```handlebars
<template name="sAlertCustom">
    <div class="custom-alert-class s-alert-box s-alert-{{condition}} s-alert-{{position}} {{#if effect}}s-alert-is-effect s-alert-effect-{{effect}}{{/if}} s-alert-show" id="{{_id}}" style="{{boxPosition}}">
        <div class="s-alert-box-inner">
            <div class="alert-header">
                <h1><i class="fa fa-{{sAlertIcon}}"></i> {{sAlertTitle}}</h1>
            </div>
            <div class="alert-content">
                <i class="fa fa-fw fa-cog"></i>
                {{message}}
            </div>
        </div>
        <span class="s-alert-close"></span>
    </div>
</template>
```

#### Usage of custom template

Place `{{> sAlert template='sAlertCustom'}}` in your main template.

#### Custom fields

As you can see in a custom `sAlertCustom` template we have used the `sAlertTitle` custom helper. Now if you want to pass the value to it you should call one of sAlert functions with the first parameter being an object instead of a message string:

```js
sAlert.info({sAlertIcon: 'asterisk', sAlertTitle: 'My custom sAlert field - the title', message: 'My sAlert message here'}, configOverwrite);
```

You can pass as many fields as you like. Remember to add the corresponding helpers in the template. `configOverwrite` works here the same as described above. It is of course optional.

#### Testing

Clone it into `packages` folder and run meteor with:
```
meteor test-packages --driver-package practicalmeteor:mocha vlasky:blaze-s-alert
```

and go to:

```
http://localhost:3000
```

- - -

#### Inspiration:

- [Codrops Article - Notification Styles Inspiration](https://tympanus.net/codrops/2014/07/23/notification-styles-inspiration/)

Thanks a lot for those who report bugs and request changes (especially [@dandv](https://github.com/dandv)). sAlert keeps getting better.

#### Also check out:

- [React with Webpack + Meteor as a backend only](http://julian.io/react-with-webpack-meteor-as-a-backend/)
- [s-alert for React](https://www.npmjs.com/package/react-s-alert)
- [sGrid](https://atmospherejs.com/juliancwirko/s-grid)
- [sId](https://atmospherejs.com/juliancwirko/s-id)
- [sImageBox](https://atmospherejs.com/juliancwirko/s-image-box)
- [sChat - Open Source Live Chat App](https://www.simplechat.support)
- [Scotty Boilerplate](https://github.com/juliancwirko/scotty)
- [PostCSS for Meteor](https://atmospherejs.com/juliancwirko/postcss)


#### Changelog

..see [CHANGELOG.md](https://github.com/vlasky/meteor-blaze-s-alert/blob/master/CHANGELOG.md) file

#### License
MIT
