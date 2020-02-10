import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
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
    let svg  = select(node)

    let xScale = scaleLinear()
      .domain([0,100])
      .range([0,this.props.width])

    let g = svg.selectAll('.partyUnits')
      .data(this.props.data)
      .enter()
      .append('g')
      .attrs({
        'class':'partyUnits',
        'transform':(d,i) => `translate(0,${i * 57 + 30})`
      })
    
    g.append('text')
      .attrs({
        'x':0,
        'y':15,
        'font-family':'IBM Plex Sans',
        'fill':'#333',
        'font-size':14,
        'font-weight':700,
      })
      .text(d => d.key)
    g.append('rect')
      .attrs({
        'x':0,
        'y':20,
        'width':d => xScale(d.value[0]['Percent']),
        'height':30,
        'fill':'#f5a067'
      })
    g.append('text')
      .attrs({
        'x':0,
        'y':20,
        'dx':5,
        'dy':20,
        'font-family':'IBM Plex Sans',
        'fill':'#fff',
        'font-size':14,
      })
      .text(d => `${d.value[0]['Percent']}%`)
    g.append('rect')
      .attrs({
        'x':d => xScale(d.value[0]['Percent']),
        'y':20,
        'width':d => xScale(d.value[1]['Percent']),
        'height':30,
        'fill':'#3cafa4'
      })
    g.append('text')
      .attrs({
        'x':d => xScale(d.value[0]['Percent']),
        'y':20,
        'dx':5,
        'dy':20,
        'font-family':'IBM Plex Sans',
        'fill':'#fff',
        'font-size':14,
      })
      .text(d => `${d.value[1]['Percent']}%`)
    g.append('rect')
      .attrs({
        'x':d => xScale(d.value[0]['Percent']) + xScale(d.value[1]['Percent']) ,
        'y':20,
        'width':d => xScale(d.value[2]['Percent']),
        'height':30,
        'fill':'#914df3'
      })
    g.append('text')
      .attrs({
        'x':d => xScale(d.value[0]['Percent']) + xScale(d.value[1]['Percent']) ,
        'y':20,
        'dx':5,
        'dy':20,
        'font-family':'IBM Plex Sans',
        'fill':'#fff',
        'font-size':14,
      })
      .text(d => `${d.value[2]['Percent']}%`)
    svg.append('rect')
      .attrs({
        'x':0,
        'y':0,
        'width':12,
        'height':12,
        'fill':'#f5a067'
      })
    svg.append('text')
      .attrs({
        'x':0,
        'y':12,
        'dx':17,
        'dy':-2,
        'font-family':'IBM Plex Sans',
        'fill':'#333',
        'font-size':12,
      })
      .text(d => `Class 10 and below`)
    svg.append('rect')
      .attrs({
        'x':this.props.width / 3,
        'y':0,
        'width':12,
        'height':12,
        'fill':'#3cafa4'
      })
    svg.append('text')
      .attrs({
        'x':this.props.width / 3,
        'y':12,
        'dx':17,
        'dy':-2,
        'font-family':'IBM Plex Sans',
        'fill':'#333',
        'font-size':12,
      })
      .text(`Class 12 to Diploma`)
    svg.append('rect')
      .attrs({
        'x':2 * this.props.width / 3,
        'y':0,
        'width':12,
        'height':12,
        'fill':'#914df3'
      })
    svg.append('text')
      .attrs({
        'x':2 * this.props.width / 3,
        'y':12,
        'dx':17,
        'dy':-2,
        'font-family':'IBM Plex Sans',
        'fill':'#333',
        'font-size':12,
      })
      .text(`Graduation and above`)
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