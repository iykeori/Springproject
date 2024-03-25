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

const errorFields = {
  productNameError: false,
  amountError: false,
  tTypeError: false,
}

const BatchRegister = (props) => {
  const [rows, setRows] = useState([{ ...initialRow }]);
  const [errors, setErrors] = useState([{ ...errorFields }]);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const initialData = location.state?.initialData;
  const apiUrl = "http://localhost:8080/api/v1";

  const addRowHandler = () => {
    setRows([...rows, { ...initialRow }]);
    setErrors([...errors, { ...errorFields }]);
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
      //  Remove a row
      const tempRows = [...rows];
      tempRows.splice(index, 1);
      setRows(tempRows);

      // Remove a row error fields
      const tempErrors = [...errors];
      tempErrors.splice(index, 1);
      setErrors(tempErrors);
    }
  }

  const onSubmitHandler = async() => {
    if (validate()) {
      try {
        const payload = preparePayload();
  
        const transactionRegisterPayload = {
          transactionObjDTO: payload
        };
  
        const response = await fetch(`${apiUrl}/transaction-record`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionRegisterPayload),
        });
        // console.log("PAYLOAD: ", transactionRegisterPayload);
  
        const data = await response.json();
        console.log(data);
        if (data.error) {
          console.log(data.error);
          setIsError(true);
          setMessage(data.message);
          setLoading(false);
        } else {
          setIsError(false);
          setLoading(false);
  
          setInputs({});
          setErrorInputs({});
  
        }
      } catch (error) {
        console.log(error.message);
        setIsError(true);
        setLoading(false);
        setMessage(error.message); // Just added this
      }
    }
  }

  const preparePayload = () => {
    return rows.map((row) => ({
      name: row.productName,
      transactionType: row.tType,
      amount: row.amount
    }));
  }

  const validate = () => {
    const tempErrors = [...errors];
    let count = 0;

    for (let i=0; i < rows.length; i++) {
      const row = rows[i];

      if (!row.productName) {
        tempErrors[i].productNameError = true;
      } else {
        tempErrors[i].productNameError = false;
      }

      if (!row.amount) {
        tempErrors[i].amountError = true;
      } else {
        tempErrors[i].amountError = false;
      }

      if (!row.tType) {
        tempErrors[i].tTypeError = true;
      } else {
        tempErrors[i].tTypeError = false;
      }

      setErrors(tempErrors);

      if (row.productName && row.amount && row.tType) {
        count ++;
      }
    }

    return rows.length === count;
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
            error={errors[index]}
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

const Row = ({ index, data, error, changeHandler, onClickHandler }) => {

  return (
    <div className={styles.row}>
      <Input
        mainClassName={styles.container}
        className={styles.input}
        error={error.productNameError}
        showErrorText={false}
        type={"text"}
        name={"productName"}
        value={data.productName}
        placeholder={"Product Name"}
        onChangeHandler={(e) => changeHandler(index, "productName", e.target.value)}
      />

      <Select
        mainClassName={styles.container}
        className={styles.select}
        error={error.tTypeError}
        showErrorText={false}
        name={"tType"}
        value={data.tType || ""}
        options={transactionOptions}
        placeholder={"Transaction Type"}
        onChangeHandler={(e) => changeHandler(index, "tType", e.target.value)}
      />

      <Input
        mainClassName={styles.container}
        className={styles.input}
        error={error.amountError}
        showErrorText={false}
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