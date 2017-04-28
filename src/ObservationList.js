import React from 'react';
import './ObservationList.css';
import Observation from './Observation.js';

function ObservationList(props) {
  const { photos } = props;
  const activeClass = props.isFetching ? 'active' : '';
  return (
    <div className='ObservationList'>
      <div className={`loading-screen ${activeClass}`}>
        <p>Loading...</p>
      </div>
      {
        photos.map((el) => {
          return (
            <Observation
              key={el.id}
              id={el.id}
              img={el.img_src}
              sol={el.sol}
              rover={el.rover.name}
              camera={el.camera.name}
              earthDate={el.earth_date}
            />
          )
        })
      }
    </div>
  )
}

export default ObservationList;
