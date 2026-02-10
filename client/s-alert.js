import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { sAlertCollection } from './s-alert-collection';

// helper functions
const conditionSet = (self, msg, condition, customSettings) => {
    let settings = {};
    const effects = ['jelly', 'genie', 'stackslide', 'scale', 'slide', 'flip', 'bouncyflip'];
    let currentEffect;
    let sAlertId;
    if (!_.isObject(customSettings)) {
        customSettings = {};
    }
    if (_.isObject(msg) && _.isString(condition)) {
        settings = _.extend(settings, self.settings, JSON.parse(JSON.stringify(msg)), {condition: condition}, customSettings);
    }
    if (_.isString(msg) && _.isString(condition)) {
        settings = _.extend(settings, self.settings, {message: msg}, {condition: condition}, customSettings);
    }
    currentEffect = settings && settings.effect;
    if (currentEffect && !_.contains(effects, currentEffect) && typeof console !== 'undefined') {
        console.info(`Invalid effect "${currentEffect}" specified`);
    }
    if (_.isObject(settings) && !_.isEmpty(settings)) {
        sAlertId = sAlert.collection.insert(settings);
    }
    return sAlertId;
};

const EVENTS = 'webkitAnimationEnd oAnimationEnd animationEnd msAnimationEnd animationend';
const sAlertClose = (alertId) => {
    let closingTimeout;
    const alertObj = sAlert.collection.findOne(alertId);
    const onClose = alertObj && alertObj.onClose;
    const invokeOnCloseCb = (data) => {
        // invoke onClose callback
        if (onClose && _.isFunction(onClose)) {
            onClose(data);
        }
    };
    if (document.hidden || document.webkitHidden || !$(`#${alertId}`).hasClass('s-alert-is-effect')) {
        sAlert.collection.remove(alertId);
        invokeOnCloseCb(alertObj);
    } else {
        $(`.s-alert-box#${alertId}`).removeClass('s-alert-show');
        closingTimeout = Meteor.setTimeout(() => {
            $(`.s-alert-box#${alertId}`).addClass('s-alert-hide');
        }, 100);
        $(`.s-alert-box#${alertId}`).off(EVENTS);
        $(`.s-alert-box#${alertId}`).on(EVENTS, () => {
            $(`.s-alert-box#${alertId}`).hide();
            sAlert.collection.remove(alertId);
            Meteor.clearTimeout(closingTimeout);
        });
    }
    // stop audio when closing
    sAlert.audio && sAlert.audio.load();
    sAlert.audioInfo && sAlert.audioInfo.load();
    sAlert.audioError && sAlert.audioError.load();
    sAlert.audioSuccess && sAlert.audioSuccess.load();
    sAlert.audioWarning && sAlert.audioWarning.load();
};

// sAlert object
const sAlert = {
    settings: {
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
        beep: false,
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onOpen: null,
        onClose: _.noop
    },
    collection: sAlertCollection,
    config(configObj) {
        if (_.isObject(configObj)) {
            this.settings = _.extend(this.settings, configObj);
        } else {
            throw new Meteor.Error(400, 'Config must be an object!');
        }
    },
    closeAll() {
        sAlert.collection.find({}).forEach((sAlertObj) => {
            sAlert.collection.remove(sAlertObj._id);
            if (sAlertObj.onClose && _.isFunction(sAlertObj.onClose)) {
                sAlertObj.onClose(sAlertObj);
            }
        });
    },
    close(id) {
        if (_.isString(id)) {
            sAlertClose(id);
        }
    },
    info(msg, customSettings) {
        return conditionSet(this, msg, 'info', customSettings);
    },
    error(msg, customSettings) {
        return conditionSet(this, msg, 'error', customSettings);
    },
    success(msg, customSettings) {
        return conditionSet(this, msg, 'success', customSettings);
    },
    warning(msg, customSettings) {
        return conditionSet(this, msg, 'warning', customSettings);
    }
};

// Backwards compatibility for global usage.
globalThis.sAlert = sAlert;

export { sAlert };
export default sAlert;

// routers clean
Meteor.startup(() => {
    if (typeof Iron !== 'undefined' && typeof Router !== 'undefined') {
        Router.onStop(() => {
            sAlert.collection.remove({onRouteClose: true});
        });
    }
    if (typeof FlowRouter !== 'undefined' && _.isObject(FlowRouter.triggers)) {
        FlowRouter.triggers.enter([() => {
            sAlert.collection.remove({onRouteClose: true});
        }]);
    }
    if (typeof FlowRouter !== 'undefined' && !_.isObject(FlowRouter.triggers)) {
        FlowRouter.middleware((path, next) => {
            sAlert.collection.remove({onRouteClose: true});
            next();
        });
    }
});
