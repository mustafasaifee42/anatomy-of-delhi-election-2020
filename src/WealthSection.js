import React, { Component } from 'react';
import BarGraph from './BarGraph';
import formatNumber from './formatNumber.js';
import Map from './Map'
import './table.css'

class ProjectCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render(){
    this.props.data.sort((a, b) =>  b.net_assets - a.net_assets);
    const conversionRate = 0.014;
    let totalMoney = 0, assetValue = [], noOfCrorepati = 0;
    this.props.data.forEach(d => {
      totalMoney = totalMoney + d.net_assets
      if(d.net_assets >= 10000000) noOfCrorepati++;
      assetValue.push(d.net_assets)
    })
    assetValue.sort((a, b) => a - b);
    let lowMiddle = Math.floor((assetValue.length - 1) / 2), highMiddle = Math.ceil((assetValue.length - 1) / 2);
    let median = (assetValue[lowMiddle] + assetValue[highMiddle]) / 2;
    let partyArry = [], medianAssets = [], noOfCr = [],length = [],noOfCrPercent = [], secondaryText = [];
    this.props.majorPartiesArr.forEach(el => {
      partyArry.push(el.partyName)
      medianAssets.push(el.MedianAssets)
      noOfCr.push(el.NoOfCrorepati)
      length.push(el.values.length)
      noOfCrPercent.push((el.NoOfCrorepati * 100 / el.values.length).toFixed(1))
      secondaryText.push(`${el.NoOfCrorepati} (out of ${el.values.length})`)
    })
    
