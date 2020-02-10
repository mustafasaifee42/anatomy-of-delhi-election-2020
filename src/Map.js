import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleThreshold } from 'd3-scale';
import Delhi_TGM from './DelhiTGM_1.json';
import formatNumber from './formatNumber.js';
import 'd3-selection-multi';

class ProjectCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidUpdate(){
    this.createGraph()
  }
  hover = (partyName,value) => {
    let xPos = window.event.clientX
    let yPos = window.event.clientY
    let number = `${value}`
    if(this.props.percentage) {
      number = `${value}%`
    }

    if(this.props.age) {
      number = `${value} Yrs.`
    }
    if(this.props.case) {
      number = `${value} candidates with criminal cases`
    }
    if(this.props.women) {
      number = `${value} women candidates`
    }
    if(this.props.formatNumber) {
      number = `Rs. ${formatNumber(value)}`
    }
    select('.tooltip')
      .style('position','absolute')
      .style('display','inline-block')
      .style('left',`${window.scrollX + xPos + 10}px`)
      .style('top',`${window.scrollY + yPos - 10}px`)
      .html(`${partyName}: <span class="bold">${number}</span>`)
  }
  mouseMove = () => {
    let xPos = window.event.clientX
    let yPos = window.event.clientY
    select('.tooltip')
      .style('left',`${window.scrollX + xPos + 10}px`)
      .style('top',`${window.scrollY + yPos - 10}px`)
  }
  mouseOut = () => {
    select('.tooltip')
      .style('display','none')
  }
  coordinatesObj = {}
  getHexPoints = (cx,cy, rad) => {
    let path = `M${cx + rad} ${cy - rad / Math.tan(Math.PI / 3)} L ${cx + rad} ${cy + rad / Math.tan(Math.PI / 3)} L ${cx} ${cy + rad / Math.cos (Math.PI / 6)} L ${cx - rad} ${cy + rad / Math.tan(Math.PI / 3)} L ${cx - rad} ${cy - rad / Math.tan(Math.PI / 3)} L ${cx} ${cy - rad / Math.cos (Math.PI / 6)} Z`
    return path
  }
  createGraph = () => {
    const node = this.node, radius = this.props.hexRadius, h = 1.5 * radius / Math.cos (Math.PI / 6);
    let colourScale = scaleThreshold()
      .domain(this.props.domain)
      .range(this.props.colorValue)
    let gMaster = select(node)
      .append('g')
      .attrs({
        'transform':d => `translate(0,${this.props.translateY})`
      })
    Delhi_TGM.forEach(d => {
      this.coordinatesObj[d["AC_NO"]] = {
        'x_coordinate':d['x_coordinate'],
        'y_coordinate':d['y_coordinate'],
      }
    })
    let g = gMaster
      .selectAll('.hexGroup')
      .data(this.props.data)
      .enter()
      .append('g')
      .attrs({
        'class': 'hexGroup',
        'transform': d => `translate(${(this.coordinatesObj[d.key]['x_coordinate'] + 1) * radius}, ${this.coordinatesObj[d.key]['y_coordinate'] * h})`
      })
    g.append('path')
      .attrs({
        'd':this.getHexPoints(0,0, radius),
        'class':d => `hexHighlight ac_no${d.key}`,
        'stroke':d => '#fff',
        'stroke-opacity':'1',
        'stroke-width':d => 1,
        'fill': d => colourScale(d[this.props.color]),
      })
      .on('mouseenter',(d) => {
        this.hover(d['contituency'],d[this.props.color])
      })
      .on('mousemove',this.mouseMove)
      .on('mouseleave',this.mouseOut)
    
    if(this.props.hightlight){
      select(node)
        .append('line')
        .attrs({
          'x1':(this.coordinatesObj[this.props.hightlight]['x_coordinate'] + 1) * radius,
          'y1':45,
          'x2':(this.coordinatesObj[this.props.hightlight]['x_coordinate'] + 1) * radius,
          'y2':(this.coordinatesObj[this.props.hightlight]['y_coordinate'] * h) + this.props.translateY ,
          'stroke':'#aaa',
          'stroke-width':2,
        })
      select(node)
        .append('circle')
        .attrs({
          'cx':(this.coordinatesObj[this.props.hightlight]['x_coordinate'] + 1) * radius,
          'cy':(this.coordinatesObj[this.props.hightlight]['y_coordinate'] * h) + this.props.translateY ,
          'fill':'#aaa',
          'r':5,
        })
      select(node)
        .append('text')
        .attrs({
          'x':(this.coordinatesObj[this.props.hightlight]['x_coordinate'] + 1) * radius - this.props.textOffset,
          'y':40,
          'font-family':'IBM Plex Sans',
          'fill':'#333',
          'font-size':12,
        })
        .text(this.props.note)
    }
    if(this.props.hightlight1){
      select(node)
        .append('line')
        .attrs({
          'x1':(this.coordinatesObj[this.props.hightlight1]['x_coordinate'] + 1) * radius,
          'y1':75,
          'x2':(this.coordinatesObj[this.props.hightlight1]['x_coordinate'] + 1) * radius,
          'y2':(this.coordinatesObj[this.props.hightlight1]['y_coordinate'] * h) + this.props.translateY ,
          'stroke':'#aaa',
          'stroke-width':2,
        })
      select(node)
        .append('circle')
        .attrs({
          'cx':(this.coordinatesObj[this.props.hightlight1]['x_coordinate'] + 1) * radius,
          'cy':(this.coordinatesObj[this.props.hightlight1]['y_coordinate'] * h) + this.props.translateY ,
          'fill':'#aaa',
          'r':5,
        })
      select(node)
        .append('text')
        .attrs({
          'x':(this.coordinatesObj[this.props.hightlight1]['x_coordinate'] + 1) * radius - this.props.textOffset1,
          'y':70,
          'font-family':'IBM Plex Sans',
          'fill':'#333',
          'font-size':12,
        })
        .text(this.props.note1)
    }
    let legendG = select(node)
      .append('g')
      .attrs({
        'transform':`translate(5,${this.props.height - 30})`
      })
    for(let i = 0; i < this.props.labels.length; i++){
      legendG.append('rect')
        .attrs({
          'x':this.props.legendPosX[i],
          'y':10,
          'height':10,
          'width':this.props.legendWidth[i],
          'fill':this.props.colorValue[i]
        })
      if(this.props.labels)
        legendG.append('text')
          .text(this.props.labels[i])
          .attrs({
            'x':this.props.labelPosX[i],
            'y':30,
            'font-family':'IBM Plex Sans',
            'font-size':10,
            'text-anchor':'middle',
          })
    }
  }
  

  componentDidMount() {
    this.createGraph();
  }
  render(){
    return (
      <div className='maps'>
        <svg width={this.props.width} height={this.props.height} ref={node => this.node = node} >
        </svg>
      </div>
    )
  }
}
export default ProjectCards