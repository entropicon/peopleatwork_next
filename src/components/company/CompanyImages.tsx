import { AddOutlined, CloseOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

export const CompanyImages = memo(
  ({
    images,
    companyName,
    addImage,
    handleClick,
    showSection,
    handleImageDelete,
  }: {
    images: { id: string; image: string }[];
    companyName: string;
    addImage?: boolean;
    handleClick?: (value: boolean) => void;
    showSection?: boolean;
    handleImageDelete?: (id: string) => void;
  }) => {
    const t = useTranslations()

    if (images?.length === 0) {
      if (!showSection) return null;
    }

    return (
      <Stack spacing={1}>
        <Stack spacing={1}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Typography variant="h3">
              {t('common.workingAt')} {companyName}
            </Typography>
            {addImage && (
              <IconButton
                className="edit-button"
                onClick={() => handleClick && handleClick(true)}
              >
                <AddOutlined />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Grid container spacing={1} sx={{ pt: 2 }}>
          {images?.length ? (
            <>
              <Grid
                size={{
                  xs: images.length > 1 ? 8 : 12,
                }}
                sx={{
                  height: '600px',
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src={images[0]?.image}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  loading="lazy"
                />
                {addImage && (
                  <IconButton
                    className="remove-button"
                    onClick={() =>
                      handleImageDelete && handleImageDelete(images[0]?.id)
                    }
                  >
                    <CloseOutlined />
                  </IconButton>
                )}
              </Grid>
              {images.length > 1 && (
                <Grid size={{ xs: 4 }} spacing={1} container>
                  {images.slice(1).map((image, index) => (
                    <Grid
                      size={{ xs: 12 }}
                      key={index}
                      sx={{ position: 'relative' }}
                    >
                      <Box
                        component="img"
                        src={image.image}
                        alt=""
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        loading="lazy"
                      />
                      {addImage && (
                        <IconButton
                          className="remove-button"
                          onClick={() =>
                            handleImageDelete && handleImageDelete(image?.id)
                          }
                        >
                          <CloseOutlined />
                        </IconButton>
                      )}
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          ) : (
            <Typography variant="body1">{t('messages.not_found')}</Typography>
          )}
        </Grid>
      </Stack>
    );
  },
);

CompanyImages.displayName = 'CompanyImages';