    let tableBodyCr = this.props.majorPartiesArr.map((el,i) => {
      return (
        <tr key = {i}>
          <td>
            {el.partyName}
          </td>
          <td className='assets'>
            Rs. {formatNumber(el.MedianAssets)}
          </td>
          <td className='assets'>
            {el.NoOfCrorepati} (out of {el.values.length})
          </td>
          <td className='assets'>
            {(el.NoOfCrorepati * 100 / el.values.length).toFixed(1)}%
          </td>
        </tr>
      )
    })
    let wid = window.innerWidth - 40
    if (window.innerWidth  > 720) {
      wid = 720
    }
    return (
      <div className='donut' id='wealth'>
        <div className='container'>
          <div className='section-title'>
            Wealth of Candidates
          </div>  
          <div className='first-para' >Total net assets of all the candidates contesting the poll is in in excess of <span className='bold'>Rs. {Math.floor(totalMoney / 1000000000)} Billion (US$ {Math.floor(totalMoney * conversionRate / 1000000)} Million)</span>.</div>
          <div className='red quote'>The median net assets is <span className='bold'>Rs. {formatNumber(median)} (~ US$ {Math.round(median * conversionRate)})</span></div>
        </div>
        <div className='maps-container'>
          <div className='map-container'>
            <div className='bold'>Median Wealth  of the candidates</div>
            <br />
            <div className='bar-note'>Candidates representing <span className='bold'>PATEL NAGAR</span> contituency has the highest median net assets <span className='italics'>(Rs 6 10 65 560)</span><br /><br />Candidates representing <span className='bold'>MODEL TOWN</span> contituency has the lowest median net assets <span className='italics'>(Rs. 2 83 355.5)</span>.</div>
            <br />
            <div className='subnote'>Median net assets of the candidates</div>
            <BarGraph
              barList = {partyArry}
              barWidth = {medianAssets}
              width={Math.min(wid,460)}
              height={250}
              barHeight = {20}
              colorObj = {this.props.colorObj}
              maxValueAvailable={false}
              formatNumber ={true}
              line = {median}
              text={'All Candidates (median net assets)'}
            />
          </div>
          <div className='map-container'>
            <Map
              hexRadius = {Math.min((wid - 50) / (12 * Math.sqrt(3)),20)}
              width={Math.min(wid,460)}
              height={Math.min(wid + 50,510)}
              data={this.props.dataByContituency}
              color={'MedianAssets'}
              domain={[1000000, 2500000, 5000000, 10000000]}
              translateY = {50}
              colorValue = {["#dee8f1", "#a1bdd7", "#7492ae", "#50697e", "#34414e"]}
              labels={['Rs. 0-10L','Rs. 10L-25L','Rs. 25L-50L','Rs. 50L-1Cr','Rs. 1Cr+']}
              legendYoffset = {105}
              formatNumber={true}
              hightlight={"24"}
              textOffset={10}
              note={'PATEL NAGAR (highest median net assets)'}
              hightlight1={"18"}
              textOffset1={30}
              note1={'MODEL TOWN (lowest Median net assets)'}
            />
          </div>
        </div>
        <div className='container'>
          <div>The richest candidate in the election is <span className='bold'>{this.props.data[0].candidate_name}</span> from <span className='bold'>{this.props.data[0].party_eci}</span> contesting from <span className='italics'>{this.props.data[0].constituency}</span> seat with net assets of <span className='italics'>Rs. {formatNumber(this.props.data[0].net_assets)}</span>.</div>
          <br />
          <div>Richest candidate from <span className='bold'>UPA</span> is <span className='bold'>{this.props.majorPartiesArr[2].richestCandidate.candidate_name}</span> contesting from <span className='italics'>{this.props.majorPartiesArr[2].richestCandidate.constituency}</span> seat with net assets worth <span className='italics'>Rs. {formatNumber(this.props.majorPartiesArr[2].richestCandidate.net_assets)}</span>. <span className='bold'>NDA's</span> richest candidate is <span className='bold'>{this.props.majorPartiesArr[1].richestCandidate.candidate_name}</span> contesting from <span className='italics'>{this.props.majorPartiesArr[1].richestCandidate.constituency}</span> seat with net assets worth <span className='italics'>Rs. {formatNumber(this.props.majorPartiesArr[1].richestCandidate.net_assets)}</span>. </div>
          <div className='red quote'>About every <span className='bold'>1 in {Math.round(this.props.data.length / noOfCrorepati)} ({(noOfCrorepati * 100 / this.props.data.length).toFixed(1)}%)</span> candidate contesting elections is a crorepati (i.e. net assets > Rs. 1 00 00 000)</div>
        </div>
        <div className='maps-container'>
          <div className='map-container'>
            <div className='bold'>Percentage of crorepati candidates</div>
            <br />
            <div className='bar-note'><span className='bold'>Dharampal Lakra</span> from <span className='bold'>AAP</span> contesting from <span className='italics'>MUNDKA</span> is the richest candidate with net assets <span className='italics'>Rs. 286 07 42 598</span><br /><br /><span className='bold'>Rohini</span> and <span className='bold'>Greater Kailash</span> has the highest percentage of crorepati candidates <span className='italics'>(85.7%)</span>.</div>
            <br />
            <div className='subnote'>Percentage of crorepati candidate</div>
            <BarGraph
              barList = {partyArry}
              barWidth = {noOfCrPercent}
              width={Math.min(wid,460)}
              height={250}
              barHeight = {20}
              colorObj = {this.props.colorObj}
              maxValue= {100}
              maxValueAvailable={true}
              line={(noOfCrorepati * 100 / this.props.data.length).toFixed(1)}
              text={'All Candidates (%age of crorapatis)'}
              secondaryText={secondaryText}
              offsetSecondaryText={[85,85,85,85,100]}
            />
          </div>
          <div className='map-container'>
            <Map
              hexRadius = {Math.min((wid - 50) / (12 * Math.sqrt(3)),20)}
              width={Math.min(wid,460)}
              height={Math.min(wid + 60,520)}
              data={this.props.dataByContituency}
              color={'PercentageCr'}
              domain={[1,20, 40, 60, 80]}
              translateY = {50}
              colorValue = {['#dddddd',"#dee8f1", "#a1bdd7", "#7492ae", "#50697e", "#34414e"]}
              labels={['No crorepati','1-20%','20-40%','40-60%','60-80%','80-100%']}
              legendYoffset = {115}
              formatNumber={false}
              percentage={true}
              hightlight={"8"}
              textOffset={20}
              note={'Richest candidate is Dharampal Lakra (AAP) from MUNDKA'}
            />
          </div>
        </div>
        <div className='container'>
          <table>
            <thead>
              <tr>
                <th>Party / Alliance</th>
                <th className='assets'>Median Net Assets</th>
                <th className='assets'>Total No. of Crorepati</th>
                <th className='assets'>% of Crorepati</th>
              </tr>
            </thead>
            <tbody>
              {tableBodyCr}
            </tbody>
          </table>
          <hr />
        </div>
      </div>
    )
  }
}
export default ProjectCards