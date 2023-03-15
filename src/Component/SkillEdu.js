import React, {useEffect, useState} from 'react';

const SkillEdu = ({skillScore}) => {
    console.log(skillScore)
    const [scoreA,setScoreA]=useState(0)
    const[scoreB,setScoreB]=useState(0)
    useEffect(()=>{
        if(skillScore.language<1||skillScore.education<1){setScoreA(0)}
        else if(skillScore.language===1){
            skillScore.education===1&&setScoreA(13)
            skillScore.education===2&&setScoreA(25)
        }
        else {
            skillScore.education===1&&setScoreA(25)
            skillScore.education===2&&setScoreA(50)
        }
    },[skillScore])

    useEffect(()=>{
        if(skillScore.work<1||skillScore.education<1){setScoreB(0)}
        else if(skillScore.work===1){
            skillScore.education===1&&setScoreB(13)
            skillScore.education===2&&setScoreB(25)
        }
        else {
            skillScore.education===1&&setScoreB(25)
            skillScore.education===2&&setScoreB(50)
        }
    },[skillScore])
    return (
        <div className='container '>
            <div className='left'>Education</div>
            <div className='middle_EDU'>
                <div className='edu_middle'>Education+Language</div>
                <div className='edu_middle'>Education+Work experience</div>
            </div>
                <div className='right_EDU'>
                    <div className='edu_middle'>{scoreA}</div>
                    <div className='edu_middle'>{scoreB}</div>
                </div>
            </div>
            );
            };

            export default SkillEdu;