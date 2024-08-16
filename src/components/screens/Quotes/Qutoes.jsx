import React, { useState, useEffect } from "react";
import QuoteModal from "./QuotesModal";
import styles from "./Quotes.module.scss"; // Import SCSS module
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import apiService from "../../../config/services/ApiService";
import { toast } from "react-toastify";
import Loader from "../../shared/components/Loader/Loader";
import CustomPagination from "../../shared/components/CustomPagination"; // Import CustomPagination
import LoadTemplates from "./LoadTemplates";

const QuotesList = () => {
  const [quotes, setQuotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [templates, setTemplates] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [quote, setQuote] = useState(null);
  const [loadImagePreview, setLoadImagePreivew] = useState(false);

  useEffect(() => {
    getQuotes(currentPage); // Fetch quotes for the current page
  }, [currentPage]);

  const getQuotes = async (page) => {
    setIsLoading(true);
    try {
      let quotesData = await apiService.getQuotes({ page });
      setQuotes(quotesData.results || []);
      setTotalPages(quotesData.totalPages || 1); // Set total pages from API response
    } catch {
      console.log("Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = (arg) => {
    if (arg) {
      getQuotes(currentPage);
    }
    setShowModal(!showModal);
  };

  const edit = (data) => {
    setEditData(data);
    toggleModal();
  };

  const deleteQuote = async (id) => {
    try {
      await apiService.deleteQuote(id);
      toast.success("Quote Deleted Successfully!!!");
      getQuotes(currentPage); // Refresh quotes after deletion
    } catch {
      toast.error("Something went wrong please try again!!!");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
  };

  const createTemplate = (quote) => {
    setQuote(quote);
    if (!templates.length) {
      fetchTemplates(quote.category_id, 1);
    } else {
      setLoadImagePreivew(true);
    }
  };

  useEffect(() => {
    if (templates.length > 0) {
      setLoadImagePreivew(true);
    }
  }, [templates]);

  const loadTemplates = () => {};

  const fetchTemplates = async (categoryId, page = 1) => {
    try {
      let tempData = await apiService.getTemplates(categoryId, page);
      setTemplates(tempData?.results || []);
    } catch {
      console.log("Error fetching templates");
    }
  };

  const closePreviewTemplates = () => {
    setLoadImagePreivew(false);
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
            <th scope="col">Quote</th>
            <th scope="col">Quote By</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr key={quote.id}>
              <td>{index + 1}</td>
              <td>{quote.caption}</td>
              <td>{quote.title}</td>
              <td>{quote.quote_by}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => createTemplate(quote)}
                >
                  Create
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <QuoteModal editData={editData} toggleModal={toggleModal} />
      )}

      <Loader isLoading={isLoading} message="Fetching data..." />

      {/* Add Pagination Component */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {loadImagePreview && (
        <LoadTemplates
          data={quote}
          images={templates}
          closePreview={closePreviewTemplates}
        />
      )}
    </div>
  );
};

export default QuotesList;
