import { MemberCardProps } from '@/types/types';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import MemberCard from './MemberCard';
import { useTranslations } from 'next-intl';

interface CompanyTeamProps {
  team: MemberCardProps[];
}

const CompanyTeam: React.FC<CompanyTeamProps> = ({ team = [] }) => {
  const t= useTranslations();
  const [showAll, setShowAll] = useState<boolean>(false);

  const visibleMembers = useMemo(
    () => team.slice(0, showAll ? team.length : 3),
    [team, showAll],
  );

  const toggleShowAll = useCallback(() => {
    setShowAll((prevState) => !prevState);
  }, []);

  const buttonIcon = useMemo(
    () => (showAll ? <ArrowUpward /> : <ArrowDownward />),
    [showAll],
  );

  if (!team?.length) {
    return null;
  }

  if (team.length === 0) return null;

  return (
    <Stack spacing={2}>
      <Typography variant="h3">{t('common.team')}</Typography>
      <Grid container spacing={2}>
        {visibleMembers.map((member) => (
          <MemberCard member={member} key={member.id} />
        ))}
      </Grid>

      {team.length > 3 && (
        <Button
          variant="text"
          onClick={toggleShowAll}
          endIcon={buttonIcon}
          sx={{
            px: 2,
            py: 1,
            borderColor: 'var(--border-color)',
            '& svg': {
              fill: 'var(--primary-color)',
            },
            '& span': {
              mr: 1,
            },
          }}
        >
          {showAll ? t('common.showLess') : t('common.showAll')}
        </Button>
      )}
    </Stack>
  );
};

export default React.memo(CompanyTeam);
