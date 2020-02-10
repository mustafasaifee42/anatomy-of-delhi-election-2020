import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as d3GeoProjection from 'd3-geo-projection';
import { select, selectAll } from 'd3-selection';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import MapData from './MapData.json'
import Delhi_TGM from './DelhiTGM_1.json'
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

  getHexPoints = (cx,cy, rad) => {
    let path = `M${cx + rad} ${cy - rad / Math.tan(Math.PI / 3)} L ${cx + rad} ${cy + rad / Math.tan(Math.PI / 3)} L ${cx} ${cy + rad / Math.cos (Math.PI / 6)} L ${cx - rad} ${cy + rad / Math.tan(Math.PI / 3)} L ${cx - rad} ${cy - rad / Math.tan(Math.PI / 3)} L ${cx} ${cy - rad / Math.cos (Math.PI / 6)} Z`
    return path
  }
  createGraph = () => {
    const node = this.node 
    const radius = 40;
    const h = 1.5 * radius / Math.cos (Math.PI / 6)
    let g = select(node)
      .selectAll('.hexGroup')
      .data(Delhi_TGM)
      .enter()
      .append('g')
      .attrs({
        'class': 'hexGroup',
        'transform': d => `translate(${(d['x_coordinate'] + 1) * radius}, ${d['y_coordinate'] * h})`
      })
    g.append('path')
      .attrs({
        'd':this.getHexPoints(0,0, radius),
        'class':'hexHighlight',
        'stroke':'#000',
        'stroke-opacity':'1',
        'stroke-width':'2',
        'fill': "none"
      })
    g.append('text')
      .attrs({
        'x':0,
        'y':0,
        'dy':5,
        'class':'hexText',
        'fill': '#000',
        'font-size':10,
        'text-anchor':'middle',
      })
      .text(d => d.constituency)
  }
  

  componentDidMount() {
    this.createGraph();
  }
  render(){
    return (
      <div className='donut'>
        <svg width={window.innerWidth + 100} height={window.innerHeight + 200} ref={node => this.node = node} >
        </svg>
      </div>
    )
  }
}
export default ProjectCards