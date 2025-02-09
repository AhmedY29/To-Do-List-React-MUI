import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Stack } from '@mui/material';

export default function Toast({open, message}) {

  return (
    <div>
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
      >
        <Alert variant="filled" severity="success">
            {message}
        </Alert>
      </Snackbar>
    </Stack>
    </div>
  );
}
