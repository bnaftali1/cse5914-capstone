import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState } from "react";
import axios from "axios";
function DisplayModal(props) {
  const { name } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Query Result:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{JSON.stringify(name[0], null, 2)}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function App() {
  const [modalShow, setModalShow] = useState(false);
  //TODO: change state hooks to match the elastic search topic.
  const [name, setName] = useState("");
  const [studentInfo, setStudentInfo] = useState([]);

  //TODO: replace axios API with the elastic search queries.
  const client = axios.create({
    baseURL: "https://directory.osu.edu",
  });

  //TODO: change submit handler to parse the elastic search query.
  const handleSubmit = (e) => {
    e.preventDefault(); //don't refresh page when submitted
    if (name !== "") {
      client.get("/fpjson.php?name_n=" + name).then((response) => {
        setStudentInfo(response.data);
      });
      setName("");
    }
  };

  return (
    <>
      <div className="App">
        <div className="Wrapper">
          <h3 className="SearchBarTitle">ElasticMedia</h3>
          <Form onSubmit={handleSubmit} className="search-bar">
            <InputGroup className="mb-3" size="lg">
              <Form.Control
                placeholder="Search your media"
                aria-label=""
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  if (e.target.value.match(/^[A-Za-z0-9]*$/)) {
                    setName(e.target.value);
                  }
                }}
                value={name}
              />
              <Button
                variant="outline-success"
                type="submit"
                id="button-addon2"
                onClick={() => setModalShow(true)}
              >
                Search
              </Button>
            </InputGroup>
          </Form>
          <DisplayModal
            show={modalShow}
            name={studentInfo}
            onHide={() => {
              setModalShow(false);
              setStudentInfo([]);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
