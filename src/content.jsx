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
import { useEffect, useState } from 'react';
import { generateRandomPassword } from './utils/generals.js';
import { CheckCircle } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from '@mui/material';
import { FileCopy } from '@mui/icons-material';

function Content(props) {
  const [password, setPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [passwordOptions, setPasswordOptions] = useState({
    includeNumbers: true,
    includeSymbols: true,
    includeAlphabets: true,
  });
  const [checkErr, setCheckErr] = useState(false);
  const [lastFivePass, setLastFivePass] = useState([]);
  const [lastFivePassCopy, setLastFivePassCopy] = useState(-1);

  // load last five passwords form local
  useEffect(() => {
    let passwords = localStorage.getItem('passwords');
    if (passwords) {
      passwords = JSON.parse(passwords);
      setLastFivePass(passwords); // show last 5 passwords
      setPassword(passwords[0].password); // show last password in ui
    }
  }, []);

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

    // persist the password into local storage
    let passwords = [...lastFivePass];
    passwords.unshift({
      password,
      time: Date.now(),
    });
    passwords = passwords.slice(0, 5); // store only last 5 password
    setLastFivePass(passwords);
    localStorage.setItem('passwords', JSON.stringify(passwords));
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

  const handleTableCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setLastFivePassCopy(index);
      setTimeout(() => {
        setLastFivePassCopy(-1);
      }, 2000); // Reset the copy success state after 2 seconds
    });
  };

  const getDate = (date) => {
    const str = new Date(date);
    return `${str.toDateString()}, ${str.toLocaleTimeString()}`;
  };

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
              <Tooltip title={passwordCopied ? 'Copied!' : 'Copy to clipboard'}>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleCopyPassword}
                  edge='end'
                >
                  {passwordCopied ? <CheckCircle /> : <FileCopy />}
                </IconButton>
              </Tooltip>
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

      {/* show last five password */}
      {lastFivePass.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Generation time</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastFivePass.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{getDate(row.time)}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        lastFivePassCopy === index
                          ? 'Copied!'
                          : 'Copy to clipboard'
                      }
                    >
                      <IconButton
                        onClick={() => handleTableCopy(row.password, index)}
                      >
                        {lastFivePassCopy === index ? (
                          <CheckCircle />
                        ) : (
                          <FileCopy />
                        )}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default Content;
