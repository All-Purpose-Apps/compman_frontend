import { app } from 'src/firebase';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'src/store/userSlice';

export default function Header() {

    const auth = getAuth(app);
    const dispatch = useDispatch();

    // ... (rest of your reducer)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const serializedUser = user ? {
                email: user.email,
                uid: user.uid,
            } : null;
            dispatch(setUser(serializedUser));
        });

        return () => unsubscribe();
    }, []);


    const user = useSelector((state) => state.user.user);

    return (
        <div className='header'>
            <h1>CompMan</h1>
            <h2>{user?.email}</h2>
        </div>
    )
}
