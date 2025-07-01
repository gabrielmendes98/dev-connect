import mongoose, { Schema, Document } from 'mongoose';

export interface ITagModel extends Document {
  _id: string;
  name: string;
  usageCount: number;
}

const TagSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
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
  },
  {
    _id: false,
    versionKey: false,
    timestamps: true,
  },
);

export const TagModel = mongoose.model<ITagModel>('Tag', TagSchema);
