import React, {useEffect, useState} from 'react';
import './CoreFactors.scss'
import CoreAge from "../Component/CoreAge";
import CoreEducation from "../Component/CoreEducation";
import CoreLanguage from "../Component/CoreLanguage";
import CoreWork from "../Component/CoreWork";

const CoreFactors = () => {
    const [withSpouse,setWithSpouse]=useState(false)
const [scoreA,setScoreA]=useState({age:0,education:0,work:0,language:0})
    const passData=(type,child)=>{
    setScoreA({...scoreA,[type]:child})}
const totalScore=scoreA.age+scoreA.work+scoreA.education+scoreA.language
    return (
        <div className='CoreFactors'>
            <div className='title'>
                <h1>A.CORE/HUMAN CAPITAL FACTORS(UPTO 500 POINTS)</h1>
            </div>
          <CoreAge fun={passData} withSpouse={withSpouse}/>
<CoreEducation fun={passData} withSpouse={withSpouse}/>
<CoreLanguage fun={passData} withSpouse={withSpouse}/>
            <CoreWork fun={passData} withSpouse={withSpouse}/>
            <div className='line'>Scores in Part A: {totalScore?totalScore:0};</div>
            <div className='line yellow'><h5>Will you apply with your spouse and your spouse is not Canadian nor PR holder</h5>
                <label className='radioLabel'><input type='radio' name='radio' onChange={()=>setWithSpouse(true)}/>Yes</label>
                <label className='radioLabel'><input type='radio' name='radio' onChange={()=>setWithSpouse(false)}/>No</label>
            </div>
        </div>
    );
};

export default CoreFactors;