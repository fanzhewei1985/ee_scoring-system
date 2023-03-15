import React, {useEffect, useState} from 'react';
import Papa from "papaparse";

const LanguageFunc = ({fun}) => {
    const[language,setLanguage]=useState({french:false,english:false})
    const[englishCtg,setEnglishCtg]=useState({IELTS:false,CELPIP:false})
    const[frenchCtg,setFrenchCtg]=useState({TEF:false,TCF:false})
    const[languageData,setLanguageData]=useState([])
    const [clb, setClb]=useState({Reading:0,Listening:0,Speaking:0,Writing:0})

    const fetchData= async (file)=> {
        try{
            const data= await fetch(file)
            const textRes=await data.text()
            const textResult=await Papa.parse(textRes).data
// console.log(textResult)
            setLanguageData(textResult)
        }catch(e){console.log(e)}}

    const copyArray=[...languageData]
    const filterArray=copyArray.filter(arr=>arr[0]!=='')
    const keysArr=filterArray.shift()
    const objArray=filterArray.map(arr=>{
        const eachObj=keysArr.reduce((obj,header,i)=>{obj[header]=arr[i]
            return obj},{})
        return eachObj})
    // console.log(objArray)
    const checkData=(value,name)=>{
        englishCtg.CELPIP&&objArray.forEach(arr=>{if(arr[name]===value){
            setClb({...clb,[name]:arr.CLB_Level})
        }
        })
        if(englishCtg.IELTS){
            if(value>=objArray[0][name]){setClb({...clb,[name]:objArray[0].CLB_Level})}
            else if(value<objArray[objArray.length-1][name]){setClb({...clb,[name]:0})}
            else{
                for(let i=objArray.length-1;i>0;i--){
                    if(value>=objArray[i][name]&&value<objArray[i-1][name]){setClb({...clb,[name]:objArray[i].CLB_Level})}
                }
            }
        }
         frenchCtg.TEF&&objArray.forEach((arr)=>{
                const array=arr[name].split('-')
                const min=array[0]
                const max=array[1]
                if(value>=min&&value<=max){
                    setClb({...clb,[name]:arr.CLB_Level})
                }
            }
        )

        frenchCtg.TCF&&objArray.forEach((arr,i)=>{
            if(arr[name].includes('-')){
                const array=arr[name].split('-')
                const min=array[0]
                const max=array[1]
                value>=min&&value<=max&&setClb({...clb,[name]:arr.CLB_Level})
            }
            else if(value===arr[name]){
                setClb({...clb,[name]:arr.CLB_Level})
            }
        })

    }
useEffect(()=>fun(clb),[clb])
    return (
        <div className='middle yellow padding'>
            <div className='languageContainer'>
                <label className='label' htmlFor='english'><input type='radio' name='english' onChange={(evt)=>setLanguage({english:true,french:false})} checked={language.english}
                                                                  className='labelInput'/>English</label>
                <label className='label' htmlFor='french'><input type='radio' name='french' className='labelInput' onChange={(evt)=>setLanguage({english:false,french:true})} checked={language.french}/>French</label>
            </div>
            {language.english&& <div className='languageContainer'>
                <label className='label' htmlFor='ielts'><input type='radio' name='ielts' onChange={(evt)=>{setEnglishCtg({IELTS:true,CELPIP:false})
                    const file='csv/ielts.csv'
                    fetchData(file)}
                }checked={englishCtg.IELTS}
                                                                className='labelInput'/>IELTS-GENERAL</label>
                <label className='label' htmlFor='celpip'><input type='radio' name='celpip' className='labelInput' onChange={(evt)=>{setEnglishCtg({IELTS:false,CELPIP:true})
                    const file='csv/celpip.csv'
                    fetchData(file)
                }} checked={englishCtg.CELPIP}/>CELPIP</label>
            </div>}
            {language.french&&<div className='languageContainer'>
                <label className='label' htmlFor='tef'><input type='radio'  onChange={(evt)=>{setFrenchCtg({TEF:true,TCF:false})
                    const file='csv/tef.csv'
                    fetchData(file)
                }} checked={frenchCtg.TEF}
                                                              className='labelInput'/>TEF Canada</label>
                <label className='label' htmlFor='tcf'><input type='radio' className='labelInput' onChange={(evt)=>{setFrenchCtg({TEF:false,TCF:true})
                    const file='csv/tcf.csv'
                    fetchData(file)}} checked={frenchCtg.TCF}/>TCF Canada</label>
            </div>}
            <div className='languageSection'>
                <p className=''>Reading</p>
                <p className=''>Writing</p>
                <p className=''>Listening</p>
                <p className='last'>Speaking</p>
            </div>
            <div className='languageSection'>
                <div><input name='Reading' onChange={(e)=>{
                    checkData(e.target.value,e.target.name)}}  type='text'/></div>
                <div><input name='Writing' onChange={(e)=>{
                    checkData(e.target.value,e.target.name)}} type='text'/></div>
                <div><input name='Listening' onChange={(e)=>{
                    checkData(e.target.value,e.target.name)}} type='text'/></div>
                <div className='last'><input name='Speaking' onChange={(e)=>{
                    checkData(e.target.value,e.target.name)}} type='text'/></div>
            </div>

        </div>
    );
};

export default LanguageFunc;