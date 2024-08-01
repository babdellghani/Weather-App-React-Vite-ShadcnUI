import ImageDefault from '../../assets/img/Thunder and sun.jpg'
import styles from './Wallpaper.module.scss'

function Wallpaper() {
    return (
        <div className="fixed h-full w-full -z-10">
            <div className={`${styles.overflay}`}></div>
            <img src={ImageDefault} alt="wallpaper" className="w-full h-full object-cover" />
        </div>
    );
}

export default Wallpaper;