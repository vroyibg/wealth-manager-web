import {getEndpoint} from "./api";
import React from "react";
import {post} from "./httpClient";
import history from "./history";
import useWallets from "./useWallets";
import useForm from "./useForm";
import CategorySelect from "./CategorySelect";

const AddTransactionPage = () => {
  const wallets = useWallets();

  const [values, handleChange, handleSubmit, isSubmitting] = useForm((values, setSubmitting) => {
    values.walletId = parseInt(values.walletId)
    values.amount = parseInt(values.amount)
    values.categoryId = parseInt(values.categoryId)
    values.createdAt = new Date(values.createdAt).toISOString();
    setSubmitting(true)
    post(getEndpoint() + "/transactions", values).then(d => {
      setSubmitting(false)
      history.push("/")
    }).catch(e => {
      alert(e)
      setSubmitting(false)
    })
  })

  return <form onSubmit={handleSubmit}>
    <div>
      <label>Amount :</label>
      <input required name="amount" value={values.amount} onChange={handleChange} type="number"
             placeholder="Amount"/>
    </div>
    <div>
      <label>Wallet :</label>
      <select required name="walletId" onChange={handleChange} value={values.walletId}>
        <option/>
        {wallets.map((wallet) => {
          return <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
        })}
      </select>
    </div>
    <div>
      <label>Category :</label>
      <CategorySelect
        required name="categoryId"
        onChange={handleChange}
        value={values.categoryId}
      />
    </div>
    <div>
      <label>At:</label>
      <input type="datetime-local" name="createdAt" required onChange={handleChange} defaultValue={Date.now().toLocaleString()}/>
    </div>
    <button type="submit" disabled={isSubmitting}>Add</button>
  </form>
}

export default AddTransactionPage;
