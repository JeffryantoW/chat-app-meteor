import { Mongo } from 'meteor/mongo';

export const ActiveUser = new Mongo.Collection('active_users');