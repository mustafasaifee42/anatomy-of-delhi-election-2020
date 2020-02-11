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
    if (window.innerWidth  > 720) {
      wid = 720
    }
    let partyArry = [], medianAssets = [], noOfConstituencyWithWomen = 0, secondaryText = [];
    this.props.dataByContituency.forEach(el => {
      if(el.noOfFemaleCandidates  > 0) noOfConstituencyWithWomen++
    })
    this.props.majorPartiesArr.forEach(el => {
      partyArry.push(el.partyName)
      medianAssets.push(el.FemalePercentage)
      secondaryText.push(`${el.noOfFemaleCandidates} (out of ${el.values.length})`)
    })
    let tableBodyCr = this.props.majorPartiesArr.map((el,i) => {
      return (
        <tr key = {i}>
          <td>
            {el.partyName}
          </td>
          <td className='assets'>
            {el.noOfFemaleCandidates} (out of {el.values.length})
          </td>
          <td className='assets'>
            {el.FemalePercentage}%
          </td>
        </tr>
      )
    })
    return (
      <div className='donut' id='gender_diversity'>
        <div className='container'>
          <div className='section-title'>
            Gender Diversity
          </div>  
          <div className='first-para'>In 2020, out of {this.props.data.length} contestant, only <span className='bold'>{this.props.dataByGender[1].values.length}</span> are females, which is less than <span className='bold'>{Math.ceil(this.props.dataByGender[1].values.length * 100 / this.props.data.length)}%</span> of the whole field and there were no candidates from the third gender.</div>
          <div className='red quote'>Only <span className='bold'>1 in {Math.round(this.props.data.length / this.props.dataByGender[1].values.length)}</span> candidate contesting elections is a female</div>
          <div className='red quote'><span className='bold'>{70 - noOfConstituencyWithWomen} constituencies</span> out of 70 (~33 %) have no one women candidate i.e <span className='bold'>1 in every 3</span> contituencies have no female representation</div>
          <div>This highlights a problem of gender bias in these elections. <span className='bold italics'>"One factor driving this is a bias on the part of political parties, the notion that women candidates cannot be relied on to win elections. They are believed to lack access to the political networks and resources that men have."</span> - Sudipta Sarangi (professor of economics in Louisiana State University) and Chandani K Jha (a doctoral student in LSU) wrote in an article in <a href="https://www.thehindubusinessline.com/opinion/gender-bias-in-indian-elections/article22995090.ece" rel="noopener noreferrer" target='_blank'>Business Standard</a>.</div>
          <table>
            <thead>
              <tr>
                <th>Party / Alliance</th>
                <th className='assets'>Total No. of Women Candidates</th>
                <th className='assets'>% of Women Candidates</th>
              </tr>
            </thead>
            <tbody>
              {tableBodyCr}
            </tbody>
          </table>
        </div>
        <div className='maps-container'>
          <div className='map-container'>            
            <div className='bar-note'><span className='bold'>23 out of 70</span> constituencies have no female candidates contesting elections.<br /><br /><span className='bold'>SHALIMAR BAGH</span> has 5 female candidates (out of 12) contesting election.</div>
            <br />
            <div className='subnote'>Percentage of women candidate</div>
            <BarGraph
              barList = {partyArry}
              barWidth = {medianAssets}
              width={Math.min(wid,460)}
              height={250}
              barHeight = {20}
              colorObj = {this.props.colorObj}
              maxValue= {20}
              maxValueAvailable={true}
              formatNumber ={false}
              line = {(this.props.dataByGender[1].values.length * 100 / this.props.data.length).toFixed(1)}
              text={'Percentage of women candidates'}
              secondaryText={secondaryText}
              offsetSecondaryText={[83,75,83,75,98]}
            />
          </div>
          <div className='map-container'>
            <Map
              hexRadius = {Math.min((wid - 50) / (12 * Math.sqrt(3)),20)}
              width={Math.min(wid,460)}
              height={Math.min(wid + 40,500)}
              data={this.props.dataByContituency}
              color={'noOfFemaleCandidates'}
              domain={[1,2]}
              translateY = {50}
              colorValue = {["#e1e1e1", '#fcae91', "#a50f15"]}
              labels={['No women candidates','1 woman candidate','2 or more women candidates']}
              legendYoffset = {65}
              hightlight={"14"}
              textOffset={20}
              note={'Shalimar Bagh has the highest women candidates: 5'}
              formatNumber={false}
              women={true}
            />
          </div>
        </div>
        <div className='container'><hr /></div>
      </div>
    )
  }
}
export default ProjectCards