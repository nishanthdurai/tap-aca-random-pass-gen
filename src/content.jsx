import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import { generateRandomPassword } from './utils/generals.js';
import { ContentCopy, CheckCircle } from '@mui/icons-material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Content(props) {
  const [password, setPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [passwordOptions, setPasswordOptions] = useState({
    includeNumbers: true,
    includeSymbols: true,
    includeAlphabets: true,
  });
  const [checkErr, setCheckErr] = useState(false);

  const generatePassword = () => {
    if (
      !passwordOptions.includeAlphabets &&
      !passwordOptions.includeNumbers &&
      !passwordOptions.includeSymbols
    ) {
      setCheckErr(true);
      return;
    }
    const password = generateRandomPassword(10, passwordOptions);
    setPassword(password);
  };

  const handleCopyPassword = () => {
    if (passwordCopied) {
      return;
    }
    navigator.clipboard.writeText(password).then(
      () => {
        setPasswordCopied(true);
        // after the password copied reset the icon state
        setTimeout(() => {
          setPasswordCopied(false);
        }, 5000);
      },
      () => {
        setPasswordCopied(false);
      }
    );
  };

  const options = [
    {
      title: 'Include numbers',
      action: () => {
        setCheckErr(false);
        setPasswordOptions((prev) => {
          return {
            ...prev,
            includeNumbers: !prev.includeNumbers,
          };
        });
      },
      checked: passwordOptions.includeNumbers,
    },
    {
      title: 'Include Alphabets',
      action: () => {
        setCheckErr(false);
        setPasswordOptions((prev) => {
          return {
            ...prev,
            includeAlphabets: !prev.includeAlphabets,
          };
        });
      },
      checked: passwordOptions.includeAlphabets,
    },
    {
      title: 'Include Symbols',
      action: () => {
        setCheckErr(false);
        setPasswordOptions((prev) => {
          return {
            ...prev,
            includeSymbols: !prev.includeSymbols,
          };
        });
      },
      checked: passwordOptions.includeSymbols,
    },
  ];

  return (
    <Box display='flex' flexDirection='column' gap={2} alignItems='center'>
      {/* show the generated password */}
      <TextField
        sx={{
          width: '80vw',
          visibility: password ? 'visible' : 'hidden',
        }}
        disabled
        value={password}
        variant='filled'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleCopyPassword}
                edge='end'
              >
                {passwordCopied ? <CheckCircle /> : <ContentCopy />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* show options */}
      <Box>
        <FormGroup row>
          {options.map((opt, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox checked={opt.checked} />}
              label={opt.title}
              onClick={opt.action}
            />
          ))}
        </FormGroup>
        <FormHelperText
          sx={{
            color: 'red',
            visibility: checkErr ? 'visible' : 'hidden',
          }}
        >
          *Include at least one option
        </FormHelperText>
      </Box>

      {/* generate password button */}
      <Button
        sx={{
          width: '60%',
        }}
        variant='contained'
        onClick={generatePassword}
      >
        Click To Generate New Password
      </Button>
    </Box>
  );
}

export default Content;
