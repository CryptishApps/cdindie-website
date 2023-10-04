import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarProps } from '@radix-ui/react-avatar';
import React from 'react';

const UserAvatar = (props: AvatarProps) => {
    return (
        <Avatar>
            <AvatarImage {...props} />
            <AvatarFallback>CD</AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;