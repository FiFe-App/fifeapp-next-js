import { Button, Flex } from '@radix-ui/themes'
import styles from './Header.module.css'
import Link from 'next/link'

export const Header = () => {
    return (
        <header className={styles.header}>
            <Flex direction="row" justify="between" align="center">
                <h1>FiFe App</h1>
                <nav>
                    <ul className={styles.navigationList}>
                        <li className={styles.navigationListItem}>
                            <Link href="/cserebere">
                                <Button
                                    className={styles.navigationButton}
                                    variant="ghost"
                                    size="4"
                                >
                                    Cserebere
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/biznisz">
                                <Button
                                    className={styles.navigationButton}
                                    variant="ghost"
                                    size="4"
                                >
                                    Biznisz
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/pajtasok">
                                <Button
                                    className={styles.navigationButton}
                                    variant="ghost"
                                    size="4"
                                >
                                    Pajtások
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/bejelentkezes">
                                <Button
                                    className={styles.navigationButton}
                                    variant="solid"
                                    size="3"
                                    highContrast
                                >
                                    Bejelentkezés
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/regisztracio">
                                <Button
                                    className={styles.navigationButton}
                                    variant="outline"
                                    size="3"
                                >
                                    Regisztráció
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Flex>
        </header>
    )
}
