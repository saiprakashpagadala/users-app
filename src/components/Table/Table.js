import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import "./Table.css";

function Table({ data, currentPage, itemsPerPage, onDelete, onEdit }) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editData, setEditData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allCheckboxIndexes = currentItems.map((_, index) => index);
    const allSelected = allCheckboxIndexes.every((index) =>
      selectedRows.includes(index)
    );
    setSelectAll(allSelected);
  }, [currentItems, selectedRows]);

  const handleHeaderCheckboxChange = () => {
    const allCheckboxIndexes = currentItems.map((_, index) => index);
    if (selectedRows.length === allCheckboxIndexes.length) {
      setSelectedRows([]); // Unselect all if all are selected
      setSelectAll(false);
    } else {
      setSelectedRows(allCheckboxIndexes); // Select all checkboxes
      setSelectAll(true);
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData(currentItems[index]); // Set editData to the current row's data
  };

  const handleSaveChanges = () => {
    onEdit(editIndex, editData);
    setEditIndex(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((item) => item !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleDeleteSelected = () => {
    onDelete(selectedRows);
    setSelectedRows([]);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleHeaderCheckboxChange}
              />
            </th>
            <th>Id</th>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{row.id}</td>
              <td>
                {editIndex === index ? (
                  <input
                    name="role"
                    value={editData.role}
                    onChange={handleInputChange}
                  />
                ) : (
                  row.role
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  row.name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  row.email
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button onClick={handleSaveChanges} className="table-actions">
                    <FontAwesomeIcon icon={faFloppyDisk} /> Save
                  </button>
                ) : (
                  <button
                    className="edit-button table-actions"
                    onClick={() => handleEditClick(index)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                )}
                <button
                  className="table-actions"
                  onClick={() => onDelete([index])}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRows.length > 0 && (
      <div>
        <button onClick={handleDeleteSelected}>
          <FontAwesomeIcon icon={faTrashAlt} /> Delete Selected
        </button>
      </div>
      )}
    </div>
  );
}

export default Table;
