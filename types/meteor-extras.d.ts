// Type stubs for Meteor modules and globals not covered by @types/meteor

// meteor/jquery is a Meteor wrapper around jQuery
declare module 'meteor/jquery' {
  export const $: JQueryStatic;
}

// Optional router globals (checked with typeof before use)
declare var Iron: any;
declare var Router: any;
declare var FlowRouter: any;

// Vendor-prefixed document property (deprecated but still checked for compatibility)
interface Document {
  webkitHidden?: boolean;
}

// chai is provided as a global by meteortesting:mocha
declare const chai: Chai.ChaiStatic;
