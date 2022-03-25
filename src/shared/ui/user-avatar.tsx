import Avatar, { AvatarProps, AvatarTypeMap } from '@mui/material/Avatar';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import * as React from 'react';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return { color: stringToColor(name), children: `${name.split(' ')[0][0]}` };
}

type Props = {
  username: string;
} & AvatarProps;

export function UserAvatar(props: Props) {
  const { color, children } = React.useMemo(
    () => stringAvatar(props.username),
    [props.username],
  );

  const sx = props.sx || {};

  return (
    <Avatar {...props} sx={{ ...sx, background: color }} children={children} />
  );
}
