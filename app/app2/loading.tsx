// @flow
import * as React from 'react';

type Props = {

};
const Loading = (props: Props) => {
    return (<div className='container-fluid w-100 d-flex flex-column align-items-center justify-content-center h-100'>
        <div className='spinner-border mt-5' style={{height: '6rem', width: '6rem', borderWidth: '.4rem'}} role='status'>
        </div>
        <p className='h2 mt-4'>Loading...</p>
    </div>);
};

export default Loading;