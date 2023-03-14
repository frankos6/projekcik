'use client';
// @flow
import * as React from 'react';
import Link from "next/link";

type Props = {

};
export const NotFound = (props: Props) => {
    return (
        <div className='container-fluid d-flex align-items-center flex-column'>
            <p className='h1'>This trip was not found.</p>
            <Link className='link-primary h4' href={'/app1'}>Go back</Link>
        </div>
    );
};

export default NotFound;