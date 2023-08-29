import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Table from "./components/Table/Table";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = (query) => {
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.role.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toString().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = (selectedIndexes) => {
    const updatedData = data.filter(
      (_, index) => !selectedIndexes.includes(index)
    );
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleEdit = (index, editedData) => {
    const newData = [...data];
    newData[index] = editedData;
    setData(newData);
    setFilteredData(newData);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <SearchBar handleSearch={handleSearch} />
      {filteredData && filteredData.length === 0 ? (
        <p className="text-styling">No Users Found</p>
      ) : (
        <>
          <Table
            data={filteredData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              {">>"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
