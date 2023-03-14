import React, { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import axios from 'axios';
import url from "../url"
import { Button, FormControl, Input, InputAdornment, InputLabel, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useNavigate } from 'react-router';
import { useIsAuthenticated } from 'react-auth-kit';



const useStyles = makeStyles((theme) => ({

    root: {

        marginLeft: "1px",
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(2),
        width: '400px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    submitBtn: {
        marginTop: theme.spacing(2),
    },
}));

const RegisterForm = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        age: '',
        contactNumber: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `${url}/register`,
                {
                    "firstname": values.firstName,
                    "lastname": values.lastName,
                    "username": values.userName,
                    "email": values.email,
                    "password": values.password,
                    "contact": values.contactNumner,
                    "age": values.age

                }
            )

            window.location.reload(true)

        } catch (err) {

            console.error(err);

        }

        window.location.reload(true)

    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input id="firstName" value={values.firstName} onChange={handleChange('firstName')} />
                </FormControl>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input id="lastName" value={values.lastName} onChange={handleChange('lastName')} />
                </FormControl>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="userName">User Name</InputLabel>
                    <Input id="userName" value={values.userName} onChange={handleChange('userName')} />
                </FormControl>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        error={values.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)}
                        helperText={values.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? 'Invalid email address' : ''}
                    />
                </FormControl>

                <FormControl margin="normal" required>
                    <InputLabel htmlFor="age">Age</InputLabel>
                    <Input id="age" value={values.age} onChange={handleChange('age')} />
                </FormControl>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="contactNumber">Contact Number</InputLabel>
                    <Input
                        id="contactNumber"
                        value={values.contactNumber}
                        onChange={handleChange('contactNumber')}
                    />
                </FormControl>
                <FormControl margin="normal" requried>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <Button
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitBtn}
                    disabled={!values.firstName || !values.lastName || !values.userName || !values.email || !values.age || !values.contactNumber || !values.password}
                >
                    Register
                </Button>
            </form>
        </Paper>
    );
};

const LoginForm = () => {
    const navigate = useNavigate()
    const signIn = useSignIn()

    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [error, setError] = useState(null);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`${url}/auth`)



        try {
            const response = await axios.post(
                `${url}/auth`,
                values
            )

            signIn({
                token: response.data.accesstoken,
                expiresIn: 3600 * 24,
                tokenType: "Bearer",
                authState: { email: values.email }
            })

        } catch (err) {
            setError('Invalid email or password');
            console.error(error);

        }
    }



    return (
        <Paper className={classes.paper}>
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <FormControl margin="normal">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                </FormControl>
                <FormControl margin="normal">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {error && (
                    <Typography variant="subtitle1" color="error">
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitBtn}
                >
                    Login
                </Button>
            </form>
        </Paper>
    );
};

const RegisterLogin = () => {
    const navigate = useNavigate()
    const authenticated = useIsAuthenticated()

    if (authenticated()) {
        navigate("/")
    }
    const classes = useStyles();
    const [isRegister, setIsRegister] = useState(false);

    const handleToggle = () => {
        setIsRegister(!isRegister);
    };

    return (

        <div className={classes.root}>
            {isRegister ? <RegisterForm /> : <LoginForm />}
            <Button style={{ marginTop: '10px', }} onClick={handleToggle}>
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Button>
        </div>

    );
};

export default RegisterLogin;

