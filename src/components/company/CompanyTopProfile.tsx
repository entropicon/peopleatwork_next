import {
  Avatar,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { JSX, memo } from 'react';

import CompanyTopInfo from './CompanyTopInfo';
import { useLocale } from 'next-intl';

const CompanyTopProfile = ({
  name,
  avatar,
  website,
  buttonGroup,
  founded,
  employee_count,
  contact,
  industry,
}: {
  name?: string;
  avatar?: string;
  website?: string;
  buttonGroup?: JSX.Element;
  founded?: Date;
  employee_count?: string;
  contact?: {
    address?: string;
    location?: string;
  };
  industry?: {
    name_az?: string;
    name_en?: string;
    name_ru?: string;
  };
}) => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const lang = useLocale()
  return (
    <Stack
      spacing={2}
      direction={md ? 'row' : 'column'}
      justifyContent="space-between"
    >
      <Stack
        direction="row"
        sx={{
          width: md ? 150 : '100%',
          height: md ? 150 : 'auto',
        }}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Avatar
          alt={name}
          src={avatar}
          sx={{ width: md ? 150 : 60, height: md ? 150 : 60 }}
        >
          {name}
        </Avatar>
        {!md && buttonGroup}
      </Stack>
      <Stack
        spacing={1}
        sx={{
          width: 'calc(100% - 190px)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2">{name}</Typography>
          {md && buttonGroup}
        </Box>
        {website && (
          <Box
            component="a"
            href={website ? website : '#'}
            sx={{
              color: 'var(--primary-color)',
              textDecoration: 'none',
            }}
          >
            {website}
          </Box>
        )}
        <CompanyTopInfo
          company={{
            founded,
            employee_count,
            contact,
            industry,
          }}
          lang={lang}
        />
      </Stack>
    </Stack>
  );
};

export default memo(CompanyTopProfile);
