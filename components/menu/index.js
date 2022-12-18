import Image from 'next/image'
import Link from 'next/link'
import Dash from '../../public/dash.png'
import Ent from '../../public/entrada.png'
import Sai from '../../public/saida.png'
import Cont from '../../public/contatos.png'
import Ano from '../../public/anota.png'
import Adm from '../../public/admin.png'
import styles from '../../styles/Home.module.css'
import useMediaQuery from './mediaQuery'
import React, {useState, useEffect} from "react";


export default function Menu(){
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [mob, setMob] = useState(styles.containerOf)
 
    const drop = () =>{
        mob === styles.container ? setMob(styles.container && styles.containerOf)
        : setMob(styles.container)
    }
    useEffect(()=>{
       drop()
    },[isMobile]);

    return(<>
    <button className={styles.btnMenu} onClick={drop}>Menu</button>
    <nav className={mob}> 
    <Image alt='Adm' className={styles.imgAdm} src={Adm}/>
    <h3 className={styles.title}>Admin</h3>
   <ul>
    <li> <Link href="/">
        <Image alt='dash' className={styles.img} src={Dash}/>
        Dashboard</Link>
    </li>
    <li><Link href="/entrada">
        <Image alt='entrada' className={styles.img} src={Ent} />
        Entrada</Link>
    </li>
    <li><Link href="/saida">
        <Image alt='saida' className={styles.img} src={Sai} />
        Saida</Link>
    </li>
    <li><Link href="/contas">
        <Image alt='conta' className={styles.img} src={Cont} />
        Contas</Link>
    </li>
    <li><Link href="/nota">
        <Image alt='anot' className={styles.img} src={Ano} />
        Anotações</Link>
    </li>
   </ul>
    </nav>
   
    </>
    )
}