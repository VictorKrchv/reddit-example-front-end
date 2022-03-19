import { Box, Grid, Typography, Divider } from '@mui/material';

interface SectionWrapProps {
  title: string;
}

export const SectionWrap: React.FC<SectionWrapProps> = ({
  children,
  title,
}) => {
  return (
    <Box>
      <Typography variant="caption" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Grid container direction="column" spacing={3} sx={{ py: 3, px: 1 }}>
        {children}
      </Grid>
    </Box>
  );
};

interface SectionItemProps extends SectionDescriptionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

export const SectionItem: React.FC<SectionItemProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <Grid item>
      <Grid justifyContent="space-between" alignItems="center" container>
        <Grid item>
          <SectionDescription title={title} subtitle={subtitle} />
        </Grid>
        <Grid>{children}</Grid>
      </Grid>
    </Grid>
  );
};

interface SectionDescriptionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

export const SectionDescription: React.FC<SectionDescriptionProps> = ({
  title,
  subtitle,
}) => {
  return (
    <Box>
      <Typography variant="body1" sx={{ fontWeight: '500' }}>
        {title}
      </Typography>
      <Typography variant="caption">{subtitle}</Typography>
    </Box>
  );
};
