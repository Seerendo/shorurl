import mongoose from 'mongoose';

export async function runDBMongo(uri: string) {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
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
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
