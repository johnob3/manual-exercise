import ContentItem from "./ContentItem/ContentItem";
import styles from "./Content.module.scss";

export default function Content() {
    return (
        <main className={styles.contentContainer}>
            <h2>What we can help with</h2>
            <ContentItem
                itemNumber={'01'} category={'hair loss'}
                title={'Hair loss needn’t be irreversible. We can help!'}
                text={'We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.'}
                imageUrl={'/assets/hairloss.png'}
            />
            <ContentItem
                itemNumber={'02'} category={'erectile dysfunction'}
                title={'Erections can be a tricky thing. But no need to feel down!'}
                text={'We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.'}
                imageUrl={'/assets/erectdisfunc.png'}
                isReversed={true}
            />
        </main>
    )
}
