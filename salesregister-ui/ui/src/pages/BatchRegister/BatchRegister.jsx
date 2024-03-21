import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from '../../components/ui/Form/Input/Input';
import Select from '../../components/ui/Form/Select/Select';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';


const transactionOptions = [
  { label: "Sales", value: "sales" },
  { label: "Expenses", value: "expenses" }
];

const initialRow = {
  productName: '',
  amount: '',
  tType: ''
}

const BatchRegister = (props) => {
  const [rows, setRows] = useState([{ ...initialRow }]);
  const location = useLocation();
  const initialData = location.state?.initialData;

  console.log("STATE: ", initialData);

  const addRowHandler = () => {
    setRows([...rows, { ...initialRow }]);
  }

  useEffect(()=> {
    const tempRows = [...rows];
    tempRows[0]["productName"] = initialData.productName;
    tempRows[0]["amount"] = initialData.amount;
    tempRows[0]["tType"] = initialData.tType;
    setRows(tempRows);
  }, []);

  useEffect(() => {

  }, [rows]);

  const fieldChangeHandler = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  }

  return (
    <div>
      {
        rows.map((row, index) => (
          <Row
            key={index}
            index={index}
            data={row}
            changeHandler={fieldChangeHandler} />
        ))
      }
      <button
        type="button"
        onClick={addRowHandler}>Add Row</button>
    </div>
  );
}

export default BatchRegister;

const Row = ({ index, data, changeHandler }) => {
  return (
    <div className={styles.row}>
      <Input
        error={""}
        type={"text"}
        name={"productName"}
        value={data.productName}
        placeholder={"Product Name"}
        onChangeHandler={(e) => changeHandler(index, "productName", e.target.value)}
      />

      <Select
        error={""}
        name={"tType"}
        value={data.tType || ""}
        options={transactionOptions}
        placeholder={"Transaction Type"}
        onChangeHandler={(e) => changeHandler(index, "tType", e.target.value)}
      />

      <Input
        error={""}
        value={data.amount || ""}
        type={"number"}
        name={"amount"}
        placeholder={"Amount"}
        onChangeHandler={(e) => changeHandler(index, "amount", e.target.value)}
      />
    </div>
  );
}