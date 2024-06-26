import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { UserSchema } from '@myIndiaa/main/db/models/user-model';


const mongoServer = new MongoMemoryServer();

export const mongooseClient = mockDeep<typeof mongoose>();

mongooseClient.model.mockImplementation((modelName: string) => {
  switch (modelName) {
    case 'User':
      return mongoose.model('User', UserSchema);
    default:
      throw new Error(`Unknown model: ${modelName}`);
  }
});

beforeEach(async () => {
  mockReset(mongooseClient);
  const uri = await mongoServer.getUri();
  await mongoose.connect(uri);
});
