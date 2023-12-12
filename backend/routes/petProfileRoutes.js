const express = require('express');
const router = express.Router();
const petProfileController = require('../controllers/petProfileController'); // Adjust the path as per your project structure

// POST route to create a new pet profile
router.post('/', petProfileController.createPetProfile);

// GET route to retrieve a pet profile by ID
router.get('/:id', petProfileController.getPetProfile);

// PUT route to update a pet profile by ID
router.put('/:id', petProfileController.updatePetProfile);

// DELETE route to delete a pet profile by ID
router.delete('/:id', petProfileController.deletePetProfile);

// GET route to retrieve all pet profiles for a specific owner
router.get('/owner/:ownerId', petProfileController.getPetProfilesByOwner);

module.exports = router;