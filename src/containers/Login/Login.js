import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { Redirect, NavLink } from 'react-router-dom';
import Validate from '../../validation/validation';
import {connect} from 'react-redux';
import { auth, clearError } from '../../store/actions/authAction';
import classes from './Login.module.scss';
import Toast from '../../components/UI/Toast/Toast';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state ={
        form: {
            username: {
                value: '',
                field: 'username',
                label: 'USERNAME:',
                type: 'text',            
                errMessage: '',
                rules: {
                    required: true
                },
                focus: false
            },
            password: {
                value: '',
                field: 'password',
                label: 'PASSWORD:',
                type: 'password',
                errMessage: '',
                rules: {
                    required: true
                },
                focus: false
            }
        }
    }
    componentWillUnmount() {
        this.props.onClearError()
    }

    onChangeInputHandler = (event, field) => {
        let updatedForm = {
            ...this.state.form,
            [field] : {
                ...this.state.form[field],
                ...{value : event.target.value}
            }
        }
        const oResult = Validate(updatedForm[field].value, updatedForm[field].rules, updatedForm);
        updatedForm[field].errMessage = oResult.message
        this.setState({form: updatedForm});
    }

    onFocusHandler = (field) => {
        const bFocusState = this.state.form[field].focus;
        let updatedForm = {
            ...this.state.form,
            [field] : {
                ...this.state.form[field],
                ...{focus : !bFocusState}
            }
        }
        this.setState({form: updatedForm});
    }

    onSubmitLogin = (event) => {
        event.preventDefault()
        const oForm = {...this.state.form};
        let errCount = 0;
        let updatedForm = {...this.state.form}
        for (let field in oForm) {
            const oResult = Validate(oForm[field].value, oForm[field].rules, oForm);
            updatedForm[field].errMessage = oResult.message
            if (oResult.isValid !== true) errCount++; 
        }
        this.setState({form: updatedForm});
        if (errCount === 0) this.onSubmitForm();
    }
    onSubmitForm = () => {
        const username = this.state.form.username.value;
        const password = this.state.form.password.value;
        this.props.onAuth(username,password);
    }
   
    render() {
        const formArray = [];
        for(let key in this.state.form) {
            formArray.push({
                id: key,
                config: this.state.form[key]
            })
        }
        let form = formArray.map(element => (            
            <Input 
                key={element.id}
                type={element.config.type}
                value={element.config.value}
                label={element.config.label}
                errMessage={element.config.errMessage}
                required={element.config.required}
                focus={element.config.focus} 
                onFocus={() => this.onFocusHandler(element.config.field)}
                onBlur={() => this.onFocusHandler(element.config.field)}               
                onChange={(event) => this.onChangeInputHandler(event, element.id)}
            />
        ));
        if (this.props.loading) {
            form = <Spinner/>
        }


        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/'/>
        }

        let toast = null;
        if (this.props.error !== null) {
            toast = (
                <Aux>
                    <Toast toastType='FlashToast'>
                        <div>
                            <span>{this.props.error}</span>                            
                        </div>
                    </Toast>
                </Aux>
            );
        }
         
        
        
        return (
            <div className={classes.LoginPage}>
                {toast}
                {authRedirect}
                <div className={classes.BgImg}></div>
                <div className={classes.FormContainer}>
                    <div className={classes.TitleCont}>
                        <h1 className={classes.Title}>Sound<span className={classes.SpanTitle}>MNL</span> Studio</h1>
                    </div> 
                    <form onSubmit={this.onSubmitLogin}>
                        {form}
                        <div className={classes.SignInBtn}>
                            <Button btnClass='Button'  btnType="Success">SIGN IN</Button>
                        </div>                                                
                    </form>
                    
                    <div className={classes.SignUp}>
                        <span>Don't have an account?</span>
                        <NavLink to='/register'> Sign up.</NavLink>
                    </div>
                    
                </div>                    
            </div>                
        );
    }
}

const mapStatetoProps = state => {
    return {
        loading: state.authReducer.loading,
        isAuthenticated: state.authReducer.token !== null,
        error: state.authReducer.error
    };
}
   
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(auth(username, password)),                    
        onClearError: () => dispatch(clearError())                  
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Auth);