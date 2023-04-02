const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const carSchema = new Schema({
  carNumber: { type: String, required: true, unique: true },
  posts: { type: [ObjectId], ref: 'Post' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

carSchema.index(
  { carNumber: 1 },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);

const Car = model('Car', carSchema);

module.exports = Car;
