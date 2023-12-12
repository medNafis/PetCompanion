const PetProfile = require('../models/PetProfile');

exports.createPetProfile = async (req, res) => {
    try {
      const petProfile = new PetProfile({
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        healthConditions: req.body.healthConditions,
        behaviorTraits: req.body.behaviorTraits,
        owner: req.body.owner // Assuming owner's ID is passed in the request
      });
  
      await petProfile.save();
      res.status(201).send(petProfile);
    } catch (error) {
      res.status(500).send(error.message);
    }
};

exports.getPetProfile = async (req, res) => {
    try {
      const petProfile = await PetProfile.findById(req.params.id);
      if (!petProfile) return res.status(404).send('Pet profile not found.');
  
      res.send(petProfile);
    } catch (error) {
      res.status(500).send(error.message);
    }
};

exports.updatePetProfile = async (req, res) => {
    try {
      const petProfile = await PetProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!petProfile) return res.status(404).send('Pet profile not found.');
  
      res.send(petProfile);
    } catch (error) {
      res.status(500).send(error.message);
    }
};

exports.deletePetProfile = async (req, res) => {
    try {
      const petProfile = await PetProfile.findByIdAndDelete(req.params.id);
      if (!petProfile) return res.status(404).send('Pet profile not found.');
  
      res.send(petProfile);
    } catch (error) {
      res.status(500).send(error.message);
    }
};

exports.getPetProfilesByOwner = async (req, res) => {
    try {
      const petProfiles = await PetProfile.find({ owner: req.params.ownerId });
      res.send(petProfiles);
    } catch (error) {
      res.status(500).send(error.message);
    }
};
  
  
  