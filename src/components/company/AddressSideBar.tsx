'use client';

import { Box, Typography, Grid, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';

const AddressSideBar = ({
  location,
}: {
  location: {
    address: string;
    location: string;
  };
}) => {
  const t = useTranslations()
  const formattedAddress = useMemo(() => {
    let loc = '';
    if (location.address) {
      loc += location.address ?? '';
    }
    if (location.location) {
      loc += ', ' + (location.location ?? '');
    }
    return loc;
  }, [location]);

  if (!location) return null;
  return (
    <Grid
      size={{
        xs: 12,
        md: 4,
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h3">{t('common.address')}</Typography>
        <Box component="address">{formattedAddress}</Box>
      </Stack>
    </Grid>
  );
};

export default memo(AddressSideBar);
