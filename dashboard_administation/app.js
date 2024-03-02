const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8080/api/personnes/personnes');
    const data = response.data;
    res.render('index', { data });
  } catch (error) {
    console.error('Error fetching data from the API:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
// New route for handling form submission
app.post('/add-person', async (req, res) => {
    try {
      const { nom,email, phone, nni,salary,department } = req.body;
  
      // You can use axios or any other method to add the new person to your API
      // Example using axios:
      await axios.post('http://localhost:8080/api/personnes/add-person', {
        nom: nom,
        email: email,
        phone: parseInt(phone),
        nni: parseInt(nni),
        salary: parseInt(salary),
        department: department
      });
  
      // Redirect to the home page after adding the person
      res.redirect('/');
    } catch (error) {
      console.error('Error adding a new person:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/delete-person', async (req, res) => {
    try {
      const { personId } = req.body;
  
      // Make a DELETE request to remove the person from your API
      await axios.delete(`http://localhost:8080/api/personnes/${personId}`);
  
      // Redirect to the home page after deleting the person
      res.redirect('/');
    } catch (error) {
      console.error('Error deleting a person:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
// Route for handling form submission (editing a person)
app.post('/edit-person', async (req, res) => {
  try {
    const { personId, nom,email,phone, nni, salary,department } = req.body;

    // Make a PUT or PATCH request to update the person in your API
    await axios.put(`http://localhost:8080/api/personnes/${personId}`, {
      nom: nom,
      email: email,
      phone: parseInt(phone),
      nni: parseInt(nni),
      salary: parseInt(salary),
      department: department
    });

    // Redirect to the home page after editing the person
    res.redirect('/');
  } catch (error) {
    console.error('Error editing a person:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route for rendering the edit page
app.get('/edit-person/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the details of the person using the provided ID
    const response = await axios.get(`http://localhost:8080/api/personnes/${id}`);
    const person = response.data;
    console.log(res.data);

    // Render the edit page with person details
    res.render('edit', { person });
  } catch (error) {
    console.error('Error fetching person details for edit:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling form submission (editing a person)
app.post('/edit-person', async (req, res) => {
  try {
    const { personId, newName,newEmail, newPhone, newNni,newSalary,newDepartment } = req.body;

    // Make a PUT or PATCH request to update the person in your API
    await axios.put(`http://localhost:8080/api/personnes/${personId}`, {
      nom: newName,
      phone: parseInt(newPhone),
      nni: parseInt(newNni),
      email: newEmail,
      salary: parseInt(newSalary),
      department: parseInt(newDepartment)
    });

    // Redirect to the home page after editing the person
    res.redirect('/');
  } catch (error) {
    console.error('Error editing a person:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
