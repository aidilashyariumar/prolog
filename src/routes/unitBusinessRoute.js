
import { Route} from 'react-router-dom';
import UnitBusiness from '../pages/unitBusiness';
import TambahUnitBusiness from '../pages/unitBusiness/addUnitBusiness';
import EditUnitBusiness from '../pages/unitBusiness/editUnitBusiness';


    const unitBusinessRoute = [
        <>
        <Route path="/unit-business" element={<UnitBusiness />} />
        <Route path="/unit-business/add-unit-business" element={<TambahUnitBusiness/>} />
        <Route path="/unit-business/edit-unit-business/:id" element={<EditUnitBusiness/>} />
        </>
    ];

export default unitBusinessRoute;
