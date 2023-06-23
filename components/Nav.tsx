import Link from "next/link"
import { SocialIcon } from 'react-social-icons';

const Nav = () => {
    return (
        <nav>

            <Link href="/" className="title_name">
                Кафе-бар
            </Link>
            <div className="navigate">
                <Link href="/">Меню</Link>
                <Link href="/delivery">Доставка и оплата</Link>
                <Link href="/stocks">Акции</Link>
                <Link href="/contact">Контакты</Link>
            </div>
            <div className="book_room">
                <SocialIcon url="https://vk.com/jaketrent" style={{ height: 35, width: 35 }} bgColor="#fff" />
                <SocialIcon url="https://t.me/jaketrent" style={{ height: 35, width: 35 }} bgColor="#fff" />
                <SocialIcon url="https://whatsapp.com/jaketrent" style={{ height: 35, width: 35 }} bgColor="#fff" />
                <Link className="book_btn" href="/">+7 999 999 99 99</Link>
            </div>

        </nav>
    )
}

export default Nav