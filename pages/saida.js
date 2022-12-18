import {Menu} from '../components'
import styles from '../styles/Saida.module.css'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import {v4 as uuid} from 'uuid'
import React, {useState, useEffect, useContext} from "react";
import {TotalContext} from '../context'


const URL2 = 'http://localhost:3004/saida/'


export default function Saida() {
  const { saidas, totalSaida, saida, yes, not} = useContext(TotalContext)  
  

  useEffect(()=>{
    saidas()
  },[]);
  const [titulo, setTitulo] = useState('')
  const [valor, setValor] = useState('')
  const [categoria, setCate] = useState(0)
  const ids = uuid()
  let uuId = ids.slice(0.8)

  function criar(){
    if(titulo && valor && categoria){
     axios.post(URL2, {
      id: uuId,
      titulo: titulo,
      categoria: categoria,
      valor: valor,
    }).then(yes())
    setTitulo("")
    setValor("")
   
}else{not()}}

const delet = async (id)=> {
  await axios.delete(`${URL2 + id}`)
 saidas()
}


  return (<>
  <Head> <title>Controle de gastos</title> </Head>
  <div className={styles.cont}>
    <Menu />
    <h1 className={styles.title}>Controle de gastos</h1>
    <div className={styles.form}>
      <label className={styles.label}>Titulo</label>
      <input  className={styles.input} type='text' value={titulo} onChange={(e)=> setTitulo (e.target.value)}></input>
      <label className={styles.label} for="categ-select">Categotia</label>
<select className={styles.input} name="pets" id="categ-select" value={categoria} onChange={(e)=> setCate (e.target.value)}>
    <option value="">Escolha uma categoria</option>
    <option value="contas">Contas</option>
    <option value="comida">Comida</option>
    <option value="mercado">Mercado</option>
    <option value="transporte">Transporte</option>
    <option value="outros">Outros</option>
</select>
      <label className={styles.label}>Valor</label>
      <input className={styles.input} type='number' value={valor} onChange={(e)=> setValor (e.target.value)}></input>
      <button className={styles.btngo} onClick={criar}>Salvar</button>
    </div>
    <div className={styles.topo}>
     <ul className={styles.listtopo}>
      <li>Descricao</li>
      <li>Categoria</li>
      <li>Valor</li>
      <li>Excluir</li></ul>
    {saida.map((item)=>{
          return(<ul key={item.id} className={styles.list} >
            <li >{item.titulo}</li>
            <li >{item.categoria}</li>
            <li >R$ {item.valor}</li>
            <li><button  className={styles.btn}
            onClick={ () => {delet(item.id)}}
            >X</button></li>
        </ul>
        )
        })}
        <h1>R$ -{totalSaida}</h1>
     
    </div>
    <ToastContainer />
    </div>
    </>)
}