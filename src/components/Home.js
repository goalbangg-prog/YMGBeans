import { useState } from 'react';
import Hero from './Hero';
import BeanFinder from './BeanFinder';
import OriginSection from './OriginSection';
import Catalog from './Catalog';
import ProductSection from './ProductSection';
import YmgPick from './YmgPick';
import { origins } from '../db/origins';

function Home(props) {
  let [originIndex, setOriginIndex] = useState(0);
  let pick = props.beans.find((bean) => bean.isPick);
  return <main id='top'>
    <Hero origins={origins} originIndex={originIndex} onSelect={setOriginIndex}
      onCountry={props.onCountry} onShop={props.onShop} products={props.beans} />
    <BeanFinder products={props.beans} onExplore={props.onExplore} onDetail={props.onDetail} onAdd={props.onAdd} />
    <OriginSection origins={origins} products={props.beans} onCountry={props.onCountry} />
    <Catalog products={props.beans} filters={props.filters} onFilters={props.setFilters}
      favorites={props.favorites} onFavorite={props.onFavorite} onAdd={props.onAdd} onDetail={props.onDetail} />
    <ProductSection type='new' products={props.beans} onShop={props.onShop}
      favorites={props.favorites} onFavorite={props.onFavorite} onAdd={props.onAdd} onDetail={props.onDetail} />
    {pick && <YmgPick product={pick} onDetail={props.onDetail} />}
    <ProductSection type='best' products={props.beans} onShop={props.onShop}
      favorites={props.favorites} onFavorite={props.onFavorite} onAdd={props.onAdd} onDetail={props.onDetail} />
  </main>;
}
export default Home;
