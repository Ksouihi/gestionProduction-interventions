import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import { useEffect, useState } from 'react';
import {Line} from '../../models/Product'
import axios from 'axios';

const ECommerce = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (event) => {
    const selectedItemId = event.target.value;
    const selectedObject = lines.find(item => item.name_line === selectedItemId);
    setSelectedItem(selectedObject);
  };

  const [lines, setLines] = useState<Line[]>([]);
  useEffect(()=>{
    axios.get('http://localhost:8080/api/lines').then((res)=> {
        setLines(res.data.lines);
        setSelectedItem(res.data.lines[0]);
    })
},[])

const [stats, setStats] = useState(null);

useEffect(() => {
  if(selectedItem && selectedItem.name_line) {
    axios.get(`http://localhost:8080/api/stats/${selectedItem?.name_line}`).then((res)=> {
      setStats(res.data)
    })
  }
  
}, [selectedItem]);

  return (
    <>
   <div>
      <label>Select Line:</label>
      <select onChange={handleChange} value={selectedItem ? selectedItem.name_line : ''}>
        <option value="">None</option>
        {lines.map((item) => (
          <option key={item.id} value={item.name_line}>
            {item.name_line}
          </option>
        ))}
      </select>
      <p>Selected Item: {selectedItem ? selectedItem.name_line : 'None'}</p>
    </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        <CardOne />
        <CardTwo />
        <CardThree visions={stats?.visions}/>
        <CardFour counts={stats?.counts} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne /> 
        {stats && <ChartThree results={stats?.results}/>}
        
      </div>
    </>
  );
};

export default ECommerce;
