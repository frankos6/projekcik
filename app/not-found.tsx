// @flow
import * as React from 'react';
import {useRouter} from "next/navigation";

type Props = {

};
export default function NotFound(props: Props) {
    const router = useRouter();
    router.push('/')
    return (
        <div>
            404 :)
        </div>
    );
};