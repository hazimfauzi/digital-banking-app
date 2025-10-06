import React, { ComponentProps } from 'react';
import { Searchbar as SearchbarRNP } from 'react-native-paper';

type Props = ComponentProps<typeof SearchbarRNP>;

const MyComponent = ({ ...props }: Props) => {
    return (
        <SearchbarRNP
            {...props}
        />
    );
};

export default MyComponent;
