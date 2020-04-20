import React from 'react';
import { RadialChart, Hint } from 'react-vis';

function Chart(props) {
    return (
        <RadialChart
        className={'donut-chart-example'}
        innerRadius={100}
        radius={140}
        getAngle={d => d.theta}
        data={[
          {theta: props.variable, label:'Renda Variavel'},
          {theta: props.fix},
        ]}
        onValueMouseOver={props.mouseOver}
        onSeriesMouseOut={props.mouseOut}
        width={300}
        height={300}
        padAngle={0.04}
      >
        {props.valor !== false && <Hint value={props.valor} />}
      </RadialChart>
    );
}

export default Chart;