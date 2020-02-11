import React from 'react';
import './header.css';
import './tooltip.css';
import './body.css';
import './maps.css';
import './footer.css';
import './content.css';
import WealthSection from  './WealthSection.js';
import CriminalSection from  './CriminalSection.js';
import GenderSection from  './GenderSection.js';
import AgeSection from  './AgeSection.js';
import EducationSection from  './EducationSection.js';
import data from  './data.json';
import dataWODuplicates from  './dataRemoveDuplicates.json';
import * as d3 from 'd3';
import {
  FacebookShareButton,
  TwitterShareButton
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import ReactGA from 'react-ga'; 



ReactGA.initialize('UA-158122106-1');
ReactGA.set({ anonymizeIp: true });
ReactGA.pageview('/');

function App() {
  
  let colorObj = {
    'NDA':'#d6793a',
    'UPA':'#6BCAE2',
    'BSP':'#196F6B',
    'AAP':'#5AC877',
    'Others':'#aaa'
  }
  let dataByParties = d3.nest()
    .key(d => d.party_eci)
    .entries(dataWODuplicates);
  let dataByGender = d3.nest()
    .key(d => d.gender)
    .entries(dataWODuplicates);
  let dataByContituency = d3.nest()
    .key(d => d.ac_no)
    .entries(data);
  let dataByAlliance = d3.nest()
    .key(d => d.Alliance)
    .entries(dataWODuplicates);
  let majorPartiesArr = ['AAP','NDA','UPA','BSP','Others']
  let majorparty = {}  
  dataByContituency.forEach(el => {
    let totalAssets = 0, noOfCr = 0, assetVal = [], noOfCriminal = 0, noOfSeriousCriminal = 0, femaleCandidates = 0, ageVal = [];
    el['values'].forEach(d => {
      totalAssets = totalAssets + d.net_assets;
      assetVal.push(d.net_assets)
      if(d.net_assets >= 10000000) noOfCr++
      if(d.age !== 'NaN') ageVal.push(d.age)
      if(d.criminal_cases > 0) noOfCriminal++
      if(d.serious_criminal_cases > 0) noOfSeriousCriminal++
      if(d.gender === 'Female') femaleCandidates++
    })
    assetVal.sort((a, b) => a - b);
    ageVal.sort((a, b) => a - b);
    let lowMiddle = Math.floor((assetVal.length - 1) / 2), highMiddle = Math.ceil((assetVal.length - 1) / 2);
    let median = (assetVal[lowMiddle] + assetVal[highMiddle]) / 2;
    let lowMiddleAge = Math.floor((ageVal.length - 1) / 2), highMiddleAge = Math.ceil((ageVal.length - 1) / 2);
    let medianAge = (ageVal[lowMiddleAge] + ageVal[highMiddleAge]) / 2;
    el['contituency'] = el['values'][0]['constituency']
    el['TotalAssets'] = totalAssets
    el['NoOfCrorepati'] = noOfCr
    el['MedianAssets'] = median
    el['PercentageCr'] = (noOfCr * 100 / el['values'].length).toFixed(1) 
    el['noOfCriminal'] = noOfCriminal
    el['noOfSeriousCriminal'] = noOfSeriousCriminal
    el['PercentageCriminals'] = (noOfCriminal * 100 / el['values'].length).toFixed(1) 
    el['noOfFemaleCandidates'] = femaleCandidates
    el['FemaleCandidatesPercentage'] = (femaleCandidates * 100 / el['values'].length).toFixed(1)
    el['medianAge'] = medianAge
  }) 
  dataByAlliance.forEach(el => {
    if (el.key !=='None'){
      majorparty[el.key] = {}
      majorparty[el.key]['values'] = el.values
    }
  })
  dataByParties.forEach(el => {
    if (el.key === 'Aam Aadmi Party'){
      majorparty['AAP'] = {}
      majorparty['AAP']['values'] = el.values
    }
    if(el.key === 'Bahujan Samaj Party'){
      majorparty['BSP'] = {}
      majorparty['BSP']['values'] = el.values
    }
  })
  majorparty['Others'] = {}
  majorparty['Others']['values'] = []
  dataWODuplicates.forEach(el => {
    if (el.party_eci !== 'Aam Aadmi Party' && el.party_eci !== 'Bahujan Samaj Party' && el.Alliance === 'None' ){
      majorparty['Others']['values'].push(el)
    }
  })
  majorPartiesArr.forEach(el => {
    let totalAssets = 0, noOfCr = 0, assetVal = [], noOfCriminal = 0, noOfSeriousCriminal = 0, femaleCandidates = 0, ageVal = [];
    majorparty[el]['values'].forEach(d => {
      totalAssets = totalAssets + d.net_assets;
      assetVal.push(d.net_assets)
      if(d.net_assets >= 10000000) noOfCr++
      if(d.age !== 'NaN') ageVal.push(d.age)
      if(d.criminal_cases > 0) noOfCriminal++
      if(d.serious_criminal_cases > 0) noOfSeriousCriminal++
      if(d.gender === 'Female') femaleCandidates++
    })
    assetVal.sort((a, b) => a - b);
    ageVal.sort((a, b) => a - b);
    let lowMiddle = Math.floor((assetVal.length - 1) / 2), highMiddle = Math.ceil((assetVal.length - 1) / 2);
    let median = (assetVal[lowMiddle] + assetVal[highMiddle]) / 2;
    let lowMiddleAge = Math.floor((ageVal.length - 1) / 2), highMiddleAge = Math.ceil((ageVal.length - 1) / 2);
    let medianAge = (ageVal[lowMiddleAge] + ageVal[highMiddleAge]) / 2;
    majorparty[el]['TotalAssets'] = totalAssets
    majorparty[el]['NoOfCrorepati'] = noOfCr
    majorparty[el]['MedianAssets'] = median
    majorparty[el]['noOfCriminal'] = noOfCriminal
    majorparty[el]['noOfSeriousCriminal'] = noOfSeriousCriminal
    majorparty[el]['noOfFemaleCandidates'] = femaleCandidates
    majorparty[el]['MedianAge'] = medianAge
  })
  let mjrPartiesArr = []
  majorPartiesArr.forEach(el => {
    let netAssetMax = 0,richest, maxCases = 0,mostCases;
    majorparty[el]['values'].forEach(d => {
      if(d.net_assets > netAssetMax){
        netAssetMax = d.net_assets
        richest = d
      }
      if(d.criminal_cases > maxCases){
        maxCases = d.criminal_cases
        mostCases = d
      }
    })
    let obj = {
      'partyName':el,
      'TotalAssets':majorparty[el]['TotalAssets'],
      'NoOfCrorepati':majorparty[el]['NoOfCrorepati'],
      'values':majorparty[el]['values'],
      'MedianAssets':majorparty[el]['MedianAssets'],
      'AverageAssets':(majorparty[el]['TotalAssets'] / majorparty[el]['values'].length).toFixed(1),
      'FemalePercentage':(majorparty[el]['noOfFemaleCandidates']  * 100 / majorparty[el]['values'].length).toFixed(1),
      'noOfFemaleCandidates':majorparty[el]['noOfFemaleCandidates'],
      'richestCandidate':richest,
      'mostCasesCandidate':mostCases,
      'NoOfSeriousCriminal':majorparty[el]['noOfSeriousCriminal'],
      'NoOfCriminal':majorparty[el]['noOfCriminal'],
      'medianAge':majorparty[el]['MedianAge'],
    }
    mjrPartiesArr.push(obj)
  })
  majorPartiesArr.sort((a,b) => a.partyName - b.partyName)
  return (
    <div className="App">
      <div className='tooltip' />
      <div className="header">
        <div className='header-wrap'>
          <div className='header-title'>
            <div className='header-span'>
              Anatomy of Delhi assembly election 2020<br /><span className='italics header-subtext'>Wealth, criminal cases, gender, age and education qualification of every candidate in the election</span>
            </div>
          </div>
        </div>
      </div>
      <div className="share-header">
        <div className='share share-top'>
          <span className='footer-start'>Share the <span aria-label="love-emoji" role="img">💖</span></span>
          <div className='icons'>
            <FacebookShareButton url='https://anatomy-of-delhi-election.netlify.com/' quote="Anatomy of Delhi assembly election 2020: Wealth, criminal cases, gender, age and education qualification of every candidate in the election">
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url='https://anatomy-of-delhi-election.netlify.com/' title="Anatomy of Delhi assembly election 2020: Wealth, criminal cases, gender, age and education qualification of every candidate in the election via @mustafasaifee42">
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
        </div>
        <div className='reading-time'>Reading time: 6 - 8 mins</div>
      </div>
      <div className="container">
        <div className='content-table'>
          <div className='section-title'>
            Content
          </div>
          <div className='content-list-div'>
            <ol>
              <li className='content-list'><a href="#introduction">Introduction</a></li>
              <li className='content-list'><a href="#wealth">Wealth of candidates</a></li>
              <li className='content-list'><a href="#criminal_charges">Criminal charges</a></li>
              <li className='content-list'><a href="#gender_diversity">Gender diversity</a></li>
              <li className='content-list'><a href="#age_diversity">Age diversity</a></li>
              <li className='content-list'><a href="#education_qualification">Education qualification</a></li>
            </ol>
          </div>
        </div>
        <hr />
        <div className='section-title' id='introduction'>
          Introduction
        </div>
        <div className='first-para'>Legislative Assembly elections are held in Delhi on <span className='bold'>8 February 2020</span> to elect <span className='bold'>70 Members</span> of the Delhi Legislative Assembly.</div>
        <div className='red quote'><span className='bold'>{dataWODuplicates.length}</span> candidates form <span className='bold'>{dataByParties.length - 1}</span> different political parties ( + independent contestants) contested the election for <span className="bold">70</span> seats.</div>
        <div><span className='italics'>3 candidates (<span className='bold'>Imran Khan, Pratap Chandra</span> and <span className='bold'>Sadeque Muniroddin Shaikh</span>) are contesting from multiple seats.</span> Bharatiya Janata Party (BJP), Janata Dal (United) (JDU) and Lok Janshakti Party (LJP) are contesting the election in an alliance, National Democratic Alliance (NDA). Indian National Congress (INC) and Rashtriya Janata Dat (RJD) are also in a pre-poll alliance, United Progressive Alliance (UPA). Apart from the 2 alliances, Aam Aadmi Party (AAP) (contesting on all 70 seats) and Bahujan Samaj Party (BSP) (contesting on 68 out of 70 seats) are the other 2 major parties in this elections.</div>
        <br />
        <div>As part of the nomination process, contestant have to disclose their  wealth, criminal cases, age, profession, education and family details. <a href="https://adrindia.org/" target='_blank' rel="noopener noreferrer">The Association of Democratic Reforms</a> maintains a database of this information [<a href='http://myneta.info/delhi2020/' rel="noopener noreferrer" target='_blank'>link here</a>].</div>
        <hr />
      </div>  
      <WealthSection
        data={dataWODuplicates}
        majorPartiesArr = {mjrPartiesArr}
        dataByContituency={dataByContituency}
        colorObj={colorObj}
      />
      <CriminalSection
        data={dataWODuplicates}
        majorPartiesArr = {mjrPartiesArr}
        dataByContituency={dataByContituency}
        colorObj={colorObj}
      />
      <GenderSection
        data={dataWODuplicates}
        majorPartiesArr = {mjrPartiesArr}
        dataByContituency={dataByContituency}
        dataByGender={dataByGender}
        colorObj={colorObj}
      />
      <AgeSection
        data={dataWODuplicates}
        majorPartiesArr = {mjrPartiesArr}
        dataByContituency={dataByContituency}
        dataByGender={dataByGender}
        colorObj={colorObj}
      />
      <EducationSection
        data={dataWODuplicates}
        majorPartiesArr = {mjrPartiesArr}
      />
      <div className="footer">
        <div className='email'>Please email me at <a href="mailto:ddj2020@protonmail.com" target="_blank" rel="noopener noreferrer">ddj2020@protonmail.com</a> for suggestions or queries</div>
        <div className='share'>
          <span className='footer-start'>You got all the way down here, consider sharing the <span aria-label="love-emoji" role="img">💖</span></span>
          <div className='icons'>
            <FacebookShareButton url='https://anatomy-of-delhi-election.netlify.com/' quote="Anatomy of Delhi assembly election 2020: Wealth, criminal cases, gender, age and education qualification of every candidate in the election">
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url='https://anatomy-of-delhi-election.netlify.com/' title="Anatomy of Delhi assembly election 2020: Wealth, criminal cases, gender, age and education qualification of every candidate in the election via @mustafasaifee42">
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
        </div>
        <div className="footer-content">
          Conversion Rate: US$ 1 = INR 71.43<br /><br/>
          Data source: <a href="https://adrindia.org/" target="_blank" rel="noopener noreferrer">Association for Democratic Reforms (ADR)</a> and <a href='http://myneta.info/delhi2020/' target="_blank" rel="noopener noreferrer">MyNeta</a>. Datasheet for the visualization can be found <a href="./data.json" target="_blank" rel="noopener noreferrer">here</a>. <br /> <br />
          <span className="bold">PRIVACY POLICY</span> <br />This website does not save any information about you. We do not directly use cookies or other tracking technologies. We do, however, use Google Analytics for mere statistical reasons. It is possible that Google Analytics sets cookies or uses other tracking technologies, but this data is not directly accessible by us.
          <br /><br />
          This page is hosted on <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>
        </div>
      </div>
    </div>
  );
}

export default App;
