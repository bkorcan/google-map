import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VillaIcon from '@mui/icons-material/Villa';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';




function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Filter() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    const [checkedGocek, setCheckedGocek] = React.useState(false);
    const [checkedKalkan, setCheckedKalkan] = React.useState(false);
    const [checkedKas, setCheckedKas] = React.useState(false);


    const handleChange = (e) => {
        if (e.target.clientHeight === 46) { setCheckedGocek(!checkedGocek); if (!checkedGocek) { setCheckedKalkan(false); setCheckedKas(false); } }
        if (e.target.clientHeight === 45) { setCheckedKalkan(!checkedKalkan); if (!checkedKalkan) { setCheckedGocek(false); setCheckedKas(false); } }
        if (e.target.clientHeight === 47) { setCheckedKas(!checkedKas); if (!checkedKas) { setCheckedGocek(false); setCheckedKalkan(false); } }
    };


    // Number  Of People
    const [guests, setGuests] = React.useState(2);

    const handleChangeGuests = (event) => {
        setGuests(event.target.value);
    };
    //   
    return (
        <ThemeProvider theme={theme} >
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        maxWidth: 600,
                        margin: "auto",
                        padding: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,.93)',
                        zIndex: 100,
                        position: 'relative',
                        height: '100vh'

                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <VillaIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Holiday Villas
                    </Typography>
                    <Typography color='secondary' style={{ width: '100%', textAlign: 'left', fontSize: 20, marginTop: 40 }}>
                        Select A Region
                    </Typography>
                    <Typography color='error' style={{ width: '100%', textAlign: 'left', marginBottom: -20 }}>
                        *Required
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" size='large' onChange={handleChange} style={{ height: 50 }} />}
                            label="Gocek"
                            checked={checkedGocek}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" size='large' onChange={handleChange} style={{ height: 49 }} />}
                            label="Kalkan"
                            checked={checkedKalkan}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" size='large' onChange={handleChange} style={{ height: 51 }} />}
                            label="Kas"
                            checked={checkedKas}
                        />
                        <Divider />

                        <Typography color='secondary' style={{ width: '100%', textAlign: 'left', fontSize: 20, marginTop: 50 }}>
                            Date Range
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            name="CheckIn"
                            label="Check In"
                            type="text"
                            id="check_in"
                            style={{ width: '45%', marginRight: '5%' }}
                        />
                        <TextField
                            margin="normal"
                            required
                            name="CheckOut"
                            label="Check Out"
                            type="text"
                            id="check_out"
                            style={{ width: '45%' }}
                        />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="3 Days flexible"
                        />
                        <Divider />
                        {/* Number Of People */}
                        <Typography color='secondary' style={{ width: '100%', textAlign: 'left', fontSize: 20, marginTop: 50 }}>
                            Number Of  <span style={{ color: 'black' }}> Adults + Kids </span> (age 2 and above)
                        </Typography>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl style={{ width: 90, marginTop: 20 }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={guests}
                                    onChange={handleChangeGuests}
                                    defaultValue={1}

                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem>
                                    <MenuItem value={14}>14</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={16}>16+</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <br></br>
                        <Divider />
                        {/* Price */}
                        <Typography color='secondary' style={{ width: '100%', textAlign: 'left', fontSize: 20, marginTop: 50 }}>
                            Price
                        </Typography>
                        <FormControl >
                            <RadioGroup row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="USD"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="USD" control={<Radio />} label="USD" />
                                <FormControlLabel value="TL" control={<Radio />} label="TL" />
                            </RadioGroup>
                        </FormControl>
                        <br />
                        <TextField id="standard-basic" label="min" variant="standard"  style={{width:90, marginRight:40}}/>
                        <TextField id="standard-basic" label="max" variant="standard" style={{width:90}}/>
                        {/* Price */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ paddingTop: 5, paddingBottom: 5, fontSize: 20 }}

                        >
                            Apply
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}