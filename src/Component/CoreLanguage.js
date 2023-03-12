import React, {useEffect, useState} from 'react';
import Papa from 'papaparse'
import CoreLanguageScore from "./CoreLanguageScore";

const CoreLanguage = ({fun,withSpouse}) => {
    const[language,setLanguage]=useState({french:false,english:false})
    const[englishCtg,setEnglishCtg]=useState({IELTS:false,CELPIP:false,IELTS2:false,CELPIP2:false})
    const[frenchCtg,setFrenchCtg]=useState({TEF:false,TCF:false,TEF2:false,TCF2:false})
    const [secLanguage,setSecLanguage]=useState({yes:false,no:true})
    // const [firstInput,setFirstInput]=useState({Reading:0,Listening:0,Speaking:0,Writing:0})
    const[languageData,setLanguageData]=useState([])
    const [clb, setClb]=useState({Reading:0,Listening:0,Speaking:0,Writing:0})
    const [clbRd, setClbRd]=useState({Reading:0,Listening:0,Speaking:0,Writing:0})

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
    // console.log(filterArray)
    const keysArr=filterArray.shift()
    const objArray=filterArray.map(arr=>{
        const eachObj=keysArr.reduce((obj,header,i)=>{obj[header]=arr[i]
        return obj},{})
    return eachObj})
    // console.log(objArray)
    const checkData=(value,name)=>{
       secLanguage.no&&englishCtg.CELPIP&&objArray.forEach(arr=>{if(arr[name]===value){
           setClb({...clb,[name]:arr.CLB_Level})
       }
       })
        secLanguage.yes&&englishCtg.CELPIP2&&objArray.forEach(arr=>{if(arr[name]===value){
            setClbRd({...clbRd,[name]:arr.CLB_Level})
        }
        })
        if(englishCtg.IELTS&&secLanguage.no){
            if(value>=objArray[0][name]){setClb({...clb,[name]:objArray[0].CLB_Level})}
            else if(value<objArray[objArray.length-1][name]){setClb({...clb,[name]:0})}
            else{
                for(let i=objArray.length-1;i>0;i--){
                    if(value>=objArray[i][name]&&value<objArray[i-1][name]){setClb({...clb,[name]:objArray[i].CLB_Level})}
                }
            }
        }
        if(englishCtg.IELTS2&&secLanguage.yes){
            if(value>=objArray[0][name]){setClbRd({...clbRd,[name]:objArray[0].CLB_Level})}
            else if(value<objArray[objArray.length-1][name]){setClbRd({...clbRd,[name]:0})}
            else{
                for(let i=objArray.length-1;i>0;i--){
                    if(value>=objArray[i][name]&&value<objArray[i-1][name]){setClbRd({...clbRd,[name]:objArray[i].CLB_Level})}
                }
            }
        }
       secLanguage.no&& frenchCtg.TEF&&objArray.forEach((arr)=>{
            const array=arr[name].split('-')
            const min=array[0]
            const max=array[1]
            if(value>=min&&value<=max){
                setClb({...clb,[name]:arr.CLB_Level})
            }
            }
        )
        secLanguage.yes&&frenchCtg.TEF2&&objArray.forEach((arr)=>{
                const array=arr[name].split('-')
                const min=array[0]
                const max=array[1]
                if(value>=min&&value<=max){
                    setClbRd({...clbRd,[name]:arr.CLB_Level})
                }
            }
        )
        secLanguage.no&&frenchCtg.TCF&&objArray.forEach((arr,i)=>{
            if(arr[name].includes('-')){
              const array=arr[name].split('-')
                const min=array[0]
                const max=array[1]
                console.log(value,min,max)
                value>=min&&value<=max&&setClb({...clb,[name]:arr.CLB_Level})
            }
            else if(value===arr[name]){
                setClb({...clb,[name]:arr.CLB_Level})
            }
        })
        secLanguage.yes&&frenchCtg.TCF2&&objArray.forEach((arr,i)=>{
            if(arr[name].includes('-')){
                const array=arr[name].split('-')
                const min=array[0]
                const max=array[1]
                value>=min&&value<=max&&setClbRd({...clbRd,[name]:arr.CLB_Level})
            }
            else if(value===arr[name]){
                setClbRd({...clbRd,[name]:arr.CLB_Level})
            }
        })
    }
    const [child,setChild]=useState(0)
    const passData=(a)=>setChild(a)
    useEffect(()=>fun('language',child),[child])
    return (
        <div className='container'>
            <div className='left yellow'>Language</div>
            <div className='middle yellow padding'>
                <div className='languageContainer'>
                <label className='label' htmlFor='english'><input type='radio' name='english' onChange={(evt)=>setLanguage({english:true,french:false})} checked={language.english}
                                                                  className='labelInput'/>English</label>
                <label className='label' htmlFor='french'><input type='radio' name='french' className='labelInput' onChange={(evt)=>setLanguage({english:false,french:true})} checked={language.french}/>French</label>
                </div>
                {language.english&& <div className='languageContainer'>
                    <label className='label' htmlFor='ielts'><input type='radio' name='ielts' onChange={(evt)=>{setEnglishCtg({IELTS:true,CELPIP:false,IELTS2: false,CELPIP2: false})
                    const file='csv/ielts.csv'
                    fetchData(file)}
                    }checked={englishCtg.IELTS}
                                                                      className='labelInput'/>IELTS-GENERAL</label>
                    <label className='label' htmlFor='celpip'><input type='radio' name='celpip' className='labelInput' onChange={(evt)=>{setEnglishCtg({IELTS:false,CELPIP:true,IELTS2: false,CELPIP2: false})
                        const file='csv/celpip.csv'
                    fetchData(file)
                    }} checked={englishCtg.CELPIP}/>CELPIP</label>
                </div>}
                {language.french&&<div className='languageContainer'>
                    <label className='label' htmlFor='tef'><input type='radio'  onChange={(evt)=>{setFrenchCtg({TEF:true,TCF:false,TEF2: false,TCF2: false})
                    const file='csv/tef.csv'
                        fetchData(file)
                    }} checked={frenchCtg.TEF}
                                                                      className='labelInput'/>TEF Canada</label>
                    <label className='label' htmlFor='tcf'><input type='radio' className='labelInput' onChange={(evt)=>{setFrenchCtg({TEF:false,TCF:true,TEF2: false,TCF2: false})
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
                       // setFirstInput({...firstInput,Reading:Number(e.target.value)})
                   checkData(e.target.value,e.target.name)}}  type='text'/></div>
                    <div><input name='Writing' onChange={(e)=>{
                        // setFirstInput({...firstInput,Writing:Number(e.target.value)})
                        checkData(e.target.value,e.target.name)}} type='text'/></div>
                    <div><input name='Listening' onChange={(e)=>{
                        // setFirstInput({...firstInput,Listening:Number(e.target.value)})
                        checkData(e.target.value,e.target.name)}} type='text'/></div>
                    <div className='last'><input name='Speaking' onChange={(e)=>{
                        // setFirstInput({...firstInput,Speaking:Number(e.target.value)})
                        checkData(e.target.value,e.target.name)}} type='text'/></div>
                </div>
                <div className='languageContainer'><span>Do you have a second language score</span></div>
                <div className='languageContainer'>
                    <label className='label' htmlFor='yes'><input type='radio'  onChange={(evt)=>setSecLanguage({yes:true,no:false})} checked={secLanguage.yes}
                                                                      className='labelInput'/>Yes</label>
                    <label className='label' htmlFor='no'><input type='radio'  className='labelInput' onChange={(evt)=>setSecLanguage({yes:false,no:true})} checked={secLanguage.no} />No</label>

                </div>
                {language.french&&secLanguage.yes&& <div className='languageContainer'>
                    <label className='label' htmlFor='ielts'><input type='radio'  onChange={(evt)=>{setEnglishCtg({IELTS2:true,CELPIP:false,IELTS: false,CELPIP2: false})
                        const file='csv/ielts.csv'
                        fetchData(file)}} checked={englishCtg.IELTS2}
                                                                      className='labelInput'/>IELTS-GENERAL</label>
                    <label className='label' htmlFor='celpip'><input type='radio' className='labelInput' onChange={(evt)=>{setEnglishCtg({IELTS:false,CELPIP2:true,CELPIP: false,IELTS2: false})

                        const file='csv/celpip.csv'
                        fetchData(file)}} checked={englishCtg.CELPIP2}/>CELPIP</label>
                </div>}
                {language.english&&secLanguage.yes&&<div className='languageContainer'>
                    <label className='label' htmlFor='tef'><input type='radio'  onChange={(evt)=>{setFrenchCtg({TEF2:true,TCF:false,TCF2: false,TEF: false})
                        const file='csv/tef.csv'
                        fetchData(file)}} checked={frenchCtg.TEF2}
                                                                      className='labelInput'/>TEF Canada</label>
                    <label className='label' htmlFor='tcf'><input type='radio' className='labelInput' onChange={(evt)=>{setFrenchCtg({TEF:false,TCF2:true,TEF2: false,TCF: false})
                        const file='csv/tcf.csv'
                        fetchData(file)}} checked={frenchCtg.TCF2}/>TCF Canada</label>
                </div>}
                {secLanguage.yes&&<div> <div className='languageSection'>
                    <p className=''>Reading</p>
                    <p className=''>Writing</p>
                    <p className=''>Listening</p>
                    <p className='last'>Speaking</p>
                </div>
                <div className='languageSection'>
                    <div><input className='' name='Reading' type='text' onChange={(e)=>checkData(e.target.value,e.target.name)}/></div>
                    <div><input className='' name='Writing' type='text'onChange={(e)=>checkData(e.target.value,e.target.name)} /></div>
                    <div><input className='' name='Listening' type='text' onChange={(e)=>checkData(e.target.value,e.target.name)} /></div>
                    <div className='last'><input name='Speaking' type='text' onChange={(e)=>checkData(e.target.value,e.target.name)} /></div>
                </div></div>}
            </div>
            <CoreLanguageScore clb={clb} clbRd={clbRd} fun={passData} withSpouse={withSpouse}/>
        </div>
    );
};

export default CoreLanguage;