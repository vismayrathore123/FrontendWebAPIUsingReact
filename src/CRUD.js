import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const CRUD = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [isActive, setIsActive] = useState(0);

    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editIsActive, setEditIsActive] = useState(0);

    const empdata = [
        {
            id: 1,
            name: 'Vismay',
            age: 24,
            isActive: 1
        },
        {
            id: 2,
            name: 'Dipesh',
            age: 32,
            isActive: 1
        },
        {
            id: 3,
            name: 'Somesh',
            age: 31,
            isActive: 0
        }
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData=()=>{
        axios.get('https://localhost:7259/api/Employee').
        then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
                })
    }

    const handleEdit = (id) => {
        handleShow();
        // Find the employee with id and set the values for edit
        const employee = empdata.find(emp => emp.id === id);
        setEditId(id);
        setEditName(employee.name);
        setEditAge(employee.age);
        setEditIsActive(employee.isActive);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
        }
    };

    const handleUpdate = () => {
        // Update the employee in the data
        const updatedData = data.map(item => {
            if (item.id === editId) {
                return {
                    ...item,
                    name: editName,
                    age: editAge,
                    isActive: editIsActive
                };
            }
            return item;
        });
        setData(updatedData);
        handleClose();
    };

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Name "
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Age "
                            value={age} onChange={(e) => setAge(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="checkbox"
                            checked={isActive === 1 ? true : false}
                            onChange={(e) => setIsActive(e.target.checked ? 1 : 0)} />
                        <label>isActive</label>
                    </Col>
                    <Col>
                        <Button onClick={handleUpdate} variant="primary">Submit</Button>
                    </Col>
                </Row>
            </Container>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>
                                <Button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</Button>&nbsp;
                                <Button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )) : 'Loading...'}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="Enter Name "
                                value={editName} onChange={(e) => setEditName(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Enter Age "
                                value={editAge} onChange={(e) => setEditAge(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="checkbox"
                                checked={editIsActive === 1 ? true : false}
                                onChange={(e) => setEditIsActive(e.target.checked ? 1 : 0)} />
                            <label>isActive</label>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CRUD;
