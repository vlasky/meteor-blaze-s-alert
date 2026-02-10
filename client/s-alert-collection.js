import { Mongo } from 'meteor/mongo';

// Only client side collections for now.
const sAlertCollection = new Mongo.Collection(null);

export { sAlertCollection };
