import React, {useEffect, useState} from 'react';
import Papa from "papaparse";

const CoreLanguageScore = ({clb, clbRd, fun,withSpouse}) => {
    const [languageScore, setLanguageScore] = useState(0)
    const [languageScore2, setLanguageScore2] = useState(0)
    const [clbArray, setClbArray] = useState([])
    const [clbRdArr, setClbRdArr] = useState([])
    const scores = Object.values(clb)
    const scores2 = Object.values(clbRd)

    useEffect(() => {
        try {
            const fetchData = async (file, file2) => {
                const data = await fetch(file)
                const data2 = await fetch(file2)
                const res = await data.text()
                const res2 = await data2.text()
                const result = await Papa.parse(res).data
                const result2 = await Papa.parse(res2).data
                console.log(result, result2)
                if (result[result.length - 1][0] === '') {
                    result.pop()
                }
                setClbArray(result)
                if (result2[result2.length - 1][0] === '') {
                    result2.pop()
                }
                setClbRdArr(result2)
            }
            fetchData('csv/clb.csv', 'csv/clbRd.csv')
        } catch (e) {
            console.log(e)
        }
    }, [])
    const getObj = (array) => {
        const copyArray = [...array]
        const keysArr = copyArray.shift()
        const objArray = copyArray.map(value => {
            const eachObj = keysArr.reduce((obj, header, index) => {
                obj[header] = value[index]
                return obj
            }, {})
            return eachObj
        })
        return objArray
    }
    const objArr = getObj(clbArray)
    const objArrRd = getObj(clbRdArr)
    // console.log(objArr,objArrRd)
    const getScore = (arr, array) => {
        if (withSpouse) {
            if (arr < Number(array[0]?.CLB_Level)) {
                return array[0].WithSpouse
            } else if (arr > Number(array[array.length - 1]?.CLB_Level)) {
                return array[array.length - 1].WithSpouse
            } else {
                const objFind = array.find(item => item.CLB_Level.includes(arr))
                return objFind?.WithSpouse
            }
        } else {
            if (arr < Number(array[0]?.CLB_Level)) {
                return array[0].WithoutSpouse
            } else if (arr > Number(array[array.length - 1]?.CLB_Level)) {
                return array[array.length - 1].WithoutSpouse
            } else {
                const objFind = array.find(item => item.CLB_Level.includes(arr))
                return objFind?.WithoutSpouse
            }
        }
    }
    useEffect(() => {
        // console.log(scores)
        const result = scores.map(arr => getScore(arr, objArr))
        const reducedScore = result.reduce((pre, acc) => acc * 1 + pre * 1, 0)
        reducedScore && setLanguageScore(reducedScore)
    }, [scores,withSpouse])
    useEffect(() => {
        // console.log(scores2)
        const result = scores2.map(arr => getScore(arr, objArrRd))
        const reducedScore = result.reduce((pre, acc) => acc * 1 + pre * 1, 0)
        reducedScore && setLanguageScore2(reducedScore)
    }, [scores2,withSpouse])
    useEffect(() => fun(languageScore + languageScore2), [languageScore, languageScore2])
    return (
        <div className='right yellow'>{languageScore + languageScore2}</div>
    );
};

export default CoreLanguageScore;