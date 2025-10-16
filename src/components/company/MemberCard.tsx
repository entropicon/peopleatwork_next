import { MemberCardProps } from '@/types/types';
import { Facebook, Instagram, LinkedIn, X } from '@mui/icons-material';
import {
  Avatar,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';


const SOCIAL_PLATFORMS = {
  instagram: Instagram,
  linkedin: LinkedIn,
  twitter: X,
  facebook: Facebook,
} as const;

type SocialPlatform = keyof typeof SOCIAL_PLATFORMS;

const MemberCard = ({ member }: { member: MemberCardProps }) => {
  const socialButtons = useMemo(() => {
    return Object.entries(SOCIAL_PLATFORMS)
      .map(([platform, IconComponent]) => {
        const platformKey = platform as SocialPlatform;
        const socialLink = member?.member?.[platformKey];

        if (!socialLink) return null;
        return (
          <IconButton
            key={platform}
            component="a"
            href={socialLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <IconComponent
              sx={{
                fill: 'var(--neutral-dark)',
                fontSize: 18,
              }}
            />
          </IconButton>
        );
      })
      .filter(Boolean);
  }, [member?.member]);

  const { id, full_name, profile_picture } = member?.member || {};
  const { position } = member || {};
  const router = useRouter();

  return (
    <Grid size={{ xs: 6, md: 3 }}>
      <Card
        sx={{
          boxShadow: 1,
          border: '1px solid var(--border-color)',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 1,
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            boxShadow: 2,
          },
        }}
        onClick={() => {
          router.push(`/jobseeker/profile/${id}`);
        }}
      >
        <Avatar
          src={profile_picture}
          alt={full_name}
          sx={{
            width: 80,
            height: 80,
          }}
        />

        <Typography
          variant="h5"
          className="one-line-text"
          sx={{
            textAlign: 'center',
          }}
        >
          {full_name}
        </Typography>

        <Typography
          variant="body1"
          className="text-neutral-dark one-line-text"
          textAlign="center"
        >
          {position}
        </Typography>

        {socialButtons.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            onClick={(e) => e.stopPropagation()}
          >
            {socialButtons}
          </Stack>
        )}
      </Card>
    </Grid>
  );
};

export default React.memo(MemberCard);
