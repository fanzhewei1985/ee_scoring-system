













//一些备用代码
//COREAGE
// const reader = data.body.getReader()
// const result = await reader.read()
// const decoder = new TextDecoder('utf-8')
// const csv = decoder.decode(result.value)
// setAgeData(csv)

// const objKeys=ageData.slice(0,ageData.indexOf('\n')).split(',')
// console.log(objKeys)
// const objValues=ageData.slice(ageData.indexOf('\n')+1).split('\n')
// console.log(objValues)
// const newArray=objValues.map(value=>{
//     const values=value.split(',')
//     const eachObj=objKeys.reduce((obj,header,index)=>{obj[header]=values[index]
//         return obj},{})
//     return eachObj
// })

// const objArrayNew=filteredArray.map(arr=> {
//     let age = arr.Age?.match(/\d+/)[0]
//     return {...arr,Age:age}
// })

// const focusHandler=(e)=>{
//     if(e.target.value<=min || e.target.value>=max){
//         setAgeScore(Number(filteredArray[0].WithSpouse))
//     }
//     else if (filteredArray.findIndex(arr=>arr.Age.includes(e.target.value))>=0){
//         const index=filteredArray.findIndex(arr=>arr.Age.includes(e.target.value))
//         console.log(withSpouse)
//         withSpouse&&setAgeScore(Number(filteredArray[index].WithSpouse))
//     !withSpouse&&setAgeScore(Number(filteredArray[index].WithoutSpouse))
//     }
// else{
// const index=filteredArray.findIndex(arr=>arr.Age.includes('-'))
//         withSpouse&&setAgeScore(Number(filteredArray[index].WithSpouse))
//         !withSpouse&&setAgeScore(Number(filteredArray[index].WithoutSpouse))
//         }