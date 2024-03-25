import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from '../../components/ui/Form/Input/Input';
import Select from '../../components/ui/Form/Select/Select';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import Icon from '../../util/icons';


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

  useEffect(() => {
    const tempRows = [...rows];
    tempRows[0]["productName"] = initialData.productName;
    tempRows[0]["amount"] = initialData.amount;
    tempRows[0]["tType"] = initialData.tType;
    setRows(tempRows);
  }, []);

  useEffect(() => {

  }, [rows]);

  const removeRow = (index) => {
    if (rows.length > 1) {
      const tempRows = [...rows];
      tempRows.splice(index, 1);
      setRows(tempRows);
    }
  }

  const onSubmitHandler = () => {
    console.log("ROWS: ", rows);
  }

  const validate = () => {

  }

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
            changeHandler={fieldChangeHandler}
            onClickHandler={() => removeRow(index)} />
        ))
      }
      <button
        type="button"
        onClick={addRowHandler}>Add Row</button>
      
      <button onClick={onSubmitHandler}>Submit</button>
    </div>
  );
}

export default BatchRegister;

const Row = ({ index, data, changeHandler, onClickHandler }) => {

  return (
    <div className={styles.row}>
      <Input
        mainClassName={styles.container}
        className={styles.input}
        error={data.error}
        type={"text"}
        name={"productName"}
        value={data.productName}
        placeholder={"Product Name"}
        onChangeHandler={(e) => changeHandler(index, "productName", e.target.value)}
      />

      <Select
        mainClassName={styles.container}
        className={styles.select}
        error={data.error}
        name={"tType"}
        value={data.tType || ""}
        options={transactionOptions}
        placeholder={"Transaction Type"}
        onChangeHandler={(e) => changeHandler(index, "tType", e.target.value)}
      />

      <Input
        mainClassName={styles.container}
        className={styles.input}
        error={data.error}
        value={data.amount || ""}
        type={"number"}
        name={"amount"}
        placeholder={"Amount"}
        onChangeHandler={(e) => changeHandler(index, "amount", e.target.value)}
      />

      <Icon
        className={styles.icon}
        name="close"
        strokeColor={"#0058fc"}
        strokeWidth={"2"}
        onClickHandler={onClickHandler} />
    </div>
  );
}