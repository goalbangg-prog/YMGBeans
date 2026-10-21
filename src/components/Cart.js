import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCount, decreaseCount, deleteItem, sortName, clearCart } from '../store';
import { won } from './Products';

function Cart(props) {
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  // 가격과 상품명은 항상 최신 JSON에서 조회합니다.
  let items = cart.map((item) => {
    let bean = props.beans.find((bean) => bean.id === item.id);
    return bean ? { ...bean, count: item.count } : null;
  }).filter(Boolean);
  let total = items.reduce((sum, item) => sum + (item.price || 0) * item.count, 0);
  let unknown = items.filter((item) => item.price === null).length;
  return <main className='product-page'><section className='container section-pad'>
    <p className='eyebrow'>YOUR GREEN COFFEE COLLECTION</p><h1>장바구니</h1>
    <div className='cart-top'><p>생두 {items.length}종</p>
      <button onClick={() => dispatch(sortName())}>이름순 정렬</button>
      <button onClick={() => dispatch(clearCart())}>전체 비우기</button></div>
    {items.length ? <>
      <div className='cart-items'>{items.map((item) => <article className='cart-item' key={item.id}>
        <img src={item.image} alt={item.name} width='104' height='104' />
        <div className='cart-item-info'><span className='country'>{item.country}</span>
          <h3><Link to={'/detail/' + item.id}>{item.name}</Link></h3><p>{won(item.price)}</p>
          <div className='quantity-control'>
            <button aria-label={item.name + ' 수량 줄이기'} disabled={item.count <= 1} onClick={() => dispatch(decreaseCount(item.id))}>−</button>
            <output>{item.count}</output>
            <button aria-label={item.name + ' 수량 늘리기'} disabled={item.count >= 99} onClick={() => dispatch(addCount(item.id))}>+</button>
          </div></div>
        <div className='cart-item-end'><button onClick={() => dispatch(deleteItem(item.id))}>삭제</button>
          <strong>{won(item.price === null ? null : item.price * item.count)}</strong></div>
      </article>)}</div>
      <div className='cart-total'><span>참고가격 합계</span><strong>{won(total)}</strong></div>
      {unknown > 0 && <p>가격 미확인 {unknown}종은 합계에서 제외됩니다.</p>}
      <p>배송비 제외 · 참고가격이며 실제 주문·결제는 진행되지 않습니다.</p>
    </> : <div className='empty-state'><h2>장바구니가 비어 있어요.</h2></div>}
    <Link className='btn btn-solid' to='/#shop'>생두 둘러보기</Link>
  </section></main>;
}
export default Cart;
