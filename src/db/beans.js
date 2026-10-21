// 상품을 추가·수정할 때는 이 데이터 파일만 관리합니다.
// 화면 컴포넌트는 아래 배열을 props로 받아 map()으로 출력합니다.
import data from "./products.json";

// JSON의 상대 이미지 경로를 사이트 기준 경로로 바꿉니다.
let base = process.env.PUBLIC_URL === '.' ? '' : process.env.PUBLIC_URL;
let beans = data.map((bean) => ({ ...bean, image: base + '/' + bean.image.replace(/^\.\//, '') }));

export default beans;
