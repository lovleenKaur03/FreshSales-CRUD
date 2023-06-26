const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const API_KEY = '9gakN_v87qGhZIFQ9KcHFw';
const CRM_DOMAIN = 'xyz1-593398433869404976.myfreshworks.com';

// Create a contact
app.post('/createContact', async (req, res) => {
  const { first_name, last_name, email, mobile_number, data_store } = req.body;

  try {
    let response;

    
    if (data_store === 'CRM') {
        response = await axios.post(
          `https://${CRM_DOMAIN}/crm/sales/api/contacts`,
          {
            first_name,
            last_name,
            email,
            mobile_number,
          },
          {
            headers: {
              Authorization: `Token token=${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        return res.status(400).json({ error: 'Invalid data_store value' });
      }
  
    

    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve a contact
app.get('/getContact', async (req, res) => {
  const {id, data_score} = req.body;

  try {
    let response;

    
    if (data_store === 'CRM') {
        response = await axios.get(
          `https://${CRM_DOMAIN}/crm/sales/api/contacts/${id}`,
          {
            headers: {
              Authorization: `Token token=${API_KEY}`,
            },
          }
        );
      } else {
        return res.status(400).json({ error: 'Invalid data_store value' });
      }
   
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a contact
app.put('/updateContact', async (req, res) => {
  const { id, new_email, new_mobile_number, data_store } = req.body;

  try {
    let response;

    
    if (data_store === 'CRM') {
        response = await axios.put(
          `https://${CRM_DOMAIN}/crm/sales/api/contacts/${id}`,
          {
            email: new_email,
            mobile_number: new_mobile_number,
          },
          {
            headers: {
              Authorization: `Token token=${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        return res.status(400).json({ error: 'Invalid data_store value' });
      }
    

    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a contact
app.delete('/deleteContact', async (req, res) => {
    const { id, data_store } = req.body;
  
    try {
      let response;
  
      if (data_store === 'CRM') {
        response = await axios.delete(
          `https://${CRM_DOMAIN}/crm/sales/api/contacts/${id}`,
          {
            headers: {
              Authorization: `Token token=${API_KEY}`,
            },
          }
        );
      } else {
        return res.status(400).json({ error: 'Invalid data_store value' });
      }
  
      return res.json(response.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  