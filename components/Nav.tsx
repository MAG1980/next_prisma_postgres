import Image from "next/image"
import Link from "next/link"


const Nav = () => {
    return (

        <nav>
            <div className="container">
                <div className="navigate">
                    <Link href="/">Home</Link>
                    <Link href="/menu">Menu</Link>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                </div>

                <Image
                    src="/images/logo.png"
                    width={184}
                    height={100}
                    alt="logo"
                />

                <div className="book_room">
                    <Link href="/">Telegram</Link>
                    <Link href="/">Ok</Link>
                    <Link href="/">Dzen</Link>
                    <Link className="book_btn" href="/">+7 999 999 99 99</Link>
                </div>

            </div >
        </nav>

    )
}

export default Nav