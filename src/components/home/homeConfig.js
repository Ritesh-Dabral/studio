import home from '../../assets/svg/house-simple.svg'
import about from '../../assets/svg/users-three.svg'
import contact from '../../assets/svg/paper-plane-tilt.svg'
import fb from '../../assets/svg/facebook-logo-light.svg'
import insta from '../../assets/svg/instagram-logo-light.svg'
import gmail from '../../assets/svg/envelope-simple-light.svg'
import copy from '../../assets/svg/copy-light.svg'


export const sideTabs = [
    {
        'key':'',
        'label': 'Home',
        'icon': home
    },
    {
        'key':'about',
        'label': 'About',
        'icon': about
    },
    {
        'key':'contact',
        'label': 'Contact',
        'icon': contact
    }
]

export const connectOptions = [
    {
        'key':'instagram',
        'icon': insta,
        'link':'https://www.instagram.com/'
    },
    {
        'key':'facebook',
        'icon': fb,
        'link':'https://www.facebook.com/'
    },
    {
        'key':'gmail',
        'icon': gmail,
        'fn':()=>{
            try {
                const emailLink = document.createElement('a');
                emailLink.href = `mailto:rakeshdabral2@gmail.com`;
                emailLink.click();
            } catch (error) {
                console.log(error)
            }
        }
    },
    {
        'key':'copy',
        'icon': copy,
        'fn': ()=>{
            try {
                navigator.clipboard.writeText(window.location.origin);
            } catch (error) {
                
            }
        }
    }
]