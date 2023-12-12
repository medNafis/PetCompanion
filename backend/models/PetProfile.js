const mongoose = require('mongoose');

const PetProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    healthConditions: [String],
    behaviorTraits: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
  }
  // Add more fields as needed
});

module.exports = mongoose.model('PetProfile', PetProfileSchema);
