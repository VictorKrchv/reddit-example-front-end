import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { MainTemplate } from '@ui';
import React from 'react';
import styled from 'styled-components';
import { AccountSettingsTab } from './tabs';

export const SettingsPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainTemplate title="User settings">
      <Tabs
        sx={{ mt: 2 }}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Account settings" {...a11yProps(0)} />
        <Tab label="Profile settings" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AccountSettingsTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Profile settings soon
      </TabPanel>
    </MainTemplate>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: 5 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SettingsPageWrap = styled.div``;
