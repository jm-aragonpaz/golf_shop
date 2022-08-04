import React, { useEffect, useState } from 'react'
import { resolvePath, useParams } from 'react-router-dom';
import './ItemListContainer.css'
import ItemList from '../ItemList/ItemList';
// import { MyCartContext } from '../../context/CartContext';
import { collection, getDocs, getFirestore, where, query } from 'firebase/firestore';
export default function ItemListContainer({}) {
    const [itemList, setItemList] = useState([])
    const [error, setError]= useState(false);
    const [loading, setLoading] = useState(true);

    let { itemCategory } = useParams();

    useEffect(() => {
            const db = getFirestore();
            const collList = collection(db, 'products');
            if(!itemCategory){
                let collectionFounded = new Promise((res, reject)=>{
                    setTimeout(()=>{res(getDocs(collList))},1000)
                })
                collectionFounded.then((res)=>{
                    const auxArray = res.docs.map((element)=>({...element.data(), id: element.id}));
                    setItemList(auxArray);
                })
                .catch((error) =>{
                    setError(true);
                })
                .finally(()=>{
                setLoading(false);
                })
            }else{
                let collectionfilt=query(collList, where('category', '==',itemCategory));
                let arrayFilt = new Promise((res,reject)=>{
                    setTimeout(()=>{res(getDocs(collectionfilt))},1000)
                })
                arrayFilt.then((res)=>{
                    const arrNormalizado = res.docs.map((element)=>({...element.data(),id: element.id}))
                    setItemList(arrNormalizado);
                })
                .catch((error) =>{
                    setError(true);
                })
                .finally(()=>{
                    setLoading(false);
                })
            }
        },[itemCategory]);
    return (

        <div>
            <div className="itemListCont">
                <h2 className="tit">Busca en nuestro catálogo eso que necesitas</h2>
            </div>
            <div className="greeting">
            {loading && "Loading..."}
            {error && "Error al cargar, reintente luego"}
            {itemList && <ItemList itemCategory={itemList} />}
            </div>
        </div>
    )
}
