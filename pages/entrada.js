import {Menu} from '../components'
import Head from 'next/head';
import styles from '../styles/Entrada.module.css'
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import {v4 as uuid} from 'uuid'
import React, {useState, useEffect, useContext} from "react";
import {TotalContext} from '../context'

const URL = 'http://localhost:3004/entrada/'

export default function Entrada() {
  const { post, total, entradas, yes, not } = useContext(TotalContext)  

  useEffect(()=>{
    entradas()
  },[]);

  const [titulo, setTitulo] = useState('')
  const [valor, setValor] = useState('')
  const ids = uuid()
  let uuId = ids.slice(0.8)

  function cria(){
    if(titulo && valor){
     axios.post(URL, {
      id: uuId,
      titulo: titulo,
      valor: valor,
    }).then(yes())
    setTitulo("")
    setValor("")
   
}else{not()}}

const deleta = async (id)=> {
  await axios.delete(`${URL + id}`)
  entradas()
}

  return (<>
  <Head> <title>Controle de entradas</title> </Head>
  <div className={styles.cont}>
    <Menu />
    <h1 className={styles.title}>Controle de entradas</h1>
    <form className={styles.inputs}>
    <label className={styles.label}>Titulo</label>
    <input className={styles.input} type="text" value={titulo} onChange={(e)=> setTitulo (e.target.value)}></input>
    <label className={styles.label}>Valor</label>
    <input className={styles.input} type="number" value={valor} onChange={(e)=> setValor (e.target.value)}></input>
    <button className={styles.btngo} onClick={cria}>Salvar</button>
    </form>
    <div className={styles.lista}>
      <ul className={styles.listtopo}>
      <li>Descricao</li>
      <li>Valor</li>
      <li>Excluir</li></ul>
        {post.map((item)=>{
          return(<ul key={item.id} className={styles.list}>
            <li >{item.titulo}</li>
            <li >R$ {item.valor}</li>
            <li><button className={styles.btn}
            onClick={ () => {deleta(item.id)}}
            >X</button></li>
        </ul>
        )
        })}
        <h1 className={styles.total}>R${total}</h1>
  </div>
    <ToastContainer />
    </div>
    </>)
}