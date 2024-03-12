import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';
import Form from "../../components/ui/Form/Form.jsx";
import Input from "../../components/ui/Form/Input/Input.jsx";
import Select from "../../components/ui/Form/Select/Select.jsx";

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

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (validate()){
            setLoading(true);
            setIsError(false);

            try {
                const transactionRegisterPayload = {
                    name: inputs.productName,
                    transactionType: inputs.tType,
                    amount: inputs.amount
                };
                // const response = await fetch("http://localhost:8080/api/v1/transaction-record", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify(transactionRegisterPayload),
                // });

                // const data = await response.json();
                // console.log(data);
                // if(data.error){
                //     console.log(data.error);
                //     setIsError(true);
                //     setMessage(data.message);
                //     setLoading(false);
                // } else {
                //     setIsError(false);
                //     setLoading(false);

                //     setInputs({});
                   
                // }
            } catch (error) {
                console.log(error.message);
                setIsError(true);
                setLoading(false);
            }
        }

        
    }

    
    

    const onChangeHandler = (event, { name, value }) => {
        event.preventDefault();
        setErrorInputs( values => ({ ...values, [name]: value.length ? false : true}));
        setInputs( values => {
            return {
                ...values,
                [name]: value
            }
        });
    }

   
    
    
    function validate() {
        const { productName, amount, tType } = inputs;

        if (!productName) {
            setErrorInputs( values => ({ ...values, productName: true }));
        }

        if (!amount) {
            setErrorInputs( values => ({ ...values, amount: true }));
        }

        if (!tType) {
            setErrorInputs( values => ({ ...values, tType: true }));
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

                <button type="submit">Submit</button>
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