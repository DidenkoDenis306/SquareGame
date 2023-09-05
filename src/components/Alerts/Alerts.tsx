import { FC } from 'react';
import { Box, Collapse } from '@mui/material';
import Alert from '@mui/material/Alert';
import { AlertType } from '../../types/AlertType';

interface Props {
  alert: AlertType | null;
}

export const Alerts: FC<Props> = ({ alert }) => {
  return (
    <Box sx={{ width: '300px', position: 'absolute', right: '15px' }}>
      <Collapse in={Boolean(alert)}>
        <Alert severity="info" sx={{ mb: 2 }}>
          {alert}
        </Alert>
      </Collapse>
    </Box>
  );
};
