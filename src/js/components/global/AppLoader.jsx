import React from 'react';
import { Spinner } from 'reactstrap';

export default function AppLoader() {
    return (
        <div className='app-loader'>
            <Spinner color="secondary" />
        </div>
    )
}
