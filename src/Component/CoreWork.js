import React, {useEffect, useState} from 'react';
import Papa from "papaparse";

const CoreWork = ({fun,withSpouse}) => {
const [workData,setWorkData]=useState([])
    // const [workScore,setWorkScore]=useState(0)
    const [index, setIndex]=useState(0)
    useEffect(()=>{
        try{
            const fetchData= async ()=> {
                const data= await fetch('csv/work.csv')
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
    const [workSkill,setWorkSkill]=useState(0)
    const [foreignWork,setForeignWork]=useState(0)
    const workScore=withSpouse?workData[index]?.WithSpouse:workData[index]?.WithoutSpouse
    useEffect(()=>fun('work',Number(workScore),{Canada:workSkill,foreign:Number(foreignWork)}),[workScore,foreignWork])

    return (

            <div className='container '>
                <div className='left'>Work Experience</div>
                <div className='middle padding'>
                    <div className='work_middle'>
                        <div className='work_middle_text'>Canadian work experience</div>
                        <div className='work_middle_input'><select className="form-select" onChange={(e)=>{setIndex(Number(e.target.value))
                       if(e.target.value<1){setWorkSkill(0)}
                       else if(e.target.value>=2){setWorkSkill(2)}
                        else {setWorkSkill(1)}}} >
                            {workData.map((arr,ind)=> <option value={ind}>{arr.year}</option>)}
                        </select></div>
                    </div>
                    <div className='work_middle'>
                    <div className='work_middle_text'>Foreign work experience</div>
                        <div className='work_middle_input' ><select className="form-select" onChange={(e)=>setForeignWork(e.target.value)} >
                            <option value={0}>0 year</option>
                            <option value={1}>1-2 years</option>
                            <option value={2}>over 3 years</option>
                        </select></div>
                    </div>
                </div>
                <div className='right'>{workScore}</div>
            </div>

    );
};

export default CoreWork;