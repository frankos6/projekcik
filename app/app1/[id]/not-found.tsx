'use client';
// @flow
import * as React from 'react';
import Link from "next/link";

type Props = {

};
export const NotFound = (props: Props) => {
    return (
        <div>
            This trip was not found.<br />
            <Link href={'/app1'}>Go back</Link>
        </div>
    );
};

export default NotFound;