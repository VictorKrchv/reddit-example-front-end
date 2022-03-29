import { useDisclosure, useOnClickOutside } from '@lib/hooks';
import { EmojiEmotions } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Picker } from 'emoji-mart';
import { useRef } from 'react';

interface Props {
  onSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ onSelect }: Props) => {
  const ref = useRef(null);
  const { isOpen, toggle, close } = useDisclosure();

  useOnClickOutside({ ref, handler: close, disabled: !isOpen });

  const handleSelect = (data: any) => {
    onSelect(data.native);
  };

  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      <IconButton onClick={toggle}>
        <EmojiEmotions />
      </IconButton>
      {isOpen && (
        <Picker
          onSelect={handleSelect}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: '1000',
          }}
        />
      )}
    </Box>
  );
};
