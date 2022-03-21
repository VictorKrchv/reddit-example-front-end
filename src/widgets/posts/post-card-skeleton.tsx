import { Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import * as React from 'react';

export const PostCardSkeleton = () => (
  <Card sx={{ maxWidth: 1000 }}>
    <CardHeader
      avatar={
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      }
      title={
        <Skeleton
          animation="wave"
          height={10}
          width="80%"
          style={{ marginBottom: 6 }}
        />
      }
      subheader={<Skeleton animation="wave" height={10} width="40%" />}
    />

    <CardContent>
      <React.Fragment>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton
          animation="wave"
          height={10}
          width="90%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          width="95%"
          height={10}
          style={{ marginBottom: 6 }}
        />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </React.Fragment>
    </CardContent>
  </Card>
);
