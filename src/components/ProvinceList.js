import React, { useState, useEffect }  from 'react';
import { H3 } from '@awesomecomponents/mux/core/typography';
import Card, { CardContent, CardHeader, CardSeparator, CardImage, CardAction, FONT_SIZE, HEADER_LEVEL, } from '@awesomecomponents/mux/core/components/Card';


const ProvinceList = () => {
  const [provinces, setProvinces] = useState([]);
  const API_URL = window.__ENV__.API_URL;

  const fetchProvinces = () => {
    fetch(
      `${API_URL}/api/v1/provinces-territories`
    )
      .then((response) => response.json())
      .then((result) => setProvinces(result));
  };

  // only runs once on component mount
  useEffect(() => {
    fetchProvinces();
  }, []);


  return (
    <>
      {provinces.map(province => 
        // <H3>
        //   {province.name}
        // </H3>
        
        <Card customStyle={{
          cardStyle: {
            margin: '20px'
          }
        }}>
          <CardHeader withAdornment fontSize={FONT_SIZE.LARGE}>{province.name}</CardHeader>
          <CardContent>
            <p>
              {`Postal Abbrevation: ${province.postal_abbrevation}`}
            </p>
            <p>
              {`Capital: ${province.capital}`}
            </p>
            <p>
              {`Population: ${province.population}`}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );

}

export default ProvinceList;
