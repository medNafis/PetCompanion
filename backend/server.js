const express = require('express'); //Importing the Express module
const axios = require('axios'); //Importing the Axios module
const dotenv = require('dotenv'); //Importing the dotenv package
const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/petCare', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const app = express(); //Creating an instance of the Express module
const port = 3000; //Setting the port number to 3000

// Load environment variables from the .env file
dotenv.config();
// Access the OPENAI_API_KEY variable from process.env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const samplePetProfile = {
  name: "Buddy",
  breed: "Golden Retriever",
  age: 3,
  healthConditions: ["sensitive stomach"],
  behaviorTraits: ["energetic", "friendly"]
};

const formulatePrompt = (petProfile) => {
  return `Provide a diet plan for a ${petProfile.age}-year-old ${petProfile.behaviorTraits.join(", ")} ${petProfile.breed} named ${petProfile.name} with ${petProfile.healthConditions.join(" and ")}.`;
};

const prompt = formulatePrompt(samplePetProfile);


//Defining a route for the root path ("/")
app.get('/', async (req, res) => {
    try {
        // Call the OpenAI API
        const response = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            model: 'gpt-3.5-turbo-instruct',
            prompt: prompt,
            max_tokens: 100,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
          }            
    );
    // Extract the generated text from the OpenAI response
    const generatedText = response.data.choices[0]?.text || 'No response from OpenAI';

    // Send the generated text as the response to the client
    res.send(`Generated Text: ${generatedText}`);

    } catch (error) {
        console.error('Error calling OpenAI API:', error.message);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        console.error('Response headers:', error.response?.headers);
        console.error('Response config:', error.response?.config);        
        res.status(500).send('Internal Server Error');
    }
});
//Starting the server and listening for requests on the specified port number
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});