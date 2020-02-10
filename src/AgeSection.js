import React, { Component } from 'react';
import AgeGraph from './AgeGraph';

class ProjectCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(){
    let wid = window.innerWidth - 40;
    if (window.innerWidth  > 1176) {
      wid = 1176
    }
    let partyArry = [], medianAssets = [];
    this.props.majorPartiesArr.forEach(el => {
      partyArry.push(el.partyName)
      medianAssets.push(el.medianAge)
    })
    let ageVal = [];
    this.props.data.forEach(d => {
      if(d.age !== 'NaN') ageVal.push(d.age)
    })
    ageVal.sort((a, b) => a - b);
    let lowMiddleAge = Math.floor((ageVal.length - 1) / 2), highMiddleAge = Math.ceil((ageVal.length - 1) / 2);
    let medianAge = (ageVal[lowMiddleAge] + ageVal[highMiddleAge]) / 2;
    return (
      <div className='donut' id='age_diversity'>
        <div className='container'>
          <div className='section-title'>
            Age Diversity
          </div>  
          <div className='first-para'>For contesting an election in India the minimum age limit is <span className='bold'>25 years</span>. The age range of candidates in this election is from 25 years to 80 years. 80 years old <span className='bold'>Yadubansh Singh</span> is the oldest candidate, he is from <span className='bold'>Proutist Bloc, India</span> party and contesting from <span className='italics'>BADARPUR</span> seat. <span className='italics'>8 candidates have note declared their age.</span></div>
          <div className='red quote'>Median age of candidates in this election is <span className='bold'>{Math.round(medianAge)} years</span></div>
        </div>
        <div className='age-graph-container'>
          <AgeGraph
            width = {wid}
            height = {320}
            data={this.props.data}
            colorObj={this.props.colorObj}
          />
        </div>
        <div className='container'><hr /></div>
      </div>
    )
  }
}
export default ProjectCards