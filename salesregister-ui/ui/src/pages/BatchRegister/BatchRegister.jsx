import React, { useCallback, useEffect, useState } from 'react';
import Input from '../../components/ui/Form/Input/Input';
import Select from '../../components/ui/Form/Select/Select';


const transactionOptions = [
  { label: "Sales", value: "sales" },
  { label: "Expenses", value: "expenses" }
];

const initialRow = {
  productName: '',
  amount: '',
  tType: ''
}

const BatchRegister = () => {
  const [rows, setRows] = useState([{ ...initialRow }]);

  const addRowHandler = () => {
    setRows([...rows, { ...initialRow }]);
  }

  useEffect(() => {
    console.log("ROWS: ", rows);
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
            key={row.productName + "_" + index}
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
  console.log("OPTIONS: ", data);
  return (
    <div className='row'>
      <Input
        error={""}
        type={"text"}
        label={"Product Name"}
        name={"productName"}
        value={data.productName || ""}
        placeholder={"Product Name"}
        onChangeHandler={(e) => changeHandler(index, "productName", e.target.value)}
      />

      <input type="number" name='amount' value={data.amount || ""} placeholder='Amount' onChange={(e) => changeHandler(index, "amount", e.target.value)}/>

      <Select
        error={""}
        label={"Transaction Type"}
        name={"tType"}
        value={data.tType || ""}
        options={transactionOptions}
        onChangeHandler={(e) => changeHandler(index, "tType", e.target.value)}
      />

      <Input
        error={""}
        value={data.amount || ""}
        type={"number"}
        name={"amount"}
        label={"Amount"}
        placeholder={"Amount"}
        onChangeHandler={(e) => changeHandler(index, "amount", e.target.value)}
      />
    </div>
  );
}