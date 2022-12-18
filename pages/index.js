import styles from '../styles/Dash.module.css'
import Link from 'next/link'
import Head from 'next/head'
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {TotalContext} from '../context'
import React, {useContext, useEffect} from "react";
import Image from 'next/image'
import Finan from '../public/finan.png'
import Posi from '../public/positivo.png'
import Nega from '../public/negativo.png'
import faker from 'faker';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale,
  BarElement, Title } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
import {Menu} from '../components'
import { Datas } from '../components';


export default function Home() {
  const { total, entradas, totalSaida, saidas, soma, contas, conta,mercadosTotal,
    contasTotal,comidaTotal,transporteTotal,outrosTotal } = useContext(TotalContext)
  const tss = [contasTotal, comidaTotal, mercadosTotal, transporteTotal, outrosTotal]

//grafito circular
const data = {
  labels: ['Contas',
  'Almoco',
  'Mercado',
  'Transporte',
  'Outros'],
  datasets: [
    {
      label: 'Gastos R$',
      data: tss,
      backgroundColor: [
          'rgb(251, 90, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(0, 217, 255)',
          'rgb(116, 223, 112)'
      ], }, ],};
///      
//grafico colunas
 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',},
    title: {
      display: true,
      text: 'Financa',
    },},};
const labels = ['Janero', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho'];
 const data2 = {
  labels,
  datasets: [
    {
      label: 'Entradas',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',},
    {
      label: 'Saida',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',},
  ],};
///

  useEffect(()=>{
    entradas()
    saidas()
    contas()
  },[]);


  return (<>
  <Head> <title>Dashboard</title></Head>
  <Menu />
  <div className={styles.cont}>
    <h1 className={styles.title}>Dashboard.</h1>
     <div className={styles.topo}>
       <div className={styles.total}>
        <p>Total</p>
        <p>R$ {`${Number(totalSaida) > Number(total) ? "-" : ""} ${soma}`}</p>
        <div className={styles.img}><Image alt='total' src={Finan} /></div>
        </div>
        <div className={styles.entrada}>
        <p>Entradas</p>
        <p>R$ {total}</p>
        <div className={styles.img}><Image alt='total' src={Posi} /></div>
        </div>
        <div className={styles.saida}>
        <p>Saidas</p>
        <p>R$ -{totalSaida}</p>
        <div className={styles.img}><Image alt='total' src={Nega} /></div>
       </div>
     </div>
     <div className={styles.grafico}>
      <div className={styles.circlo}> <Doughnut data={data}  /></div>
      <div className={styles.bar}> <Bar data={data2} options={options}  /></div>
     </div>
     <div className={styles.datas}>
      <div  className={styles.calendario}>
      <Datas /></div>
     <div className={styles.tabela}>
      <div className={styles.datasCont}>
        <h4>Contas</h4>
        <Link href="/contas"><h4 className={styles.datasBtn} >+</h4></Link>
      </div>
     {conta.map((item)=>{
          return(<ul key={item.id} className={styles.list}>
            <li >{item.titulo}</li>
            <li >{item.vencimento.split('-').reverse().join('-') }</li>
            <li >R$ {item.valor}</li>
        </ul>
        )
        })}</div></div>
  </div>
  </>)
}
