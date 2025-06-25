### Changelog

#### v3.3.0 (vlasky:blaze-s-alert fork)
- Forked from juliancwirko:s-alert v3.1.2 (skipped v3.2.0 due to bugs)
- Added Meteor 3.0 support while maintaining Meteor 2.0 compatibility
- Renamed package from `s-alert` to `blaze-s-alert` to clarify Blaze-specific implementation
- Consolidated all effect CSS files into main package for convenience:
  - Includes scale, slide, genie, jelly, flip, bouncyflip, and stackslide effects
  - No need to install separate effect packages anymore
- Added `onOpen` callback function:
  - Called when alert DOM is rendered and ready
  - Receives alert data object with DOM id accessible as `data._id`
  - Useful for adding event handlers, initializing components, analytics, etc.
- Enhanced `onClose` callback function:
  - Now receives alert data object as parameter for easier custom closing behavior
  - Allows access to alert-specific information when implementing cleanup or tracking
- Updated package name in tests and documentation

#### v3.1.2 (last version from juliancwirko:s-alert)
- separation of positions logic - there was a problems when you wanted use many alerts positions at the same time [#35](https://github.com/juliancwirko/meteor-s-alert/issues/35)

#### v3.1.1
- stack up limit improvements [#31](https://github.com/juliancwirko/meteor-s-alert/issues/31)

#### v3.1.0
- clear audio on close by hand [#25](https://github.com/juliancwirko/meteor-s-alert/issues/25)
- stack up spacing & limit [#31](https://github.com/juliancwirko/meteor-s-alert/issues/31)

#### v3.0.0
- old API cleanup
- Audio alerts

#### v2.4.2
- Error object parse fix [#29](https://github.com/juliancwirko/meteor-s-alert/issues/29)

#### v2.4.1
- Router clearing option - Flow Router new triggers API adjustments

#### v2.4.0
- `stack` param - enable/disable stacking feature
- `offset` param - top or bottom offset of the first alert on screen. In pixels. Default '0'

#### v2.3.5
- `onRouteClose` param - you can decide whether you want to close your alerts (or particular ones) when your route changes (default true)

#### v2.3.4
- Some fixes related to template overwrite

#### v2.3.2, v2.3.3
- Some tests added

#### v2.3.1
- Iron Router clear fix

#### v2.3.0
- displaying more than one alert ([#7](https://github.com/juliancwirko/meteor-s-alert/issues/7))

#### v2.2.0
- now you can use HTML in your messages (thanks to [@gibex](https://github.com/gibex))

#### v2.1.1
- console info fix ([#12](https://github.com/juliancwirko/meteor-s-alert/issues/12))
- sAlert init functions now returns alert id ([#15](https://github.com/juliancwirko/meteor-s-alert/issues/15))

#### v2.1.0
- Postition names changed; example: 'right-bottom' is now 'bottom-right' etc. (The old names will work too, for backwards compatibility, but will be removed in v3.0.0.)
- CSS class names changed; example: '.s-alert-blue' is now '.s-alert-info', coresponding to sAlert.info(...) etc.
- two new positions: 'top' and 'bottom', for full-width alerts; they work for all effects
- timeout 'no' is now 'none' ('no' is deprecated and will work but will be removed in v3.0.0)

#### v2.0.0
- factor out effects into separate packages