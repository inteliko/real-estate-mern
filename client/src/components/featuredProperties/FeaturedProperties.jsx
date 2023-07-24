import React, { useEffect, useState } from 'react';
import { request } from '../../Util/fetchAPI';
import { Link } from 'react-router-dom';
import { FaBed, FaSquareFull } from 'react-icons/fa';
import classes from './featuredProperties.module.css';
import person from '../assests/agent.png';
import img1 from '../assests/2bed.jpeg';

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request('/property/find/featured', 'GET');
        setFeaturedProperties(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching featured properties');
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(featuredProperties)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Properties You may Like</h5>
          <h2>Our Featured Properties</h2>
        </div>

        <div className={classes.featuredProperties}>
          
            {featuredProperties.map((property) => (
              <div key={property._id} className={classes.featuredProperty}>
                <Link to={`/PropertyDetail/${property._id}`} className={classes.imgContainer}>
                  <img src={img1} alt="" />
                </Link>
                <div className={classes.priceAndOwner}>
                  <span className={classes.price}>$ {property.price}</span>
                  <img src={person} alt="" className={classes.owner} />
                </div>
                <div className={classes.moreDetails}>
                  <span>
                    {property.beds} beds <FaBed className={classes.icon} />
                  </span>
                  <span>
                    {property.sqmeters} square meters <FaSquareFull className={classes.icon} />
                  </span>
                </div>
                <div className={classes.desc}>{property.desc}</div>
              </div>
            ))
            }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
