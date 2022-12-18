import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const TotalContext = createContext({});
const URL = 'http://localhost:3004/entrada/'
const URL2 = 'http://localhost:3004/saida/'
const URLconta = 'http://localhost:3004/contas/'
const URLNotas = 'http://localhost:3004/notas/'

function TotalContextProvider({children}){

//alerts
const yes = () => toast.success("Item adicionado com sucesso");
const not = () => toast.error("Preencha todos os campo");
///

    const [post, setPost] = useState([])
    const [saida, setSaida] = useState([])
    const [conta, setConta] = useState([])
    const [todo, setTodo] = useState([])

    const contas = async () => {
        try{ const result = await axios.get(URLconta)
        setConta(result.data)}catch(erro){
          console.log(erro)
        }
      }

    const entradas = async () => {
      try{const result = await axios.get(URL)
        setPost(result.data)}catch(erro){
          console.log(erro)
        }}

    const saidas = async () => {
      try{const result = await axios.get(URL2)
          setSaida(result.data)}catch(erro){
            console.log(erro)
          }}
    
    const notas = async () => {
      try{const result = await axios.get(URLNotas)
             setTodo(result.data)}catch(erro){
              console.log(erro)
            }}       
    
//filtro de datas para o calendario    
const dastasFilter = conta.filter((num)=> num.vencimento).map((numb)=>(numb.vencimento))
const diasFilter = dastasFilter.map(str => Number(str.slice(-2)));
              
//mercado filtro
const mercados = saida.filter(sai=>{
  if(sai.categoria === 'mercado')
  return sai
})
const mercadosMap = mercados.map((numb)=> Number(numb.valor))
const mercadosTotal = mercadosMap.reduce((acc, cur)=> acc + cur, 0).toFixed(2);
//contas filtro
const cont = saida.filter(sai=>{
    if(sai.categoria === 'contas')
    return sai
  })
  const contasMap = cont.map((numb)=> Number(numb.valor))
  const contasTotal = contasMap.reduce((acc, cur)=> acc + cur, 0).toFixed(2);
//comida filtro
const comidas = saida.filter(sai=>{
    if(sai.categoria === 'comida')
    return sai
  })
  const comidasMap = comidas.map((numb)=> Number(numb.valor))
  const comidaTotal = comidasMap.reduce((acc, cur)=> acc + cur, 0).toFixed(2);
//transporte filtro
const transportes = saida.filter(sai=>{
    if(sai.categoria === 'transporte')
    return sai
  })
  const transporteMap = transportes.map((numb)=> Number(numb.valor))
  const transporteTotal = transporteMap.reduce((acc, cur)=> acc + cur, 0).toFixed(2);
//outros filtro
const outro = saida.filter(sai=>{
    if(sai.categoria === 'outros')
    return sai
  })
  const outrosMap = outro.map((numb)=> Number(numb.valor))
  const outrosTotal = outrosMap.reduce((acc, cur)=> acc + cur, 0).toFixed(2);  
////     

const filtro = post.filter((num)=> num.valor).map((numb)=> Number(numb.valor))
const total = filtro.reduce((acc, cur)=> acc + cur, 0).toFixed(2);
  
const filtro2 = saida.filter((num)=> num.valor).map((numb)=> Number(numb.valor))
const totalSaida = filtro2.reduce((acc, cur)=> acc + cur, 0).toFixed(2);
const soma = Math.abs(totalSaida - total).toFixed(2);




  return(
   <TotalContext.Provider 
    value={{post, setPost, total, entradas, saidas, totalSaida,
          saida, soma, contas, conta, setConta, saida,mercadosTotal,contasTotal,comidaTotal,
          transporteTotal,outrosTotal, notas, todo, diasFilter,yes,not }}>
            {children}
   </TotalContext.Provider>)}
    export{TotalContextProvider, TotalContext}