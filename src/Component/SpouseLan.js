import React, {useEffect, useState} from 'react';
import CoreLanguageScore from "./CoreLanguageScore";
import Papa from "papaparse";
import LanguageFunc from "./LanguageFunc";

const SpouseLan = ({fun}) => {
    const [clbObj,setClbObj]=useState({})
    const getClbFromChild=(clbChild)=>{
        setClbObj(clbChild)
    }
    const [clbArray,setClbArray]=useState([])
    const scores = Object.values(clbObj)
    const [languageScore, setLanguageScore] = useState(0)
    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await fetch('csv/spouseLan.csv')
                const res = await data.text()
                const result = await Papa.parse(res).data
                console.log(result)
                if (result[result.length - 1][0] === '') {
                    result.pop()
                }
                const keysArr = result.shift()
                const objArray = result.map(value => {
                    const eachObj = keysArr.reduce((obj, header, index) => {
                        obj[header] = value[index]
                        return obj
                    }, {})
                    return eachObj
                })
               setClbArray(objArray)
            }
            fetchData()
        } catch (e) {
            console.log(e)
        }
    }, [])
    console.log(clbArray)
    const getScore = (arr, array) => {
            if (arr < Number(array[0]?.CLB_Level)) {
                return array[0].Points
            } else if (arr > Number(array[array.length - 1]?.CLB_Level)) {
                return array[array.length - 1].Points
            } else {
                const objFind = array.find(item => item.CLB_Level.includes(arr))
                return objFind?.Points
            }}
    useEffect(() => {
        // console.log(scores)
        const result = scores.map(arr => getScore(arr, clbArray))
        const reducedScore = result.reduce((pre, acc) => acc * 1 + pre * 1, 0)
        reducedScore && setLanguageScore(reducedScore)
        // fun('language',reducedScore)循环？？？？？？？？
    }, [scores])
    useEffect(()=>fun('language',languageScore),[languageScore])
    return (
        <div className='container'>
            <div className='left yellow'>Language</div>
          <LanguageFunc fun={getClbFromChild}/>
  <div className='right yellow'>{languageScore}</div>
</div>
)
    ;
};

export default SpouseLan;