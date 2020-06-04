import React from "react";
import {get} from "./httpClient";
import {getEndpoint} from "./api";

const useTransactionsCategories = () => {
  const [transactionCategories, setTransactionCategories] = React.useState(null)
  React.useEffect(() => {
    get(`${getEndpoint()}/transaction-categories`).then(data => setTransactionCategories(data.items))
  }, [])
  return transactionCategories
}

export default useTransactionsCategories;