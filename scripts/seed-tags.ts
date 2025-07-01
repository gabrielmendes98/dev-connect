import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { TagModel, ITagModel } from '../src/infrastructure/database/mongoose/models/TagModel';
import { connectToMongoDB } from '../src/infrastructure/database/mongoose/MongooseConnectionService';

const initialTags: Partial<ITagModel>[] = [
  {
    _id: uuidv4(),
    name: 'nodejs',
  },
  {
    _id: uuidv4(),
    name: 'typescript',
  },
  {
    _id: uuidv4(),
    name: 'react',
  },
  {
    _id: uuidv4(),
    name: 'ddd',
  },
  {
    _id: uuidv4(),
    name: 'clean-architecture',
  },
  {
    _id: uuidv4(),
    name: 'graphql',
  },
  {
    _id: uuidv4(),
    name: 'docker',
  },
];

const seedTags = async () => {
  console.log('Starting the seed process for Tags...');

  try {
    await connectToMongoDB();
    console.log('MongoDB connection established.');

    for (const tagData of initialTags) {
      await TagModel.findOneAndUpdate(
        { _id: tagData._id },
        { $setOnInsert: { name: tagData.name, usageCount: 0 } },
        { upsert: true, new: true },
      );
      console.log(`- Tag '${tagData.name}' processed with ID: ${tagData._id}`);
    }

    console.log('✅ Tags seed completed successfully!');
  } catch (error) {
    console.error('❌ Error during the seed process:', error);
    process.exit(1);
  } finally {
    console.log('Closing MongoDB connection.');
    await mongoose.disconnect();
  }
};

seedTags();
