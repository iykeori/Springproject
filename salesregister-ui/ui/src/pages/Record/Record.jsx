import React, { useContext, useEffect } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "../../components/ui/Form/Form.jsx";
import Input from "../../components/ui/Form/Input/Input.jsx";
import Select from "../../components/ui/Form/Select/Select.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Edit from "../Edit/Edit.jsx";
import { UpdateRecordContext } from "../../util/context/UpdateRecordContext";

const transactionOptions = [
  { label: "Sales", value: "sales" },
  { label: "Expenses", value: "expenses" }
];
const Record = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [totalSales, setTotalSales] = useState("");
  const [totalExpenses, setTotalExpenses] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  const apiUrl = "http://localhost:8080/api/v1";
  const [row, setRow] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedRecord, setUpdatedRecord] = useState(null);
  // const {hasUpdated, setHasUpdated} = useContext(UpdateRecordContext);

  //const [editRow, setEditRow] = useState({});

  const editHandler = (row) => {
    console.log("SELECTED ROW [EDIT]: ", row);
    setRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditSubmit = (editedData) => {
    // Handle form submit logic here
    console.log('Edited data:', editedData);
    setIsModalOpen(false);
  };


  const deleteHandler = (row) => {
    console.log(row);
  }



  // Component did mount - Cause side effect here...
  useEffect(() => {
    try {
      setData([]);
      const fetchData = async () => {
        const response = await fetch(`${apiUrl}/transaction-record`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setData(data);
        console.log("DATA: ", data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [totalIncome]);

  useEffect(() => {
    if (data.length > 0) {
      console.log("We fetched some data!");
      for (let i = 0; i < data.length; i++) {
        setColumns([
          {
            name: "Record ID",
            selector: (row) => row.id
          },
          {
            name: "Product ID",
            selector: (row) => row.transactionObj[0].id
          },
          {
            name: "Name",
            selector: (row) => row.transactionObj[0].name
          },
          {
            name: "Transaction Type",
            selector: (row) => row.transactionObj[0].transactionType
          },
          {
            name: "Amount",
            selector: (row) => row.transactionObj[0].amount
          },
          {
            name: "Actions",
            selector: (row) => {
              return (
                <div>
                  <button
                    onClick={() => editHandler(row)}
                    className="btn btn-primary"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHandler(row)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>

              )
            }

          }
        ])
      }

    }
  }, [data.length]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${apiUrl}/transaction-record/totalsales`),
          fetch(`${apiUrl}/transaction-record/totalexpenses`),
          fetch(`${apiUrl}/transaction-record/cashathand`)
        ]);

        const data = await Promise.all(responses.map(response => response.json()));

        const [salesData, expensesData, incomeData] = data;

        setTotalSales(salesData);
        setTotalExpenses(expensesData);
        setTotalIncome(incomeData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [updatedRecord]);


  return (
    <div className={styles.main}>
      <h1>Record</h1>
      <DataTable
        columns={columns}
        data={data}
      />
      <div className={styles.summary}>
        <h6>Total Sales: ${totalSales}</h6>
        <h6>Total expenses: ${totalExpenses}</h6>
        <h6>Total Income: ${totalIncome}</h6>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <Edit
          isOpen={isModalOpen}
          onClose={closeModal}
          setUpdatedRecord={setUpdatedRecord}
          //onSubmit={handleEditSubmit}
          transactionOptions={transactionOptions}
          row={row}
        />
      )}
    </div>
  );
};


export default Record;
