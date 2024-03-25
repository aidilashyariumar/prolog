import Pengguna from '../pages/pengguna';
import EditPengguna from '../pages/pengguna/editPengguna';
import TambahPengguna from '../pages/pengguna/tambahPengguna';

import { Route} from 'react-router-dom';

    const penggunaRoute = [
        <>
        <Route path="/pengguna" element={<Pengguna />} />
        <Route path="/pengguna/add-pengguna" element={<TambahPengguna />} />
        <Route path="/pengguna/adit-pengguna/:id" element={<EditPengguna />} />
        </>
    ];

export default penggunaRoute;
