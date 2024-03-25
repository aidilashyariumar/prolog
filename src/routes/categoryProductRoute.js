
import { Route} from 'react-router-dom';
import TambahCategoryProduk from '../pages/categoryProduct/tambahCategoryProduct';
import CategoryProduct from '../pages/categoryProduct';
import EditCategoryProduk from '../pages/categoryProduct/editCategoryProduct';

    const categoryProductRoute = [
        <>
        <Route path="/category-product" element={<CategoryProduct />} />
        <Route path="/category-product/add-category-product" element={<TambahCategoryProduk/>} />
        <Route path="/category-product/edit-category-product/:id" element={<EditCategoryProduk/>} />
        </>
    ];

export default categoryProductRoute;
