import React, { useEffect, useContext, useState } from "react";
import {v4 as uuid} from 'uuid'
import { ToastContainer } from 'react-toastify';
import Head from 'next/head'
import axios from "axios";
import styles from '../styles/Notas.module.css'
import {Menu} from '../components'
import {TotalContext} from '../context'

const URLNotas = 'http://localhost:3004/notas/'

export default function Nota() {
  const { todo, notas, yes, not} = useContext(TotalContext) 
  useEffect(()=>{
    notas()
  },[]);
  
  const [texto, setTexto] = useState('')

  const ids = uuid()
  let uuId = ids.slice(0.8)
  let dats = new Intl.DateTimeFormat("pt-BR").format()

  function criaNota(){
    if(texto){
     axios.post(URLNotas, {
      id: uuId,
      texto: texto,
      datas: dats,
    }).then(yes())
    setTexto("")
    notas()
}else{not()}}

const deletNota = async (id)=> {
  await axios.delete(`${URLNotas + id}`)
  notas()
}

  return (<>
    <Head> <title>Anotações</title> </Head>
    <Menu />  
    <div className={styles.cont}>
    <h1 className={styles.title}>Anotações</h1>
    <div className={styles.contpadadd}>
      <textarea placeholder="Escreva uma nova anotação"
       className={styles.padAdd} cols="35" rows="12"
       value={texto} onChange={(e)=> setTexto (e.target.value)}></textarea>
       <button onClick={criaNota} className={styles.padNew}>+</button>
    </div>
      <div className={styles.pad}>
        {todo.map((item)=>{
          return(<ul key={item.id} className={styles.padItem} >
            <li className={styles.textPad} >{item.texto}</li>
            <div className={styles.items}>
            <li >{item.datas}</li>
            <button className={styles.exclui} onClick={ () => {deletNota(item.id)}}>
            <li>x</li>
            </button>
            </div>
        
            </ul>
          )})}
      </div>    
    </div>
    <ToastContainer />
    </>
  )
}