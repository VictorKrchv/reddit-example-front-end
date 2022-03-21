import { useUser } from '@entities/session';
import { ChangePasswordModal } from '@features/change-password';
import { MIN_PASSWORD_LENGTH } from '@lib/constants';
import { useDisclosure } from '@lib/hooks';
import { Button } from '@mui/material';
import { SectionItem, SectionWrap } from '@ui';

export const AccountSettingsTab = () => {
  const user = useUser();

  return (
    <SectionWrap title="ACCOUNT PREFERENCES">
      <SectionItem title="Email address" subtitle={user?.email}>
        <Button variant="outlined">Change</Button>
      </SectionItem>
      <SectionItem
        title="Change password"
        subtitle={`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`}
      >
        <OpenChangePasswordModalButton />
      </SectionItem>
      <SectionItem title="Country" subtitle="This is your primary location">
        <Button variant="outlined">Change</Button>
      </SectionItem>
    </SectionWrap>
  );
};

const OpenChangePasswordModalButton = () => {
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <ChangePasswordModal open={isOpen} onClose={close} />
      <Button variant="outlined" onClick={open}>
        Change
      </Button>
    </>
  );
};
