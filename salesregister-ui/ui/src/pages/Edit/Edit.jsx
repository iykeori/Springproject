import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/Form/Input/Input";
import Select from "../../components/ui/Form/Select/Select";
import Modal from "../../components/ui/Modal/Modal";
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../util/icons";
import { UpdateRecordContext } from "../../util/context/UpdateRecordContext";

const Edit = ({ isOpen, onClose, transactionOptions, row }) => {
  const apiUrl = "http://localhost:8080/api/v1";
  const [inputs, setInputs] = useState({});
  const [errorInputs, setErrorInputs] = useState({});
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUpdated, setHasUpdated] = useContext(UpdateRecordContext);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    event.preventDefault();
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
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      setIsError(false);

      try {
        const transactionRegisterPayload = {
          id: inputs.id,
          transactionObjDTO: [
            {
              id: inputs.ProductId,
              name: inputs.productName,
              transactionType: inputs.tType,
              amount: inputs.amount
            }
          ]
        };
        const editResponse = await fetch(`${apiUrl}/transaction-record/${row.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionRegisterPayload),
        });

        const data = await editResponse.json();
        console.log(data);
        if (data.error) {
          console.log(data.error);
          setIsError(true);
          setMessage(data.error);
          setLoading(false);
        } else {
          setIsError(false);
          setInputs({});
          setErrorInputs({});
          setMessage("Your transaction has been updated successfully");
          setLoading(false);
          setHasUpdated(data);
          navigate("/record");

        }

      } catch (error) {
        console.log(error);
        setIsError(true);
        setLoading(false);
        setMessage(error.message);
      }

    }

  };

  useEffect(() => {
    // console.log("EDIT COMPONENT: ", row);
    const trnsXObj = row.transactionObj[0];
    setInputs({
      id: row.id,
      ProductId: trnsXObj.id,
      productName: trnsXObj.name,
      tType: trnsXObj.transactionType,
      amount: trnsXObj.amount
    })
  }, [row]);

  // const editHandler = () => {
  // console.log(row);
  // const eRow = {
  //     id: row.id,
  //     transactionObjDTO: row.transactionObj[0],
  //     ProductId: row.transactionObj[0].id,
  //     tType: row.transactionObj[0].transactionType,
  //     amount: row.transactionObj[0].amount,
  //     productName: row.transactionObj[0].name
  // }
  // setEditRow(eRow);
  // setInputs(editRow);



  // return (
  //     <div className={styles.registerDiv}>
  //     <h2>Edit Transaction</h2>
  //     <Form onSubmitHandler={onSubmitHandler}>
  //         <Input
  //         error={errorInputs.productName}
  //         type={"text"}
  //         label={"Product Name"}
  //         name={"productName"}
  //         value={inputs.productName || ""}
  //         placeholder={"Product Name"}
  //         onChangeHandler={onChangeHandler}
  //         />

  //         <Select
  //         error={errorInputs.tType}
  //         label={"Transaction Type"}
  //         name={"tType"}
  //         value={inputs.tType || ""}
  //         options={transactionOptions}
  //         onChangeHandler={onChangeHandler}
  //         />

  //         <Input
  //         error={errorInputs.amount}
  //         value={inputs.amount || ""}
  //         type={"number"}
  //         name={"amount"}
  //         label={"Amount"}
  //         placeholder={"Amount"}
  //         onChangeHandler={onChangeHandler}
  //         />
  //         {/* <Link to="#" className={styles.addProductLink}>Add Product</Link> */}

  //         <button type="submit" disabled={loading}>
  //         {loading ? "Loading..." : "Edit"}
  //         </button>
  //     </Form>
  //     {
  //         isError ? (
  //         <div className={styles.errorDiv}>
  //             <p>{message}</p>
  //         </div>
  //         ) : null
  //     }
  //     </div>

  // ); 

  // }

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
    <div className={styles.main}>
      <div className={styles.header}>
        <Icon
          className={styles.closeIcon}
          name="close"
          strokeColor={"white"}
          strokeWidth={"2"}
          onClickHandler={onClose} />
      </div>
      <div className={styles.registerDiv}>
        <h2>Edit Transaction</h2>

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

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Edit"}
          </button>
        </Form>


        {/* Your error handling */}
      </div>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
      </Modal> */}
    </div>


  );
}

export default Edit;


