import { Container, Typography } from '@mui/material';

interface Props {
  title?: React.ReactNode;
}

export const MainTemplate: React.FC<Props> = ({ children, title }) => {
  return (
    <Container sx={{ py: 2 }}>
      {title && (
        <Typography sx={{ my: 2 }} variant="h6" component="h6">
          {title}
        </Typography>
      )}
      {children}
    </Container>
  );
};
