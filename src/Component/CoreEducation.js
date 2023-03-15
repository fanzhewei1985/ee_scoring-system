import React, {useEffect, useState} from 'react';
import Papa from "papaparse";

const CoreEducation = ({fun,withSpouse}) => {
    const[index,setIndex]=useState(0)
    const[eduData,setEduData]=useState([])
    const[eduSkill,setEduSkill]=useState(0)
    useEffect(()=>{
        try{
            const fetchData= async ()=> {
                const data= await fetch('csv/education.csv')
                const res=await data.text()
                const result=await Papa.parse(res).data
                if(result[result.length-1][0]===''){result.pop()}
                setEduData(result)}
            fetchData()}catch(e){console.log(e)}},[])
    const copyArray=[...eduData]
const keysArr=copyArray.shift()
    const objArray=copyArray.map(value=>{
        const eachObj=keysArr.reduce((obj,header,index)=>{obj[header]=value[index]
            return obj},{})
        return eachObj
    })
    // console.log(objArray)
    const optionHandler=(e)=>{
        setIndex(Number(e.target.value))
        if(e.target.value>=2&&e.target.value<=4){setEduSkill(1)}
        else if(e.target.value>=5){setEduSkill(2)}
    }

    const score=withSpouse?objArray[index]?.WithSpouse:objArray[index]?.WithoutSpouse
    useEffect(()=>fun('education',Number(score),eduSkill),[score])
    return (
            <div className='container'>
                <div className='left'>Education</div>
                <div className='middle'>
                    <select className="form-select" style={{width: '50%', marginLeft: '10px'}} onChange={(e)=>optionHandler(e)}>
                        <option selected>-Please select your highest education-</option>
                        {objArray.map((arr,index)=>{
                            return(
                                <option key={index} value={index}>{arr.LevelOfEducation}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='right'>{score}</div>
            </div>
    );
};

export default CoreEducation;