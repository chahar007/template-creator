import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import apiService from "../../../config/services/TemplateService"; // Import your API service

const TemplateSelection = () => {
  const [dropdownData1, setDropdownData1] = useState([]);
  const [dropdownData2, setDropdownData2] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data1 = await apiService.fetchDropdownData1();
      setDropdownData1(data1);
      const data2 = await apiService.fetchDropdownData2();
      setDropdownData2(data2);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback data in case of API failure
      setDropdownData1([
        { id: 1, value: "default1", label: "Default Option 1" },
      ]);
      setDropdownData2([
        { id: 1, value: "default2", label: "Default Option 2" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Template Creation Page</h2>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="dropdown1">
              <Form.Label>Select Option 1:</Form.Label>
              <Form.Control as="select">
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  dropdownData1.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Group controlId="dropdown2">
              <Form.Label>Select Option 2:</Form.Label>
              <Form.Control as="select">
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  dropdownData2.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TemplateSelection;
