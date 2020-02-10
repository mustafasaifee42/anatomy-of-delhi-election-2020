import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleBand } from 'd3-scale';
import AgeData  from './groupedByAge.json'
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
  createGraph = () => {
    const node = this.node
    let domain = [], label = [], y = [10,20,30]
    let svg = select(node)
    for (let i = 25; i <= 80; i ++ ){
      domain.push(i.toString())
      if(i % 5 === 0)
        label.push(i.toString())
    }
    svg.selectAll('.yAxisText')
      .data(y)
      .enter()
      .append('text')
      .attrs({
        'x':d => this.props.width - 5,
        'y':d => (this.props.height - 30) - d * 8 + 3.5 + 4,
        'fill':'#ccc',
        'font-family':'IBM Plex Sans',
        'font-size':12,
        'text-anchor':'end'
      })
      .text(d => d)
    svg.selectAll('.yAxisLine')
      .data(y)
      .enter()
      .append('line')
      .attrs({
        'x1':d => this.props.width,
        'y1':d => (this.props.height - 30) - d * 8 + 3.5 + 8,
        'x2':d => 0,
        'y2':d => (this.props.height - 30) - d * 8 + 3.5 + 8,
        'stroke':'#ccc',
        "stroke-dasharray": "10 5",
        'fill':'none'
      })
		let scaleX = scaleBand()
      .domain(domain)
      .range([0, this.props.width])
      .paddingInner([0.1])
      .paddingOuter([0.1])
      .align([0.5]);

    svg.selectAll('.ageRect')
      .data(AgeData)
      .enter()
      .append('rect')
      .attrs({
        'x':d => scaleX(d.age.toString()),
        'y':d => (this.props.height - 30) - d.yPos * 8,
        'width':scaleX.bandwidth(),
        'height':7,
        'rx':3,
        'ry':3,
        'fill':(d,i) =>  this.props.colorObj[d.AgeColor],
      })
    svg.selectAll('.ageText')
      .data(label)
      .enter()
      .append('text')
      .attrs({
        'x':d => scaleX(d) + scaleX.bandwidth() / 2,
        'y':d => this.props.height - 10,
        'fill':'#aaa',
        'font-family':'IBM Plex Sans',
        'font-size':12,
        'text-anchor':'middle'
      })
      .text(d => d)
    for(let i = 0; i < Object.keys(this.props.colorObj).length; i++){
      svg.append('rect')
        .attrs({
          'x':20,
          'y':20 + i * 20,
          'fill':this.props.colorObj[Object.keys(this.props.colorObj)[i]],
          'width':12,
          'height':12,
        })
      svg.append('text')
        .attrs({
          'x':35,
          'y':20 + i * 20 + 10,
          'fill':this.props.colorObj[Object.keys(this.props.colorObj)[i]],
          'font-family':'IBM Plex Sans',
          'font-size':12
        })
        .text(Object.keys(this.props.colorObj)[i])
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