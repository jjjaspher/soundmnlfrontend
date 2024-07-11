import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Footer.module.scss';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';


class Footer extends Component {
    render() {
        return (
            <div>
                <Aux>
                    <div className={classes.FooterContainer}>
                        <div className={classes.About}>
                            <h2>About Us</h2>
                            <p>SoundMNL Studio is an affordable, accesible Band Rehearsal studion with high class instruments. Now open for online booking.</p>
                        </div>
                        <div className={classes.Location}>
                            <h2>Location</h2>
                            <p><GoLocation size={20}/> 15 Yemen road. Yemen </p>
                        </div>
                        <div className={classes.Contact}>
                            <h2>Contact</h2>
                            <p>jaspherdugang@gmail.com</p>
                            <div className={classes.IconCont}>
                                <i><FaFacebookF  size={30}/></i>                               
                                <i><FaInstagram  size={30}/></i>                               
                                <i><FaTwitter  size={30}/></i>                               
                            </div>
                        </div>
                    </div>
                    <div className={classes.Disclaimer}>
                        <h1>DISCLAIMER</h1>
                        <p>No copyright infringement is intended. This is only for educational purposes and not for profit. Some asset/s used are not owned by the developer unless otherwise stated. The credit goes to the owner.</p>
                        <p>© 2021 Copyright | JaspherDugang</p>
                    </div>
                </Aux>
            </div>
        );
    }
}


export default Footer;