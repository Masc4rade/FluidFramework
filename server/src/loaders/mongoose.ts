import mongoose from 'mongoose';

export default async (): Promise<any> => {
  const connection = await mongoose.connect("mongodb://mongoadmin:a9f17c466d4a958873fe1d88@localhost:3000/test?authSource=admin",);
  return connection.connection.db;
};
