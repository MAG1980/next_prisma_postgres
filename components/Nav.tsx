import Image from "next/image"
import Link from "next/link"

const Nav = () => {
    return (
        <nav>
            <div className="container">
                <div className="navigate">
                    <Link href="/">Меню</Link>
                    <Link href="/menu">Доставка и оплата</Link>
                    <Link href="/about">Акции</Link>
                    <Link href="/contact">Контакты</Link>
                </div>
                <Link href="/">
                    <Image
                    src="/images/logo.png"
                    width={184}
                    height={100}
                    alt="logo"
                />
                </Link>
                <div className="book_room">
                    <Link href="/">Tg</Link>
                    <Link href="/">Ok</Link>
                    <Link href="/">Dz</Link>
                    <Link className="book_btn" href="/">+7 999 999 99 99</Link>
                </div>
            </div >
        </nav>
    )
}

export default Nav