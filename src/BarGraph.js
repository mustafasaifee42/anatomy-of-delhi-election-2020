import React, { Component } from 'react';
import formatNumber from './formatNumber.js';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import 'd3-selection-multi';
import './barcharts.css';

class ProjectCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    const node  = this.node;
    
    let maxVal = this.props.maxValue
    if(!this.props.maxValue){
      maxVal = 0
      this.props.barWidth.forEach(d => {
        if (d > maxVal){
          maxVal = d
        }
      })
    }
    let xScale = scaleLinear()
      .domain([0,maxVal])
      .range([0,this.props.width])
    select(node)
      .selectAll('.bars')  
      .data(this.props.barWidth)
      .enter()
      .append('rect')
      .attrs({
        'x':0,
        'y':(d,i) => (i) * (this.props.barHeight + 27) + 25,
        'width':(d,i) => xScale(d),
        'height':this.props.barHeight,
        'fill':(d,i) => this.props.colorObj[this.props.barList[i]],
        'rx':1,
        'ry':1,
      })
    if(this.props.line){
      let number = `${this.props.line}%`
      if(this.props.formatNumber) {
        number = `Rs. ${formatNumber(this.props.line)}`
      }
      if(this.props.age) {
        number = `${this.props.line} Yrs.`
      }
      select(node)
        .append('line')
        .attrs({
          'x1':(d,i) => xScale(this.props.line),
          'y1':(d,i) => 0,
          'x2':(d,i) => xScale(this.props.line),
          'y2':this.props.height,
          'fill':'none',
          'stroke':'#666',
          'stroke-width':2,
          'opacity':0.4,
          "stroke-dasharray": "10 5",
        })
      select(node)
        .append('text')
        .attrs({
          'x':(d,i) => xScale(this.props.line) + 3,
          'y':(d,i) => this.props.height - 15,
          'font-family':'IBM Plex Sans',
          'fill':'#666',
          'font-size':12,
        })
        .text(this.props.text)
      select(node)
        .append('text')
        .attrs({
          'x':(d,i) => xScale(this.props.line) + 3,
          'y':(d,i) => this.props.height,
          'font-family':'IBM Plex Sans',
          'fill':'#666',
          'font-size':12,
          'font-weight':'700'
        })
        .text(`${number}`)

    }
    select(node)
      .selectAll('.textLabel')  
      .data(this.props.barList)
      .enter()
      .append('text')
      .attrs({
        'x':0,
        'y':(d,i) => (i) * (this.props.barHeight + 27) - 10,
        'dy':30,
        'font-size':14,
        'font-weight':'700',
        'font-family':'IBM Plex Sans',
        'fill':(d,i) => this.props.colorObj[this.props.barList[i]],
      })
      .text((d,i) => {
        let value = this.props.barWidth[i]
        let number = `${value}%`
        if(this.props.formatNumber) {
          number = `Rs. ${formatNumber(value)}`
        }
        if(this.props.age) {
          number = `${value} Yrs.`
        }
        if(this.props.case) {
          number = `${value} Cases`
        }
        return `${d}: ${number}`
      })
    if(this.props.secondaryText){
      select(node)
        .selectAll('.textLabelSec')  
        .data(this.props.secondaryText)
        .enter()
        .append('text')
        .attrs({
          'x':(d,i) => this.props.offsetSecondaryText[i],
          'y':(d,i) => (i) * (this.props.barHeight + 27) - 10,
          'dy':30,
          'font-size':14,
          'font-family':'IBM Plex Sans',
          'fill':'#333',
        })
        .text(d => d)


    }

  }
  render(){
    return (
      <div className='bar-graph-container'>
        <svg width={this.props.width} height={this.props.height} ref={node => this.node = node} />
      </div>
    )
  }
}
export default ProjectCards