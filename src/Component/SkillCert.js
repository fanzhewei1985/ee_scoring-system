import React, {useEffect, useState} from 'react';

const SkillCert = ({skillScore,cert,fun}) => {
    const [score,setScore]=useState(0)
    useEffect(()=>{
        if(cert){
            skillScore.language===1&&setScore(25)
            skillScore.language===2&&setScore(50)
        }
    },[skillScore,cert])
    useEffect(()=>fun('cert',score),[score])
    return (
        <div className='container '>
            <div className='left'>Certificate</div>
            <div className='middle'>Certificate + Language</div>
            <div className='right'>{score}</div>
        </div>
    );
};

export default SkillCert;