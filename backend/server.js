const express = require('express'); //Importing the Express module
const axios = require('axios'); //Importing the Axios module

const app = express(); //Creating an instance of the Express module
const port = 3000; //Setting the port number to 3000

const openaiApiKey = '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';

//Defining a route for the root path ("/")
app.get('/', async (req, res) => {
    try {
        // Call the OpenAI API
        const response = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            model: 'gpt-3.5-turbo-instruct',
            prompt: 'Write a one liner about life',
            max_tokens: 50,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openaiApiKey}`,
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