const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:Abcd1234@devjams.tnybj.mongodb.net/?retryWrites=true&w=majority&appName=DevJams";
class MongoClientFactory {
    static default() {
        return new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
    }
}

module.exports = MongoClientFactory