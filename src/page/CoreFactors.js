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
import SkillWork from "../Component/SkillWork";
import SkillCert from "../Component/SkillCert";

const CoreFactors = () => {
    const [withSpouse, setWithSpouse] = useState(false)
    const [cert, setCert] = useState(false)
    const [scoreA, setScoreA] = useState({age: 0, education: 0, work: 0, language: 0})
    const [scoreB, setScoreB] = useState({education: 0, work: 0, language: 0})
    const [skillScore,setSkillScore]=useState({language:0,education:0,work:{Canada:0,foreign:0}})
    const passData = (type, score,skill) => {
        setScoreA({...scoreA, [type]: score})
setSkillScore({...skillScore,[type]:skill})
    }
    const passScoreB = (type, score) => {
        setScoreB({...scoreB, [type]: score})
    }
    const [scoreC,setScoreC]=useState({education:0,work:0,cert:0})
    const passScoreC=(type,score)=>{setScoreC({...scoreC,[type]:score})}
    console.log(scoreA)
    const totalScoreA = scoreA.age + scoreA.work + scoreA.education + scoreA.language
    const totalScoreB = Number(scoreB.work) + Number(scoreB.education) + Number(scoreB.language)
    const totalScorec=scoreC.education+scoreC.work+scoreC.cert
    const totalScoreC=totalScorec>100?100:totalScorec
    const [sibling,setSibling]=useState(0)
    const [french,setFrench]=useState(false)
    const [frenchScore,setFrenchScore]=useState(0)
    const passFrench=(child)=>setFrench(child)
    const [eduCanada,setEduCanada]=useState(0)
    const [employment,setEmployment]=useState(0)
    const [pnp,setPnp]=useState(0)
    useEffect(()=>{
        french&&skillScore.language===0&&setFrenchScore(0)
    french&&skillScore.language===1&&setFrenchScore(25)
    french&&skillScore.language===2&&setFrenchScore(50)},[french,skillScore])
    const totalScored=Number(frenchScore)+Number(eduCanada)+Number(pnp)+Number(sibling)+Number(employment)
    const totalScoreD=totalScored>600?600:totalScored
    const total=totalScoreA+totalScoreB+totalScoreC+totalScoreD
    return (
        <div className='CoreFactors'>
            <div className='title'>
                <h1>A.CORE/HUMAN CAPITAL FACTORS(UPTO 500 POINTS)</h1>
            </div>
            <CoreAge fun={passData} withSpouse={withSpouse}/>
            <CoreEducation fun={passData} withSpouse={withSpouse}/>
            <CoreLanguage fun={passData} withSpouse={withSpouse} funFrench={passFrench}/>
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
            <SkillEdu skillScore={skillScore} fun={passScoreC}/>
            <SkillWork skillScore={skillScore} fun={passScoreC}/>
            <SkillCert skillScore={skillScore} cert={cert} fun={passScoreC}/>
            <div className='line'>Scores in Part C: {totalScoreC}</div>
            <div className='title'>
                <h1>D.Additional points (UPTO: 600 POINTS)</h1>
            </div>
            <div className='container '>
                <div className='left yellow'>Siblings</div>
                <div className='middle yellow'>
                    <h5>Brother or sister living in Canada who is a citizen or permanent resident of Canada</h5>
                    <label className='radioLabel'><input type='radio' name='sibling' onChange={() => setSibling(15)}/>Yes</label>
                    <label className='radioLabel'><input type='radio' name='sibling' onChange={() => setSibling(0)}/>No</label>
                </div>
                <div className='right yellow'>{sibling}</div>
            </div>
            <div className='container '>
                <div className='left'>Language</div>
                <div className='middle'>
                    <h5>Scored NCLC 7 or higher on all four French language skills</h5>
                </div>
                <div className='right'>{frenchScore}</div>
            </div>
            <div className='container '>
                <div className='left yellow'>Education in Canada</div>
                <div className='middle yellow'>
                    <h5>What is your highest education in Canada</h5>
                    <label className='radioLabel'><input type='radio' name='education' onChange={() => setEduCanada(0)}/>Never</label>
                    <label className='radioLabel'><input type='radio' name='education' onChange={() => setEduCanada(15)}/>Post-secondary education - 1~2 years</label>
                    <label className='radioLabel'><input type='radio' name='education' onChange={() => setEduCanada(30)}/>Post-secondary education - 3 years or longer</label>
                </div>
                <div className='right yellow'>{eduCanada}</div>
            </div>
            <div className='container '>
                <div className='left'>Arranged employment </div>
                <div className='middle'>
                    <h5>Have you got arranged employment in Canada</h5>
                    <label className='radioLabel'><input type='radio' name='employment' onChange={() => setEmployment(0)}/>No</label>
                    <label className='radioLabel'><input type='radio' name='employment' onChange={() => setEmployment(50)}/>TEER 1, 2 or 3, or any TEER 0 other than Major group 00</label>
                    <label className='radioLabel'><input type='radio' name='employment' onChange={() => setEmployment(200)}/>NOC TEER 0 Major group 00</label>
                </div>
                <div className='right'>{employment}</div>
            </div>
            <div className='container '>
                <div className='left yellow'>Provincial Nomination</div>
                <div className='middle yellow'>
                    <h5>Have you got provincial or territorial nomination</h5>
                    <label className='radioLabel'><input type='radio' name='PNP' onChange={() => setPnp(600)}/>Yes</label>
                    <label className='radioLabel'><input type='radio' name='PNP' onChange={() => setPnp(0)}/>No</label>
                </div>
                <div className='right yellow'>{pnp}</div>
            </div>
            <div className='line'>Scores in Part D: {totalScoreD}</div>
            <h1 className='title' style={{textAlign:"left"}}>Your Total Scores: {total}</h1>
        </div>
    );
};

export default CoreFactors;