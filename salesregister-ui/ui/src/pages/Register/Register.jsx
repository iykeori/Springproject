import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';
import Form from "../../components/ui/Form/Form.jsx";
import Input from "../../components/ui/Form/Input/Input.jsx";
import Select from "../../components/ui/Form/Select/Select.jsx";
import { Link } from "react-router-dom";

const transactionOptions = [
  { label: "Sales", value: "sales" },
  { label: "Expenses", value: "expenses" }
];

const Register = ({ props }) => {
  const [inputs, setInputs] = useState({});
  const [errorInputs, setErrorInputs] = useState({});
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = "http://localhost:8080/api/v1";


  const onChangeHandler = (event) => {
    event.preventDefault();
    //console.log(event.target);
    //i don't understand this -> [event.target.productName]
    setErrorInputs(values => ({ 
      ...values, 
      [event.target.name]: event.target.value.trim().length ? false : true 
    }));

    setInputs(values => {
      return {
        ...values,
        [event.target.name]: event.target.value
      }
    });
  }

  /**
   * Example onChangeHandler by SOFT
   * @param {*} event 
   */
  // const anotherOnChangeHandler = (event) => {
  //   const name = event.target.name; // fetches the input name attribute
  //   const value = event.target.value; // fetches the input value

  //   setInputs(inputs => {
  //     return {
  //       ...inputs,
  //       [name]: value
  //     }
  //   });
  // }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);
      setIsError(false);

      try {
        const transactionRegisterPayload = {
          transactionObjDTO: [
            {
              name: inputs.productName,
              transactionType: inputs.tType,
              amount: inputs.amount
            }
          ]
        };
        const response = await fetch(`${apiUrl}/transaction-record`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionRegisterPayload),
        });

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

  useEffect(() => {
    console.log(inputs);
  }, [inputs])

  useEffect(() => {
    console.log(errorInputs);
  }, [errorInputs])

  function validate() {
    const { productName, amount, tType } = inputs;

    if (!productName) {
      setErrorInputs(values => ({ ...values, productName: true }));
    }

    if (!amount) {
      setErrorInputs(values => ({ ...values, amount: true }));
    }

    if (!tType) {
      setErrorInputs(values => ({ ...values, tType: true }));
    }

    return productName && amount && tType;
  }


  return (
    <div className={styles.registerDiv}>
      <h2>Register Transaction</h2>
      <Form onSubmitHandler={onSubmitHandler}>
        <Input
          error={errorInputs.productName}
          type={"text"}
          label={"Product Name"}
          name={"productName"}
          value={inputs.productName || ""}
          placeholder={"Product Name"}
          onChangeHandler={onChangeHandler}
        />

        <Select
          error={errorInputs.tType}
          label={"Transaction Type"}
          name={"tType"}
          value={inputs.tType || ""}
          options={transactionOptions}
          onChangeHandler={onChangeHandler}
        />

        <Input
          error={errorInputs.amount}
          value={inputs.amount || ""}
          type={"number"}
          name={"amount"}
          label={"Amount"}
          placeholder={"Amount"}
          onChangeHandler={onChangeHandler}
        />
        <Link to="#" className={styles.addProductLink}>Add Product</Link>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </Form>
      {
        isError ? (
          <div className={styles.errorDiv}>
            <p>{message}</p>
          </div>
        ) : null
      }
    </div>


  );
}

export default Register;