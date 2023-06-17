import Image from "next/image"
import Link from "next/link"
import { SocialIcon } from 'react-social-icons';

const Nav = () => {
    return (
        <nav>
            <div className="container">
                <Link href="/">
                    <Image
                        src="/images/logo2.png"
                        width={110}
                        height={100}
                        alt="logo"
                    />
                </Link>
                <div className="navigate">
                    <Link href="/">Меню</Link>
                    <Link href="/delivery">Доставка и оплата</Link>
                    <Link href="/stocks">Акции</Link>
                    <Link href="/contact">Контакты</Link>
                </div>
                <div className="book_room">
                    <SocialIcon url="https://vk.com/jaketrent" />
                    <SocialIcon url="https://t.me/jaketrent" />
                    <SocialIcon url="https://whatsapp.com/jaketrent" />
                    <Link className="book_btn" href="/">+7 999 999 99 99</Link>
                </div>
            </div >
        </nav>
    )
}

export default Nav