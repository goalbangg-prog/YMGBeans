import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import data from './db/beans';
import { initialFilters } from './db/categories';
import { addItem, toggleFavorite } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Detail from './components/Detail';
import Cart from './components/Cart';
import About from './components/About';

function App() {
  // 교안의 let [fruit] = useState(data)와 같은 데이터 흐름입니다.
  let [beans] = useState(data);
  let [filters, setFilters] = useState(initialFilters);
  let navigate = useNavigate();
  let location = useLocation();
  let dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);
  let favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    document.title = 'YMG BEANS | 세계의 특별한 생두';
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location]);

  function showCatalog(next = {}) {
    setFilters({ ...initialFilters, ...next });
    navigate('/#shop');
  }
  function openProduct(bean) { navigate('/detail/' + bean.id); }
  function addToCart(bean, count = 1) {
    dispatch(addItem({ id: bean.id, name: bean.name, imgurl: bean.image, count }));
    navigate('/cart');
  }
  function chooseCountry(country) { showCatalog({ country }); }
  function chooseCategory(category) { showCatalog({ category }); }
  function changeFavorite(id) { dispatch(toggleFavorite(id)); }

  return <>
    <Header products={beans} cartCount={cart.reduce((sum, item) => sum + item.count, 0)}
      favoriteCount={favorites.length} onCart={() => navigate('/cart')}
      onFavorites={() => showCatalog({ favorites: true })} onSearch={(query) => showCatalog({ query })}
      onShop={() => showCatalog()} onCategory={chooseCategory} onCountry={chooseCountry} activeCategory={filters.category} />
    <Routes>
      <Route path='/' element={<Home beans={beans} filters={filters} setFilters={setFilters}
        favorites={favorites} onFavorite={changeFavorite} onAdd={addToCart}
        onDetail={openProduct} onShop={() => showCatalog()} onCountry={chooseCountry}
        onExplore={(profile) => showCatalog({ profile })} />} />
      <Route path='/detail/:paramId' element={<Detail beans={beans} favorites={favorites}
        onFavorite={changeFavorite} onShop={() => showCatalog()} onCountry={chooseCountry} onCategory={chooseCategory}
        onAdd={addToCart} onDetail={openProduct} />} />
      <Route path='/cart' element={<Cart beans={beans} />} />
      <Route path='/about' element={<About onShop={() => showCatalog()} />} />
      <Route path='*' element={<main className='product-page container'><h1>없는 페이지입니다.</h1><button onClick={() => navigate('/')}>홈으로</button></main>} />
    </Routes>
    <Footer onShop={() => showCatalog()} onCategory={chooseCategory} isAbout={location.pathname === '/about'} />
  </>;
}
export default App;
