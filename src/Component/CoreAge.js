import React, {useEffect, useState} from 'react';
import Papa from 'papaparse'

const CoreAge = ({fun,withSpouse}) => {
    const [ageData,setAgeData]=useState([])
    const [ageInput,setAgeInput]=useState(0)
    const [ageScore,setAgeScore]=useState(0)
    useEffect(()=>{
        try{
            const fetchData= async ()=> {
                const data= await fetch('csv/clbt.csv')

               const textRes=await data.text()
                const textResult=await Papa.parse(textRes)
// console.log(testResult)
                setAgeData(textResult.data)
            }
            fetchData()}catch(e){console.log(e)}},[])
    // console.log(ageData)
const newArray=[...ageData]
const keysArray=newArray.shift()
const objArray=newArray.map(value=>{
    const eachObj=keysArray.reduce((obj,header,index)=>{obj[header]=value[index]
    return obj},{})
    return eachObj
})
// console.log(objArray)
    const filteredArray=objArray.filter(arr=>arr.Age)
    // console.log(filteredArray)

const min=filteredArray[0]?.Age.match(/\d+/)[0]
    const max=filteredArray[filteredArray.length-1]?.Age.match(/\d+/)[0]

const focusHandler=(e)=>{
    setAgeInput(e.target.value)
}
useEffect(()=>{
    if(ageInput<=min || ageInput>=max){
       filteredArray[0].WithSpouse&& setAgeScore(Number(filteredArray[0].WithSpouse))
    }
    else if (filteredArray.findIndex(arr=>arr.Age.includes(ageInput))>=0){
        const index=filteredArray.findIndex(arr=>arr.Age.includes(ageInput))
        withSpouse&&setAgeScore(Number(filteredArray[index].WithSpouse))
    !withSpouse&&setAgeScore(Number(filteredArray[index].WithoutSpouse))
    }
else{
const index=filteredArray.findIndex(arr=>arr.Age.includes('-'))
        withSpouse&&setAgeScore(Number(filteredArray[index]?.WithSpouse))
        !withSpouse&&setAgeScore(Number(filteredArray[index]?.WithoutSpouse))
        }
},[withSpouse,ageInput])

useEffect(()=>fun('age',ageScore),[ageScore])
    return (
            <div className='container '>
                <div className='left yellow'>Age</div>
                <div className='middle yellow'>
                    <input className='contentMiddle' type='text'  onBlur={(e)=>focusHandler(e)} />
                </div>
                <div className='right yellow'>{ageScore?ageScore:0}</div>
            </div>
    );
};

export default CoreAge;