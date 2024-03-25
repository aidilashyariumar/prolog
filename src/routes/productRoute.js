
import { Route} from 'react-router-dom';
import Product from '../pages/product';
import TambahProduct from '../pages/product/tambahProduct';


    const productRoute = [
        <>
        <Route path="/product" element={<Product />} />
        <Route path="/product/add-product" element={<TambahProduct/>} />
        {/* <Route path="/product/edit-product" element={<TambahProduk/>} /> */}
        </>
    ];

export default productRoute;
