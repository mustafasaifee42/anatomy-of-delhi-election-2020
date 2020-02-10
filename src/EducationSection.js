import React, { Component } from 'react';
import * as d3 from 'd3';
import EducationGraph from './EducationGraph';

class ProjectCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(){
    let dataByEducation = d3.nest()
      .key(d => d.education)
      .entries(this.props.data);
    let educationCombined = [
      {
        'key':'Class 10 and below',
        'Total':0
      },
      {
        'key':'Class 12 to Diploma',
        'Total':0
      },
      {
        'key':'Graduation and above',
        'Total':0          
      }
    ]
    dataByEducation.forEach(el =>{
      if(el.key === "Illiterate" || el.key === "Literate" || el.key === "5th Pass" || el.key === "10th Pass" || el.key === "8th Pass")
        educationCombined[0].Total = educationCombined[0].Total + el.values.length 
      if(el.key === "12th Pass" || el.key === "Diploma")
        educationCombined[1].Total = educationCombined[1].Total + el.values.length 
      if(el.key === "Graduate" || el.key === "Post Graduate" || el.key === "Graduate Professional" || el.key === "Doctorate")
        educationCombined[2].Total = educationCombined[2].Total + el.values.length 
    })
    let EduArr = [
      {
        'key':'All',
        'value':[
          {
            'key':'Class 10 and below',
            'Total':educationCombined[0].Total,
            'Percent':(educationCombined[0].Total * 100 / this.props.data.length).toFixed(1),
          },
          {
            'key':'Class 12 to Diploma',
            'Total':educationCombined[1].Total,
            'Percent':(educationCombined[1].Total * 100 / this.props.data.length).toFixed(1),
          },
          {
            'key':'Graduation and above',
            'Total':educationCombined[2].Total,
            'Percent':(educationCombined[2].Total * 100 / this.props.data.length).toFixed(1),      
          }
        ]
      }
    ]
    this.props.majorPartiesArr.forEach(elem => {
      let valuesByEducation = d3.nest()
        .key(d => d.education)
        .entries(elem.values);
      let educationCom = [
        {
          'key':'Class 10 and below',
          'Total':0,
          'Percent':0,
        },
        {
          'key':'Class 12 to Diploma',
          'Total':0,
          'Percent':0,
        },
        {
          'key':'Graduation and above',
          'Total':0,
          'Percent':0,        
        }
      ]
      valuesByEducation.forEach(el =>{
        if(el.key === "Illiterate" || el.key === "Literate" || el.key === "5th Pass" || el.key === "10th Pass" || el.key === "8th Pass")
          educationCom[0].Total = educationCom[0].Total + el.values.length 
        if(el.key === "12th Pass" || el.key === "Diploma")
          educationCom[1].Total = educationCom[1].Total + el.values.length 
        if(el.key === "Graduate" || el.key === "Post Graduate" || el.key === "Graduate Professional" || el.key === "Doctorate")
          educationCom[2].Total = educationCom[2].Total + el.values.length 
      })
      educationCom.forEach(el => {
        el.Percent = (el.Total * 100 / elem.values.length).toFixed(1)
      })
      let obj = {
        'key': elem.partyName,
        'value':educationCom
      }
      EduArr.push(obj)
    })


    let tableBodyCr = educationCombined.map((el,i) => {
      return (
        <tr key = {i}>
          <td>
            {el.key}
          </td>
          <td className='assets'>
            {el.Total}
          </td>
          <td className='assets'>
            {(el.Total * 100 / this.props.data.length).toFixed(1)}%
          </td>
        </tr>
      )
    })
    let wid = window.innerWidth - 40;
    if (window.innerWidth  > 720) {
      wid = 720
    }
    return (
      <div className='donut' id='education_qualification'>
        <div className='container'>
          <div className='section-title'>
            Education Background
          </div>  
          <div className='first-para'>In Indian political system doesn’t prescribe a minimum educational qualification to contest elections in the country. There is a constant debate of whether a minimum education qualification is needed for elected representatives. Some people believe that if elected members are illiterate, it would be very hard for them to make the best decision. However, Jagdeep Chhokar, founder member of the Association for Democratic Reform disagrees and told BloombergQuint that <span className='bold italics'>"education is still not easily accessible throughout India and until that is achieved, governments have no moral right to levy such criteria"</span> [<a href='https://www.bloombergquint.com/law-and-policy/should-there-be-a-minimum-educational-qualification-to-contest-polls'  rel="noopener noreferrer"  target='_blank'>article here</a>].</div>
          <table>
            <thead>
              <tr>
                <th>Education Level</th>
                <th className='assets'>No. of Candidates</th>
                <th className='assets'>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {tableBodyCr}
            </tbody>
          </table>       
        </div>
        <div className='age-graph-container'>
          <EducationGraph
            data={EduArr}
            width={wid}
            height={400}

          />
        </div>
      </div>
    )
  }
}
export default ProjectCards