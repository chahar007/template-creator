import React, { useState, useEffect } from "react";
import axios from "axios";
import QuoteModal from "./QuotesModal";
import styles from "./Quotes.module.scss"; // Import SCSS module
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { QUOTES } from "../../../assets/constants/app.constant";

const QuotesList = () => {
  const [quotes, setQuotes] = useState(QUOTES);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Example code for fetching quotes from an API
    // axios
    //   .get("YOUR_GET_QUOTES_API_ENDPOINT")
    //   .then((response) => {
    //     setQuotes(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("There was an error fetching the quotes!", error);
    //   });
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={styles.quotesContainer}>
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">Quotes</h2>
        <button className="btn btn-primary mb-3" onClick={toggleModal}>
          Upload CSV
        </button>
      </div>
      <table className={`table table-striped ${styles.quotesTable}`}>
        <thead>
          <tr key={"head"}>
            <th scope="col">S.No</th>
            <th scope="col">Category</th>
            <th scope="col">Title</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr key={quote.id}>
              <td>{index + 1}</td>
              <td>{quote.category}</td>
              <td>{quote.title}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-2">Edit</button>
                <button className="btn btn-danger btn-sm mx-2">Delete</button>
              </td>
              {/* Add action buttons as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <QuoteModal toggleModal={toggleModal} />}
    </div>
  );
};

export default QuotesList;
