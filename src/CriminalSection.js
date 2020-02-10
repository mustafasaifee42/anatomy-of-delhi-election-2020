import React, { Component } from 'react';
import BarGraph from './BarGraph';
import Map from './Map'
import './table.css'

class ProjectCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(){
    let wid = window.innerWidth - 40;
    let noOfCriminalCandidate = 0,maxCriminalCases = 0, mostCriminal,noOfSeriousCriminalCandidate = 0;
    this.props.data.forEach(el => {
      if(el.criminal_cases > 0)
        noOfCriminalCandidate++
      if(el.criminal_cases > maxCriminalCases){
        maxCriminalCases = el.criminal_cases
        mostCriminal = el
      }
      if(el.serious_criminal_cases){
        noOfSeriousCriminalCandidate++
      }
    })
    if (window.innerWidth  > 720) {
      wid = 720
    }
    let partyArry = [], medianAssets = [], noOfConstituencyWithCriminal = 0, secondaryText=[];
    this.props.dataByContituency.forEach(el => {
      if(el.noOfCriminal  > 0) noOfConstituencyWithCriminal++
    })
    this.props.majorPartiesArr.forEach(el => {
      partyArry.push(el.partyName)
      medianAssets.push((el.NoOfCriminal * 100 / el.values.length).toFixed(1))
      secondaryText.push(`${el.NoOfCriminal}(out of ${el.values.length})`)
    })
    let median = (noOfCriminalCandidate * 100 / this.props.data.length).toFixed(1)
    return (
      <div className='donut' id='criminal_charges'>
        <div className='container'>
          <div className='section-title'>
            Criminal Charges
          </div>  
          <div className='first-para'>Indian election laws allow candidates accused in criminal cases to run so long as they have not been convicted.</div>
          <div className='red quote'>About every <span className='bold'>1 in {Math.round(this.props.data.length / noOfCriminalCandidate)} ({(noOfCriminalCandidate * 100 / this.props.data.length).toFixed(1)}%)</span> candidate contesting elections have criminal cases against them</div>
          <div><span className='bold'>{noOfCriminalCandidate}</span> out of {this.props.data.length} candidates have criminal case against them. Out of these, <span className='bold'>{noOfSeriousCriminalCandidate}</span> candidates have serous criminal cases against them.</div>
          <br />
          <div><span className='bold'>32 candidates</span> have declared cases related to <span className='bold'>crime against women</span>. Out of 32 candidates 1 candidate has declared cases related to rape (IPC Section-376). <span className='bold'>4 candidates</span> have declared cases related to <span className='bold'>attempt to murder</span> (IPC Section-307) against themselves. <span className='bold'>8 candidates</span> have declared cases related to <span className='bold'>hate speech</span>.</div>
          <br />
          <div>The candidate with most no. of criminal cases against him is <span className='bold'>{mostCriminal.candidate_name}</span> from <span className='bold'>{mostCriminal.party_eci}</span> contesting from <span className='italics'>{mostCriminal.constituency}</span> seat with <span className='italics'>{mostCriminal.criminal_cases} cases</span> against him.</div>
          <br />
          <div><span className='bold'>{this.props.majorPartiesArr[2].mostCasesCandidate.candidate_name}</span> from <span className='bold'>INC</span> contesting from <span className='italics'>{this.props.majorPartiesArr[2].mostCasesCandidate.constituency}</span> seat have <span className='italics'>{this.props.majorPartiesArr[2].mostCasesCandidate.criminal_cases} cases</span> declared against him (most for UPA). <span className='bold'>BJP's</span> <span className='bold'>{this.props.majorPartiesArr[1].mostCasesCandidate.candidate_name}</span> contesting from <span className='italics'>{this.props.majorPartiesArr[1].mostCasesCandidate.constituency}</span> seat has <span className='italics'>{this.props.majorPartiesArr[1].mostCasesCandidate.criminal_cases} cases</span> against him (most for NDA). Candidate with most case against them from <span className='bold'>BSP</span> is <span className='bold'>{this.props.majorPartiesArr[3].mostCasesCandidate.candidate_name}</span> contesting from <span className='italics'>{this.props.majorPartiesArr[3].mostCasesCandidate.constituency}</span> seat (<span className='italics'>{this.props.majorPartiesArr[3].mostCasesCandidate.criminal_cases} cases</span> declared against him).</div>
          <div className='red quote'><span className='bold'>{noOfConstituencyWithCriminal} constituencies</span> out of 70 (~86 %) have at least one candidate facing criminal charges</div>
          <div><span className='bold'>CHATTARPUR, TUGHLAKABAD</span> and <span className='bold'>WAZIRPUR</span> are the contituency where most candidate facing criminal charges are contesting (4 candidates).</div>  
        </div>
        <div className='maps-container'>
          <div className='map-container'>
            <div className='bar-note'><span className='bold'>Arvind Kejriwal</span> from <span className='bold'>Aam Aadmi Party</span> contesting from <span className='bold'>NEW DELHI</span> seat has the most cases (13 cases) against him.</div>
            <br />
            <div className='subnote'>Percentage of candidate facing criminal charges</div>
            <BarGraph
              barList = {partyArry}
              barWidth = {medianAssets}
              width={Math.min(wid,460)}
              height={250}
              barHeight = {20}
              colorObj = {this.props.colorObj}
              maxValue= {100}
              maxValueAvailable={true}
              formatNumber ={false}
              line = {median}
              text={'Percentage of all candidates with criminal cases'}
              secondaryText={secondaryText}
              offsetSecondaryText={[85,85,85,85,90]}
            />
          </div>
          <div className='map-container'>
            <Map
              hexRadius = {Math.min((wid - 50) / (12 * Math.sqrt(3)),20)}
              width={Math.min(wid,460)}
              height={Math.min(wid + 30,490)}
              data={this.props.dataByContituency}
              color={'noOfSeriousCriminal'}
              domain={[1,2,3,4]}
              translateY = {0}
              colorValue = {["#e1e1e1", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"]}
              labels={['0 cand. with cases','1 cand. with cases','2 cand. with cases','3 cand. with cases','4+ cand. with cases']}
              legendWidth={[90,90,90,90,90]}
              legendPosX={[0,90,180,270,360]}
              labelPosX={[45,135,225,315,405]}
              case={true}
              formatNumber={false}
            />
          </div>
        </div>
        <div className='container'><hr /></div>
      </div>
    )
  }
}
export default ProjectCards