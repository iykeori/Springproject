import React, { useEffect, useState } from 'react';

const Demo = () => {

  const [records, setRecords] = useState([{ name: '', tType: '', amount: '' }]);
  const [recordUIs, setRecordUIs] = useState([]);
  const [rowKey, setRowKey] = useState(0);

  useEffect(() => {
    setRecordUIs(uis => ([...uis, (<RecordUI />)]));
  }, []);

  useEffect(() => {
    const newRecord = records[records.length - 1];

    setRecordUIs(uis => ([...uis, (<RecordUI 
      name={newRecord.name} 
      amount={newRecord.amount} 
      tType={newRecord.tType}
      nameChangeHandler={()=> {
        
      }} />)]));
  }, [records, records.length]);

  const addRowHandler = () => {

    setRecords(rows => ({
      ...rows,
      [rowKey]: {
        name: "",
        tType: "",
        amount: ""
      }
    }));
  }

  return (<div>
    <div className={"records-wrapper"}>
      {
        recordUIs
      }
    </div>

    <div className='add-row-btn-wrapper'>
      <button onClick={() => {
        /** handles adding record ui to recordUIs state*/
      }}>Add row</button>
    </div>
  </div>);
}

const RecordUI = ({
  name,
  nameChangeHandler,
  tType,
  tTypeChangeHandler,
  amount,
  amountChangeHandler }) => {

  return (<div>Record UI</div>)
}

