import React, {useEffect, useState, useRef} from "react";
import styles from './styles.module.scss';
import Form from "../../components/ui/Form/Form.jsx";
import Input from "../../components/ui/Form/Input/Input.jsx";
import Select from "../../components/ui/Form/Select/Select.jsx";

const transactionOptions = [
    {label: "Sales", value: "sales"},
{label: "Expenses", value: "e   "}
];
const Register = ({ props }) =>{
    const[productName, setProductName] = useState("");
    const[productNameError, setProductNameError] = useState(false);
    const[amount, setAmount] = useState(0);
    const[amountError, setAmountError] = useState(false);
    const[tType, setTType] = useState(0);
    const[tTypeError, setTTypeError] = useState(false);

    const onSubmitHandler = () => {
        if(!productName){
            setProductNameError(true);
        }
        if(!amount){
            setAmountError(true);
        }
        if(!tType){
            setTTypeError(true);
        }

        if(productName && amount && tType){
            console.log(productName, amount, tType);
        }
    }

    const onChangeHandler = (e) => {
        setProductName(e.target.value);
        setAmount(e.target.value);
        setTType(e.target.value);
    }
    
    return (
        <div>
            <h2>Register</h2>
            <Form onSubmitHandler={onSubmitHandler}>
                <Input
                    error={productNameError}
                    type={"text"}
                    label={"Product Name"}
                    value={productName}
                    placeholder={"Product Name"}
                    onChangeHandler={onChangeHandler}
                />

                <Select
                    error={tTypeError}
                    label={"Transaction Type"}
                    value={tType}
                    options={transactionOptions}
                    onChangeHandler={onChangeHandler}
                />  
                    
                <Input
                    error={amountError}
                    value={amount}
                    type={"number"}
                    label={"Amount"}
                    placeholder={"Amount"}
                    onChangeHandler={onChangeHandler}
                />

                <button type="submit">Submit</button>
                
            </Form>
        </div>
    );
}

export default Register;