import mongoose from 'mongoose';

export async function runDBMongo(uri: string) {
  try {
    await mongoose.connect(uri, {    
      dbName: 'shorturl',
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch {
    await mongoose.disconnect();
  }
}
