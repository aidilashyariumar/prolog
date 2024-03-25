
import { Route} from 'react-router-dom';
import UnitBusiness from '../pages/unitBusiness';
import TambahUnitBusiness from '../pages/unitBusiness/addUnitBusiness';


    const unitBusinessRoute = [
        <>
        <Route path="/unit-business" element={<UnitBusiness />} />
        <Route path="/unit-business/add-unit-business" element={<TambahUnitBusiness/>} />
        {/* <Route path="/product/edit-product" element={<TambahProduk/>} /> */}
        </>
    ];

export default unitBusinessRoute;
