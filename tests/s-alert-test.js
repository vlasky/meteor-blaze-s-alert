import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { $ } from 'meteor/jquery';
import { sAlert } from 'meteor/vlasky:blaze-s-alert';
import { expect } from 'chai';

const sAlertRender = () => {
    const body = document.getElementsByTagName('body')[0];
    return Blaze.render(Template.sAlert, body);
};

const afterRenderFlush = (done) => {
    Meteor.setTimeout(done, 0);
};

describe('sAlert warning function', function () {
    let renderedView;
    before(function () {
        sAlert.warning('Test warning message...', {timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should be s-alert warning document in the sAlert.collection', function () {
        expect(sAlert.collection.findOne().message).to.equal('Test warning message...');
        expect(sAlert.collection.findOne().condition).to.equal('warning');
    });
    it('should be ".s-alert-warning" element in the DOM', function () {
        expect($('.s-alert-box').length).to.not.equal(0);
        expect($('.s-alert-box').hasClass('s-alert-warning')).to.be.true;
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert success function', function () {
    let renderedView;
    before(function () {
        sAlert.success('Test success message...', {timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should be s-alert success document in the sAlert.collection', function () {
        expect(sAlert.collection.findOne().message).to.equal('Test success message...');
        expect(sAlert.collection.findOne().condition).to.equal('success');
    });
    it('should be ".s-alert-success" element in the DOM', function () {
        expect($('.s-alert-box').length).to.not.equal(0);
        expect($('.s-alert-box').hasClass('s-alert-success')).to.be.true;
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert info function', function () {
    let renderedView;
    before(function () {
        sAlert.info('Test info message...', {timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should be s-alert info document in the sAlert.collection', function () {
        expect(sAlert.collection.findOne().message).to.equal('Test info message...');
        expect(sAlert.collection.findOne().condition).to.equal('info');
    });
    it('should be ".s-alert-info" element in the DOM', function () {
        expect($('.s-alert-box').length).to.not.equal(0);
        expect($('.s-alert-box').hasClass('s-alert-info')).to.be.true;
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert error function', function () {
    let renderedView;
    before(function () {
        sAlert.error('Test error message...', {timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should be s-alert error document in the sAlert.collection', function () {
        expect(sAlert.collection.findOne().message).to.equal('Test error message...');
        expect(sAlert.collection.findOne().condition).to.equal('error');
    });
    it('should be ".s-alert-error" element in the DOM', function () {
        expect($('.s-alert-box').length).to.not.equal(0);
        expect($('.s-alert-box').hasClass('s-alert-error')).to.be.true;
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert close function by alert id', function () {
    let renderedView;
    let sAlertId;
    before(function () {
        sAlertId = sAlert.success('Test close function...', {timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should be s-alert document and element in DOM', function () {
        expect(sAlert.collection.findOne(sAlertId).length).to.not.equal(0);
        expect($('.s-alert-box').length).to.not.equal(0);
    });
    it('should be no s-alert document in the collection after sAlert.close function is called', function () {
        sAlert.close(sAlertId);
        expect(sAlert.collection.findOne(sAlertId)).to.be.undefined;
    });
    it('should be no s-alert element in the DOM after sAlert.close function is called', function () {
        Blaze.remove(renderedView);
        expect($('.s-alert-box').length).to.equal(0);
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert 1000ms timeout', function () {
    let renderedView;
    let sAlertId;
    before(function (done) {
        sAlertId = sAlert.success('Test timeout param...', {timeout: 1000});
        renderedView = sAlertRender();
        Meteor.setTimeout(function () {
            done();
        }, 1500);
    });
    it('should not be s-alert document in the collection after 1500ms', function (done) {
        expect(sAlert.collection.findOne(sAlertId)).to.be.undefined;
        done();
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert 1800ms timeout', function () {
    let renderedView;
    let sAlertId;
    before(function (done) {
        sAlertId = sAlert.success('Test timeout param...', {timeout: 1800});
        renderedView = sAlertRender();
        Meteor.setTimeout(function () {
            done();
        }, 1000);
    });
    it('should be s-alert document in the collection after 1000ms', function (done) {
        expect(sAlert.collection.findOne(sAlertId)).to.not.equal(0);
        done();
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert position bottom-left', function () {
    let renderedView;
    let sAlertId;
    before(function () {
        sAlertId = sAlert.success('Test position...', {position: 'bottom-left', timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should have s-alert-bottom-left class', function () {
        expect($('.s-alert-box').hasClass('s-alert-bottom-left')).to.be.true;
    });
    it('should have document with position bottom-left in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId).position).to.equal('bottom-left');
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert position top-left', function () {
    let renderedView;
    let sAlertId;
    before(function () {
        sAlertId = sAlert.success('Test position...', {position: 'top-left', timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should have s-alert-top-left class', function () {
        expect($('.s-alert-box').hasClass('s-alert-top-left')).to.be.true;
    });
    it('should have document with position top-left in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId).position).to.equal('top-left');
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert position top-right', function () {
    let renderedView;
    let sAlertId;
    before(function () {
        sAlertId = sAlert.success('Test position...', {position: 'top-right', timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should have s-alert-top-right class', function () {
        expect($('.s-alert-box').hasClass('s-alert-top-right')).to.be.true;
    });
    it('should have document with position top-right in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId).position).to.equal('top-right');
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert position bottom-right', function () {
    let renderedView;
    let sAlertId;
    before(function () {
        sAlertId = sAlert.success('Test position...', {position: 'bottom-right', timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should have s-alert-bottom-right class', function () {
        expect($('.s-alert-box').hasClass('s-alert-bottom-right')).to.be.true;
    });
    it('should have document with position bottom-right in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId).position).to.equal('bottom-right');
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert position bottom', function () {
    let renderedView;
    let sAlertId;
    before(function () {
        sAlertId = sAlert.success('Test position...', {position: 'bottom', timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should have s-alert-bottom class', function () {
        expect($('.s-alert-box').hasClass('s-alert-bottom')).to.be.true;
    });
    it('should have document with position bottom in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId).position).to.equal('bottom');
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert position top', function () {
    let renderedView;
    let sAlertId;
    before(function () {
        sAlertId = sAlert.success('Test position...', {position: 'top', timeout: 'none'});
        renderedView = sAlertRender();
    });
    it('should have s-alert-top class', function () {
        expect($('.s-alert-box').hasClass('s-alert-top')).to.be.true;
    });
    it('should have document with position top in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId).position).to.equal('top');
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert offset', function () {
    let renderedView;
    let sAlertId;
    before(function () {
        sAlertId = sAlert.success('Test position...', {position: 'top-right', timeout: 'none', offset: 100});
        renderedView = sAlertRender();
    });
    it('should apply top offset in rendered inline style', function () {
        const el = document.getElementById(sAlertId);
        expect(el).to.exist;
        const topPx = parseInt(el.style.top, 10);
        expect(Number.isNaN(topPx)).to.be.false;
        expect(topPx).to.be.at.least(100);
    });
    it('should have document with offset in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId).offset).to.equal(100);
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert without stacking', function () {
    let renderedView1;
    let renderedView2;
    let sAlertId1;
    let sAlertId2;
    let sa1;
    let sa2;
    before(function () {
        sAlertId1 = sAlert.success('Test position...', {position: 'top', timeout: 'none', stack: false});
        renderedView1 = sAlertRender();
        sAlertId2 = sAlert.success('Test position...', {position: 'top', timeout: 'none', stack: false});
        renderedView2 = sAlertRender();
        sa1 = $('#' + sAlertId1).css('top');
        sa2 = $('#' + sAlertId2).css('top');
    });
    it('should have equal position as the previous one', function () {
        expect(sa1).to.equal(sa2);
    });
    it('should have document with stack set to false in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId1).stack).to.be.false;
        expect(sAlert.collection.findOne(sAlertId2).stack).to.be.false;
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView1);
        Blaze.remove(renderedView2);
    });
});

describe('sAlert with stacking', function () {
    let renderedView1;
    let renderedView2;
    let sAlertId1;
    let sAlertId2;
    let top1;
    let top2;
    before(function () {
        sAlertId1 = sAlert.success('Test position...', {position: 'top', timeout: 'none', stack: true});
        renderedView1 = sAlertRender();
        sAlertId2 = sAlert.success('Test position...', {position: 'top', timeout: 'none', stack: true});
        renderedView2 = sAlertRender();
    });
    it('should have not equal top positions as the previous one', function (done) {
        afterRenderFlush(() => {
            const el1 = document.getElementById(sAlertId1);
            const el2 = document.getElementById(sAlertId2);
            expect(el1).to.exist;
            expect(el2).to.exist;
            top1 = parseInt(el1.style.top, 10);
            top2 = parseInt(el2.style.top, 10);
            expect(Number.isNaN(top1)).to.be.false;
            expect(Number.isNaN(top2)).to.be.false;
            expect(top1).to.not.equal(top2);
            done();
        });
    });
    it('should have document with stack set to true in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId1).stack).to.be.true;
        expect(sAlert.collection.findOne(sAlertId2).stack).to.be.true;
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView1);
        Blaze.remove(renderedView2);
    });
});

describe('sAlert callback onClose by close and closeAll functions', function () {
    let renderedView1;
    let renderedView2;
    let renderedView3;
    let sAlertId1;
    let sAlertId2;
    let sAlertId3;
    let closedData1;
    let closedData2;
    let closedData3;
    before(function () {
        sAlertId1 = sAlert.success('Test onClose callback...', {timeout: 'none', onClose: (data) => {closedData1 = data;}});
        renderedView1 = sAlertRender();
        sAlertId2 = sAlert.success('Test onClose callback...', {timeout: 'none', onClose: (data) => {closedData2 = data;}});
        renderedView2 = sAlertRender();
        sAlertId3 = sAlert.success('Test onClose callback...', {timeout: 'none', onClose: (data) => {closedData3 = data;}});
        renderedView3 = sAlertRender();
    });
    it('should get called with alert data when specifically closing the alert.', function () {
        sAlert.close(sAlertId1);
        expect(closedData1).to.be.an('object');
        expect(closedData1._id).to.equal(sAlertId1);
        expect(closedData2).to.be.undefined;
        expect(closedData3).to.be.undefined;
    });
    it('should get called with alert data when closing all alerts.', function () {
        sAlert.closeAll();
        expect(closedData1._id).to.equal(sAlertId1);
        expect(closedData2._id).to.equal(sAlertId2);
        expect(closedData3._id).to.equal(sAlertId3);
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView1);
        Blaze.remove(renderedView2);
        Blaze.remove(renderedView3);
    });
});

describe('sAlert callback onClose without timeout param', function () {
    let renderedView;
    let sAlertId;
    let closedData;
    before(function (done) {
        expect(sAlert.settings.timeout).to.be.a('number');
        this.timeout(/** @type {number} */ (sAlert.settings.timeout) + 1000);
        sAlertId = sAlert.success('Test onClose callback...', {onClose: (data) => {closedData = data; done();}});
        renderedView = sAlertRender();
    });
    it('should get called with alert data when the default timeout closes the alert.', function (done) {
        expect(closedData).to.be.an('object');
        expect(closedData._id).to.equal(sAlertId);
        done();
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert onClose callback with timeout param', function () {
    let renderedView;
    let sAlertId;
    let closedData;
    before(function () {
        sAlertId = sAlert.success('Test onClose callback...', {timeout: 'none', onClose: (data) => {closedData = data;}});
        renderedView = sAlertRender();
    });
    it('should not get called with infinite timeout', function () {
        expect(closedData).to.be.undefined;
    });
    it('should still have the alert in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId)).to.be.an('object');
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert onClose callback with 1000ms timeout param', function () {
    let renderedView;
    let sAlertId;
    let closedData;
    before(function (done) {
        sAlertId = sAlert.success('Test onClose callback...', {timeout: 1000, onClose: (data) => {closedData = data;}});
        renderedView = sAlertRender();
        Meteor.setTimeout(function () {
            done();
        }, 1500);
    });
    it('should get called with alert data after 1000ms timeout', function (done) {
        expect(closedData).to.be.an('object');
        expect(closedData._id).to.equal(sAlertId);
        done();
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});

describe('sAlert onClose callback with 1800ms timeout param', function () {
    let renderedView;
    let sAlertId;
    let closedData;
    before(function (done) {
        sAlertId = sAlert.success('Test onClose callback...', {timeout: 1800, onClose: (data) => {closedData = data;}});
        renderedView = sAlertRender();
        Meteor.setTimeout(function () {
            done();
        }, 1000);
    });
    it('should not get called before 1800ms timeout', function (done) {
        expect(closedData).to.be.undefined;
        done();
    });
    it('should still have the alert in the collection', function () {
        expect(sAlert.collection.findOne(sAlertId)).to.be.an('object');
    });
    after(function () {
        sAlert.closeAll();
        Blaze.remove(renderedView);
    });
});
