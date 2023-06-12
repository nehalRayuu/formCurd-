import React ,{ useEffect, useState}from 'react';
import '../App.css'
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
const Tables = ({formSubmissions,setFormSubmissions}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFormSubmission, setSelectedFormSubmission] = useState(null);
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    city: '',
    state: ''
  });
  // const[formSubmissions,setFormSubmissions] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0)
  const [fullscreen, setFullscreen] = useState(true);
  
  
 
  // console.log(formSubmissions.length)
  useEffect(() => {
    const storedSubmissions = localStorage.getItem('formSubmissions');
  
    if (storedSubmissions) {
      setFormSubmissions(JSON.parse(storedSubmissions));

    }
  
    
  }, [refreshKey]);

  const handleDelete = (index) => {
    const updatedSubmissions = [...formSubmissions];
    console.log(index)
    updatedSubmissions.splice(index, 1);
    // setRefreshKey(prev => prev+1)
    setFormSubmissions(updatedSubmissions);
    localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));
  };

  

  const handleEdit = (index, submission) => {
    setSelectedFormSubmission({ index, ...submission });
    setEditedData({ ...submission });
    setShowModal(true);
    
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFormSubmission(null);
    setEditedData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      city: '',
      state: ''
    });
  };

  const handleFormChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    //  update the form 

   
    const updatedSubmissions = [...formSubmissions];
    updatedSubmissions[selectedFormSubmission.index] = { ...editedData };
    localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));
    setRefreshKey(oldKey => oldKey +1)
    setEditedData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      city: '',
      state: ''
    });
    
    setShowModal(false);
  };

  

 
  

 

  return (
    <div className='table-container'>
      <h2>Table</h2>
      <table className='table'>
        <thead className='table-head'>
          <tr className='table-row'>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className='table-body'>
         
          { formSubmissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.firstName}</td>
              <td>{submission.lastName}</td>
              <td>{submission.phoneNumber}</td>
              <td>{submission.email}</td>
              <td>{submission.gender}</td>
              <td>{submission.dateOfBirth}</td>
              <td>{submission.city}</td>
              <td>{submission.state}</td>
              <td>
                <Button className='btn' size="sm" variant="outline-primary" onClick={() => handleEdit(index ,submission)}>Edit</Button>
                <Button className='btn' size="sm" variant="outline-danger" onClick={() => handleDelete(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      
      <Modal show={showModal} fullscreen={fullscreen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Form Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={editedData.firstName}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={editedData.lastName}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={editedData.phoneNumber}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email ID:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={editedData.gender}
                onChange={handleFormChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={editedData.dateOfBirth}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City:</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={editedData.city}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>State:</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={editedData.state}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tables;


