import mongoose, { Schema, Document } from 'mongoose';

export interface ITagModel extends Document {
  name: string;
  usageCount: number;
}

const TagSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
});

export const TagModel = mongoose.model<ITagModel>('Tag', TagSchema);
