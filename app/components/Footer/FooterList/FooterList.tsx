import styles from "./FooterList.module.scss";

type Props = {
    header: string,
    items: string[]
}

export default function FooterList({header, items}: Props) {
    return (
        <div className={styles.footerList}>
            <p className={styles.title}>{header}</p>
            {items.map(item => {
                return (<p className={styles.item}>{item}</p>)
            })}
        </div>
    )
}
