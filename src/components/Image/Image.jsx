import styles from "./styles.module.css"
const NewsBanner = ({ image }) => {
	return <div className={styles.wrapper}>{image ? <img src={image} alt="news" className={styles.image} /> : null}</div>
}
NewsBanner.propTypes = String

export default NewsBanner
