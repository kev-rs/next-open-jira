import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

export interface IEntry extends Entry {};

const entrySchema = new Schema({
  info: { type: String, required: true},
  createdAt: { type: Number, default: Date.now() },
  status: { 
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'completed'],
      message: '{VALUE} - it is not a valid state',
    },
    default: 'pending'
   }
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;
