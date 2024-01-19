import './Button.css';
import * as Img from '../../assets/typeOfButtons';

function Button({ name }) {
    return (
        <div className="button">
            <img alt="Icon" className="disabled" src={
                (name === '1' && Img['img1']) ||
                (name === '2' && Img['img2']) ||
                (name === '3' && Img['img3'])
            } />
        </div>
    );
}

export default Button;
