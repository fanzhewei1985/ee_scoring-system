import React, {useEffect, useState} from 'react';
import './CoreFactors.scss'
import CoreAge from "../Component/CoreAge";
import CoreEducation from "../Component/CoreEducation";
import CoreLanguage from "../Component/CoreLanguage";
import CoreWork from "../Component/CoreWork";
import SpouseEdu from "../Component/SpouseEdu";
import SpouseLan from "../Component/SpouseLan";
import SpouseWork from "../Component/SpouseWork";
import SkillEdu from "../Component/SkillEdu";

const CoreFactors = () => {
    const [withSpouse, setWithSpouse] = useState(false)
    const [cert, setCert] = useState(false)
    const [scoreA, setScoreA] = useState({age: 0, education: 0, work: 0, language: 0})
    const [scoreB, setScoreB] = useState({education: 0, work: 0, language: 0})
    const [skillScore,setSkillScore]=useState({language:0,education:0,work:0})
    const passData = (type, score,skill) => {
        setScoreA({...scoreA, [type]: score})
setSkillScore({...skillScore,[type]:skill})
    }
    const passScoreB = (type, score) => {
        setScoreB({...scoreB, [type]: score})
    }
    const totalScoreA = scoreA.age + scoreA.work + scoreA.education + scoreA.language
    const totalScoreB = Number(scoreB.work) + Number(scoreB.education) + Number(scoreB.language)
    return (
        <div className='CoreFactors'>
            <div className='title'>
                <h1>A.CORE/HUMAN CAPITAL FACTORS(UPTO 500 POINTS)</h1>
            </div>
            <CoreAge fun={passData} withSpouse={withSpouse}/>
            <CoreEducation fun={passData} withSpouse={withSpouse}/>
            <CoreLanguage fun={passData} withSpouse={withSpouse}/>
            <CoreWork fun={passData} withSpouse={withSpouse}/>
            <div className='line'>Scores in Part A: {totalScoreA ? totalScoreA : 0}</div>
            <div className='line yellow'><h5>Will you apply with your spouse and your spouse is not Canadian nor PR
                holder</h5>
                <label className='radioLabel'><input type='radio' name='radio' onChange={() => setWithSpouse(true)}/>Yes</label>
                <label className='radioLabel'><input type='radio' name='radio' onChange={() => setWithSpouse(false)}/>No</label>
            </div>
            {withSpouse &&
                <div className='spousePart'>
                    <div className='title'>
                        <h1>B.SPOUSE OR COMMON-LAW PARTNER FACTORS (UPTO: 40 POINTS)</h1>
                    </div>
                    <SpouseEdu fun={passScoreB}/>
                    <SpouseLan fun={passScoreB}/>
                    <SpouseWork fun={passScoreB}/>
                    <div className='line'>Scores in Part B: {totalScoreB ? totalScoreB : 0}</div>
                </div>}
            <div className='title'>
                <h1>C.SKILL TRANSFERABILITY FACTORS (UPTO: 100 POINTS)</h1>
            </div>
            <div className='line yellow'><h5>Do you have a certificate of qualification?</h5>
                <label className='radioLabel'><input type='radio' name='certificate' onChange={() => setCert(true)}/>Yes</label>
                <label className='radioLabel'><input type='radio' name='certificate' onChange={() => setCert(false)}/>No</label>
            </div>
            <SkillEdu skillScore={skillScore}/>
        </div>
    );
};

export default CoreFactors;