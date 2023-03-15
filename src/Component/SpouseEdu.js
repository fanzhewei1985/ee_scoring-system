import React, {useEffect, useState} from 'react';
import Papa from "papaparse";

const SpouseEdu = ({fun}) => {
    const[index,setIndex]=useState(0)
    const[eduData,setEduData]=useState([])
    useEffect(()=>{
        try{
            const fetchData= async ()=> {
                const data= await fetch('csv/spouseEdu.csv')
                const res=await data.text()
                const result=await Papa.parse(res).data
                if(result[result.length-1][0]===''){result.pop()}
                const keysArr=result.shift()
                const objArray=result.map(value=>{
                    const eachObj=keysArr.reduce((obj,header,index)=>{obj[header]=value[index]
                        return obj},{})
                    return eachObj
                })
                setEduData(objArray)}
            fetchData()}catch(e){console.log(e)}},[])

    console.log(eduData)
    const optionHandler=(e)=>{
        setIndex(Number(e.target.value))
    }
    const score=eduData[index]?.WithSpouse
    useEffect(()=>fun('education',score),[score])
    return (
        <div className='container'>
            <div className='left'>Education</div>
            <div className='middle'>
                <select className="form-select" style={{width: '50%', marginLeft: '10px'}} onChange={(e)=>optionHandler(e)}>
                    <option selected>-Please select your highest education-</option>
                    {eduData.map((arr,index)=>{
                        return(
                            <option key={index} value={index}>{arr.levelOfEdu}</option>
                        )
                    })}
                </select>
            </div>
            <div className='right'>{score}</div>
        </div>
    );
};

export default SpouseEdu;