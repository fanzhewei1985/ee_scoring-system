import React, {useEffect, useState} from 'react';

const SkillWork = ({skillScore,fun}) => {
    console.log(skillScore)
    const [scoreA,setScoreA]=useState(0)
    const[scoreB,setScoreB]=useState(0)
    useEffect(()=>{
        if(skillScore.language<1||skillScore.work.foreign<1){setScoreA(0)}
        else if(skillScore.language===1){
            skillScore.work.foreign===1&&setScoreA(13)
            skillScore.work.foreign===2&&setScoreA(25)
        }
        else {
            skillScore.work.foreign===1&&setScoreA(25)
            skillScore.work.foreign===2&&setScoreA(50)
        }
    },[skillScore])

    useEffect(()=>{
        if(skillScore.work.Canada<1||skillScore.work.foreign<1){setScoreB(0)}
        else if(skillScore.work.Canada===1){
            skillScore.work.foreign===1&&setScoreB(13)
            skillScore.work.foreign===2&&setScoreB(25)
        }
        else {
            skillScore.work.foreign===1&&setScoreB(25)
            skillScore.work.foreign===2&&setScoreB(50)
        }
    },[skillScore])
    useEffect(()=>fun('work',Number(scoreA+scoreB)),[scoreA,scoreB])
    return (
        <div className='container yellow'>
            <div className='left'>Foreign Work Experience</div>
            <div className='middle_EDU'>
                <div className='edu_middle'>Foreign Work Experience + Language</div>
                <div className='edu_middle'>Foreign Work Experience + Canadian Work Experience</div>
            </div>
            <div className='right_EDU'>
                <div className='edu_middle'>{scoreA}</div>
                <div className='edu_middle'>{scoreB}</div>
            </div>
        </div>
    );
};

export default SkillWork;