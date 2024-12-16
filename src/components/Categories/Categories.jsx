
import styles from "./styles.module.css"
const Categories = ({ categories, setSelectedCategory, selectedCategory }) => {
	return (
		<div className={styles.categories}>
			{categories.map(category => {
				return (
					<button className={selectedCategory === category ? styles.active : styles.item} onClick={() => setSelectedCategory(category)} key={category}>
						{category}
					</button>
				)
			})}
		</div>
	)
}
Categories.propTypes = String
export default Categories
