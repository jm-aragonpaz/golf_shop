//@ts-check
import React, { useEffect, useState } from 'react'
import './ItemListContainer.css'
import ItemList from '../ItemList/ItemList';

export default function ItemListContainer({ greeting }) {
    // const ItemListContainer = ({Title, Name, Desc, Price}) =>{
    const [itemList, setItemList] = useState([])
    useEffect(() => {
        let items = [
            { id: 1, title: "IronSet", price: 700, description: "IronSet", pictureUrl: "https://www.titleist.com/dw/image/v2/AAZW_PRD/on/demandware.static/-/Sites-titleist-clubs-master/default/dwe6b25fca/541C/541C_01.jpg?sw=300&sh=300&sm=fit&sfrm=png" },
            { id: 2, title: "Driver", price: 200, description: "Driver Titleist", pictureUrl: "https://www.a-alvarez.com/productsimages/driver1-golf-titleist-917-d2-GMI917D2ROGS85.jpg/450/fill/ffffff" },
            { id: 3, title: "Putter", price: 225, description: "Putter Scotty Cameron Newport 2", pictureUrl: "https://http2.mlstatic.com/D_NQ_NP_865790-MLA42334108332_062020-O.webp" }
        ];
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(items)
            }, 2000)
        }).then((res) => {
            setItemList(res)
        })
    }, [])

    return (

        <>
            <span className="itemListContainer">{greeting}</span>
            <ItemList itemList={itemList} />
        </>
    )
}