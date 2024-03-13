import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import DataTable from "react-data-table-component";

const Record = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const apiUrl = "http://localhost:8080/api/v1";

    const editHandler = (row) => {
        console.log(row);
    }

    const deleteHandler = (row) => {
        console.log(row);
    }

    for (let i = 0; i < data.length; i++){
        console.log(data[i]);
        setColumns([
            ...columns,
            {
                id: data[i].id,
                selector: (row) => row.id
            },
            {
                name: data[i].name,
                selector: (row) => row.name
            },
            {
                transactionType: data[i].transactionType,
                selector: (row) => row.transactionType
            },
            {
                amount: data[i].amount,
                selector: (row) => row.amount
            },
            {
            action: <div>
                            <button onClick={editHandler}>Edit</button>
                            <button onClick={deleteHandler}>Delete</button>
                    </div>,
                selector: (row) => row.actions
            }
        ])
    }

    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await fetch(`${apiUrl}/transaction-record`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setData(data);
            };
            fetchData();
        }catch(error){
            console.log(error);
        }
    }, []);

    return (
        <div className={styles.main}>
            <h1>Record</h1>
            <DataTable
                columns={columns}
                data={data}
            />
        </div>
    );
};

export default Record;