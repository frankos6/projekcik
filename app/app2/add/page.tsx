'use client';
// @flow
import * as React from 'react';
import Link from "next/link";

type Props = {

};
const Page = (props: Props) => {
    return (
        <form>
            <Link href='/app2' className='btn btn-primary'>Go back</Link>
            <input className='form-control' type='text' placeholder='Description'/>
        </form>
    );
};

export default Page;