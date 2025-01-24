import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(event) {
    event.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    // const price = name.split(" ")[0];//wrong; assigns name to price as a string 
    const price = parseFloat(name.split(" ")[0]);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        dateTime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setDateTime("");
        setDescription("");
        console.log("result", json);
      });
    });
  }
  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  return (
    <main>
      <h1>Money Tracker</h1>
      <h2>{balance}</h2>

      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={"20000 mobile"}
          />
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(event) => setDateTime(event.target.value)}
          />
        </div>

        <div className="description">
          <input
            type="text"
            placeholder={"description"}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button>Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction,index) => (
            <div>
              <div key={index} className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div
                    className={
                      "price " + (transaction.price < 0 ? "red" : "green")
                    }
                  >
                    {transaction.price}
                  </div>
                  <div className="datetime">{transaction.dateTime}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;