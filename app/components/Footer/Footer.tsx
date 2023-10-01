import styles from "./Footer.module.scss";
import Image from "next/image";
import FooterList from "./FooterList/FooterList";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.logoSection}>
                    <Image src={'/assets/logo.svg'} alt={'manual'} width={75} height={75}/>
                </div>
                <div className={styles.roadMap}>
                    <FooterList header={"product"} items={['Popular', 'Trending', 'Guided', 'Products']}/>
                    <FooterList header={"company"} items={['Press', 'Mission', 'Strategy', 'About']}/>
                    <FooterList header={"info"} items={['Support', 'Customer Service', 'Get started']}/>
                </div>
                <div className={styles.socials}>
                    <p className={styles.header}>
                        follow us
                    </p>
                    <div className={styles.links}>
                        <a href={"#"}>
                            <Image src={'/assets/facebook.png'} alt={'facebook'} width={20} height={20}/>
                        </a>
                        <a href={"#"}>
                            <Image src={'/assets/google.png'} alt={'google'} width={20} height={20}/>
                        </a>
                        <a href={"#"}>
                            <Image src={'/assets/twitter.png'} alt={'twitter'} width={20} height={20}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.copyRight}>
                <hr/>
                <p>
                    &#169;{new Date().getFullYear()} Manual. All rights reserved
                </p>
            </div>
        </footer>
    )
}
