import Image from 'next/image'
import styles from "./ContentItem.module.scss";
import clsx from "clsx";

type Props = {
    itemNumber: string,
    category: string,
    title: string,
    text: string
    imageUrl: string,
    isReversed?: boolean
}
export default function ContentItem({itemNumber, category, text, title, imageUrl, isReversed}: Props) {
    return (
        <article className={clsx(styles.article, isReversed && styles.articleReversed)}>
            <div className={styles.imageContainer}>
                <Image src={imageUrl} width={370} height={445} alt={category}/>
            </div>
            <div className={styles.info}>
                <p className={styles.itemNumber}>{itemNumber}</p>
                <h3 className={styles.category}>{category}</h3>
                <p className={styles.title}>{title}</p>
                <p className={styles.text}>{text}</p>
            </div>
        </article>
    )
}
