import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { sAlert } from './s-alert';

const getAlertData = (currentData, sAlertPosition) => {
    let positionTop = 0;
    let positionBottom = 0;
    let padding = 0;
    let alerts = {};
    let style;
    let sAlertBoxHTML;
    let sAlertBox;
    let docElement;
    let sAlertBoxHeight;
    const templateOverwrite = currentData && currentData.template;
    let positionTypeTop;
    let positionTypeBottom;
    let stackLimit;
    let alertsCount;
    const checkFirst = (type, objId) => {
        const collectionOfType = sAlertCollection.filter((obj) => {
            return obj.position === type;
        });
        return collectionOfType && collectionOfType[0]._id === objId;
    };
    const positionFunc = (position, positionType, alert, sAlertBox) => {
        padding = alert.stack.spacing || sAlertBox.find('.s-alert-box').css(positionType);
        if (checkFirst(alert.position, alert._id) && alert.offset) {
            position = 0;
            position = position + parseInt(alert.offset);
        }
        if (!checkFirst(alert.position, alert._id) || !alert.stack.spacing) {
            position = position + parseInt(String(padding));
        }
        style = `${positionType}: ${position}px;`;
        position = position + sAlertBoxHeight;
        return position;
    };

    let query = {};
    if (sAlertPosition === 'left') {
        query = {$or: [{position: 'top-left'}, {position: 'bottom-left'}]};
    }
    if (sAlertPosition === 'right') {
        query = {$or: [{position: 'top-right'}, {position: 'bottom-right'}]};
    }
    if (sAlertPosition === 'full-top') {
        query = {position: 'top'};
    }
    if (sAlertPosition === 'full-bottom') {
        query = {position: 'bottom'};
    }
    const sAlertCollection = sAlert.collection.find(query).fetch();

    return sAlertCollection.map((alert) => {
        positionTypeTop = alert.position && /top/g.test(alert.position);
        positionTypeBottom = alert.position && /bottom/g.test(alert.position);
        if (alert.stack) {
            stackLimit = alert.stack && alert.stack.limit;
            alertsCount = sAlert.collection.find(query).count();
            // limit check
            if (stackLimit && alertsCount > stackLimit) {
                sAlert.close(sAlert.collection.findOne(query)._id);
            }
            // checking alert box height - needed to calculate position
            docElement = document.createElement('div');
            $(docElement).addClass('s-alert-box-height');
            if (_.isString(templateOverwrite)) {
                sAlertBoxHTML = Blaze.toHTMLWithData(Template[templateOverwrite], alert);
            } else {
                sAlertBoxHTML = Blaze.toHTMLWithData(Template.sAlertContent, alert);
            }
            sAlertBox = $(docElement).html(sAlertBoxHTML);
            $('body').append(sAlertBox);
            sAlertBoxHeight = sAlertBox.find('.s-alert-box').outerHeight(true);
            if (positionTypeTop) {
                positionTop = positionFunc(positionTop, 'top', alert, sAlertBox);
            }
            if (positionTypeBottom) {
                positionBottom = positionFunc(positionBottom, 'bottom', alert, sAlertBox);
            }
            sAlertBox.remove();
            if (sAlertPosition === 'left') {
                style = `${style}left: ${alert.stack.spacing || sAlertBox.find('.s-alert-box').css('left')}px;`;
            }
            if (sAlertPosition === 'right') {
                style = `${style}right: ${alert.stack.spacing || sAlertBox.find('.s-alert-box').css('right')}px;`;
            }
            alerts = _.extend(alert, {boxPosition: style});
        } else if (alert.offset && positionTypeTop) {
            alerts = _.extend(alert, {boxPosition: `top: ${parseInt(alert.offset)}px;`});
        } else if (alert.offset && positionTypeBottom) {
            alerts = _.extend(alert, {boxPosition: `bottom: ${parseInt(alert.offset)}px;`});
        } else {
            alerts = alert;
        }
        return alerts;
    });
};

Template.sAlert.helpers({
    sAlertDataLeft() {
        return getAlertData(Template.currentData(), 'left');
    },
    sAlertDataRight() {
        return getAlertData(Template.currentData(), 'right');
    },
    sAlertDataFullTop() {
        return getAlertData(Template.currentData(), 'full-top');
    },
    sAlertDataFullBottom() {
        return getAlertData(Template.currentData(), 'full-bottom');
    }
});

Template.sAlertContent.onRendered(function () {
    const data = Template.currentData();
    let sAlertTimeout = data.timeout;
    const beep = data.beep;
    const onOpen = data.onOpen;

    if (onOpen && _.isFunction(onOpen)) {
        onOpen(data);
    }
    // audio
    if (beep && _.isString(beep)) {
        sAlert.audio = new Audio(data.beep);
        sAlert.audio.load();
        sAlert.audio.play();
    }
    if (beep && _.isObject(beep) && data.condition === 'info') {
        sAlert.audioInfo = new Audio(data.beep.info);
        sAlert.audioInfo.load();
        sAlert.audioInfo.play();
    }
    if (beep && _.isObject(beep) && data.condition === 'error') {
        sAlert.audioError = new Audio(data.beep.error);
        sAlert.audioError.load();
        sAlert.audioError.play();
    }
    if (beep && _.isObject(beep) && data.condition === 'success') {
        sAlert.audioSuccess = new Audio(data.beep.success);
        sAlert.audioSuccess.load();
        sAlert.audioSuccess.play();
    }
    if (beep && _.isObject(beep) && data.condition === 'warning') {
        sAlert.audioWarning = new Audio(data.beep.warning);
        sAlert.audioWarning.load();
        sAlert.audioWarning.play();
    }
    if (sAlertTimeout && sAlertTimeout !== 'none') {
        sAlertTimeout = parseInt(sAlertTimeout);
        if (this.sAlertCloseTimeout) {
            Meteor.clearTimeout(this.sAlertCloseTimeout);
        }
        this.sAlertCloseTimeout = Meteor.setTimeout(() => {
            sAlert.close(data._id);
        }, sAlertTimeout);
    }
});
Template.sAlertContent.onDestroyed(function () {
    if (this.sAlertCloseTimeout) {
        Meteor.clearTimeout(this.sAlertCloseTimeout);
    }
});

Template.sAlertContent.events({
    'click .s-alert-close'(e, tmpl) {
        e.preventDefault();
        Meteor.clearTimeout(tmpl.sAlertCloseTimeout);
        sAlert.close(this._id);
    }
});

Template.sAlertContent.helpers({
    isHtml() {
        const data = Template.currentData();
        return data && data.html;
    }
});
