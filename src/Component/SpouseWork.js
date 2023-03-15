import React, {useEffect, useState} from 'react';
import Papa from "papaparse";

const SpouseWork = ({fun}) => {
    const [workData,setWorkData]=useState([])
    // const [workScore,setWorkScore]=useState(0)
    const [index, setIndex]=useState(0)
    useEffect(()=>{
        try{
            const fetchData= async ()=> {
                const data= await fetch('csv/spouseWork.csv')
                const res=await data.text()
                const result=await Papa.parse(res).data
                if(result[result.length-1][0]===''){result.pop()}
                const keysArr=result.shift()
                const objArray=result.map(value=>{
                    const eachObj=keysArr.reduce((obj,header,i)=>{obj[header]=value[i]
                        return obj},{})
                    return eachObj
                })
                console.log(objArray)
                setWorkData(objArray)
            }
            fetchData()}catch(e){console.log(e)}},[])
    const workScore=workData[index]?.WithSpouse
    useEffect(()=>fun('work',workScore),[workScore])
    return (
        <div className='container '>
            <div className='left'>Work Experience</div>
            <div className='middle padding'>
                <div className='work_middle'>
                    <div className='work_middle_text'>Canadian work experience</div>
                    <div className='work_middle_input'><select className="form-select" onChange={(e)=>setIndex(Number(e.target.value))} >
                        {workData.map((arr,ind)=> <option value={ind}>{arr.year}</option>)}
                    </select></div>
                </div>

            </div>
            <div className='right'>{workScore}</div>
        </div>
    );
};

export default SpouseWork;