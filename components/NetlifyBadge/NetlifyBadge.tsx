import { Box, Button } from "@radix-ui/themes";
import style from './style.module.css';
import Link from "next/link";

const NetlifyBadge = () => {
    return (
        <Link href="https://www.netlify.com/">
            <Button className={style.box} m="5"
            variant="ghost"
            size="3"
            >
                Ezt az oldalt a Netlify támogatja!
            </Button>
        </Link>
    )
};

export default NetlifyBadge;