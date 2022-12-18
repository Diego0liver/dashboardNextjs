import {Menu} from '../components'
import Head from 'next/head'
import React, {useState, useEffect, useContext} from "react";
import { ToastContainer } from 'react-toastify';
import {TotalContext} from '../context'
import styles from '../styles/Conta.module.css'
import axios from "axios";
import {v4 as uuid} from 'uuid'
import "react-datepicker/dist/react-datepicker.css";

const URLconta = 'http://localhost:3004/contas/'

export default function Contas() {
  const { conta, contas, yes, not } = useContext(TotalContext)  

      useEffect(()=>{
        contas()
      },[]); 
      const [titulo, setTitulo] = useState('')
      const [valor, setValor] = useState('')
      const [vencimentos, setVencimento] = useState('')
      const ids = uuid()
      let uuId = ids.slice(0.8)
     
      function criarConta(){
        if(titulo && valor){
         axios.post(URLconta, {
          id: uuId,
          titulo: titulo,
          valor: valor,
          vencimento: vencimentos
        }).then(contas)
        yes()
        setTitulo("")
        setValor("")
        setVencimento('')
    }else{not()}}
    console.log(vencimentos)
    const deletConta = async (id)=> {
      await axios.delete(`${URLconta + id}`)
      contas()
    }
    


  return (<>
    <Head> <title>Controle de contas</title> </Head>
    <Menu />
    <div className={styles.cont}>
     <h1 className={styles.title}>Controle de contas</h1>
     <div className={styles.form}>
      <label className={styles.label}>Titulo</label>
      <input className={styles.input} type='title'
      value={titulo} onChange={(e)=> setTitulo (e.target.value)}
      ></input>
      <label className={styles.label}>Valor</label>
      <input className={styles.input} type='number'
      value={valor} onChange={(e)=> setValor (e.target.value)}
      ></input>
      <label className={styles.label}>Vencimento</label>
      <input className={styles.input} type='date'
      value={vencimentos} onChange={(e)=> setVencimento (e.target.value)}
      ></input>
      <button className={styles.btngo}
       onClick={criarConta}
      >Salvar</button>
     </div>
     <div className={styles.lista}>
     <ul  className={styles.listtopo}>
      <li>Descricao</li>
      <li>Valor</li>
      <li>Vencimento</li>
      <li>Excluir</li></ul>
     {conta.map((item)=>{
          return(<ul key={item.id} className={styles.list}>
            <li >{item.titulo}</li>
            <li >R$ {item.valor}</li>
            <li >{item.vencimento.split('-').reverse().join('-') }</li>
            <li><button className={styles.btn}
            onClick={ () => {deletConta(item.id)}}
            >X</button></li>
        </ul>
        )
        })}
        </div>
        <ToastContainer />
    </div>
    </>
  )
}